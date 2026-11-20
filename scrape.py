"""Scrape every model page of the GOCA Barometer into parquet files.

Polite by design: one connection, a 2-3 s pause between requests, retries with
backoff, and every page is cached in data/raw/ so a re-run never hits the site
again unless you pass --refresh.

Outputs (data/):
  models.parquet       one row per model (brand, name, url, #classes shown)
  age_classes.parquet  one row per model x age class (the bar chart + KPI blocks)
  rubrics.parquet      one row per model x age class x top-10 defect rubric
  barometer.parquet    everything in one long table (age_classes joined to rubrics)
"""

from __future__ import annotations

import argparse
import random
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import pandas as pd
import requests
from bs4 import BeautifulSoup, Tag

BASE = "https://gocabarometer.gocavlaanderen.be/"
DATA = Path(__file__).parent / "data"
RAW = DATA / "raw"
HEADERS = {"User-Agent": "goca-barometer-research-scraper/1.0 (personal, non-commercial; polite crawl)"}
AGE_ORDER = ["4-5 jaar", "6-7 jaar", "8-9 jaar", "10-11 jaar", "12-13 jaar", "14-15 jaar"]
MODEL_BAR, CLASS_BAR = "#418899", "#9FC3CF"


# ---------------------------------------------------------------- fetching
class PoliteClient:
    def __init__(self, delay: tuple[float, float] = (2.0, 3.0), refresh: bool = False):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.delay = delay
        self.refresh = refresh
        self._last = 0.0

    def get(self, url: str, cache: Path) -> str:
        if cache.exists() and not self.refresh:
            return cache.read_text(encoding="utf-8")
        for attempt in range(5):
            wait = self._last + random.uniform(*self.delay) - time.monotonic()
            if wait > 0:
                time.sleep(wait)
            self._last = time.monotonic()
            try:
                r = self.session.get(url, timeout=30)
                if r.status_code == 200:
                    r.encoding = "utf-8"
                    cache.parent.mkdir(parents=True, exist_ok=True)
                    cache.write_text(r.text, encoding="utf-8")
                    return r.text
                if r.status_code in (429, 500, 502, 503, 504):
                    retry_after = int(r.headers.get("Retry-After", 0) or 0)
                    time.sleep(max(retry_after, 10 * 2**attempt))
                    continue
                r.raise_for_status()
            except requests.ConnectionError:
                time.sleep(10 * 2**attempt)
        raise RuntimeError(f"giving up on {url}")


# ---------------------------------------------------------------- parsing helpers
def num(s: str | None) -> float | None:
    """'4,6%' -> 4.6, '73.100' -> 73100.0, 'n.v.t.' -> None (Dutch number format)."""
    if s is None:
        return None
    s = s.strip().replace("%", "").replace("\xa0", "").lstrip("<").strip()  # '< 0,01' -> 0.01 (upper bound)
    if not s or s.lower().startswith("n.v.t"):
        return None
    return float(s.replace(".", "").replace(",", "."))


def fnum(tag: Tag, attr: str) -> float | None:
    v = tag.get(attr)
    return float(v) if v is not None else None


def parse_index(html: str) -> list[dict]:
    soup = BeautifulSoup(html, "lxml")
    models = []
    for sec in soup.select(".merken section.merk"):
        brand = sec.h3.get_text(strip=True)
        for a in sec.select("a"):
            href = a["href"]
            slug = href.rstrip("/").split("/")[-1].removesuffix(".html")
            models.append({"brand": brand, "model": a.get_text(strip=True), "slug": slug,
                           "url": urljoin(BASE, f"m/{slug}.html")})
    return models


def parse_chart(svg: Tag) -> list[dict]:
    """Walk the bar chart in document order: each age class is a run of
    [model bar + label | 'n.v.t.'] [class bar + label] then the x-axis label."""
    groups, cur, last_rect = [], {}, None
    for el in svg.find_all(["rect", "text"]):
        if el.name == "rect":
            last_rect = el
            continue
        txt = el.get_text(strip=True)
        if el.get("text-anchor") == "end":  # y-axis tick
            continue
        if el.get("font-size") == "13":  # x-axis label closes the group
            cur["age_class"] = txt
            groups.append(cur)
            cur, last_rect = {}, None
        elif txt.lower().startswith("n.v.t"):
            cur["chart_model_pct"] = None
            cur["chart_model_bar_height_px"] = None
        elif last_rect is not None:
            prefix = "chart_model" if last_rect.get("fill") != CLASS_BAR else "chart_class"
            cur[f"{prefix}_pct"] = num(txt)
            cur[f"{prefix}_bar_height_px"] = fnum(last_rect, "height")
            cur[f"{prefix}_bar_y_px"] = fnum(last_rect, "y")
            last_rect = None
    return groups


def parse_class_section(sec: Tag) -> tuple[dict, list[dict]]:
    age = sec.h3.get_text(strip=True).removeprefix("Klasse").strip()
    kpis = sec.select(".kpi > div")
    pct_div, km_div = kpis[0], kpis[1]
    span_pct = pct_div.span.get_text(" ", strip=True)
    span_km = km_div.span.get_text(" ", strip=True)
    row = {
        "age_class": age,
        "kpi_verdict": (pct_div.get("class") or ["neutraal"])[0],  # goed / slecht
        "defect_pct": num(pct_div.b.get_text()),
        "class_defect_pct": num(re.search(r"klasse ([\d.,]+)%", span_pct).group(1)),
        "avg_km": num(km_div.b.get_text()),
        "class_avg_km": num(re.search(r"klasse ([\d.,]+)", span_km).group(1)),
    }
    rubrics = []
    for rank, tr in enumerate(sec.select("table tbody tr"), start=1):
        tds = tr.find_all("td")
        label = tds[0].get_text(" ", strip=True)
        m = re.match(r"^((?:[A-Z]\.)?[A-Z]?[\d.]+)\s+(.*)$", label)
        code, name = (m.group(1), m.group(2)) if m else (None, label)
        bar = tds[3].select_one("rect.model")
        line = tds[3].select_one("line.klasse")
        rubrics.append({
            "age_class": age, "rank": rank, "rubric": label, "rubric_code": code,
            "rubric_group": code.split(".")[0] if code else None, "rubric_name": name,
            "model_pct": num(tds[1].get_text()), "class_pct": num(tds[2].get_text()),
            "model_pct_raw": tds[1].get_text(strip=True), "class_pct_raw": tds[2].get_text(strip=True),
            "model_pct_is_upper_bound": tds[1].get_text().strip().startswith("<"),
            "class_pct_is_upper_bound": tds[2].get_text().strip().startswith("<"),
            "bar_model_width": fnum(bar, "width") if bar else None,
            "bar_class_x": fnum(line, "x1") if line else None,
        })
    return row, rubrics


def parse_model(html: str, meta: dict) -> tuple[dict, list[dict], list[dict]]:
    soup = BeautifulSoup(html, "lxml")
    main = soup.main
    sub = main.select_one("p.sub").get_text(" ", strip=True)
    m = re.search(r"(\d+) van de (\d+)", sub)
    model_row = {**meta, "title": main.h2.get_text(strip=True), "subtitle": sub,
                 "classes_shown": int(m.group(1)), "classes_total": int(m.group(2))}

    sections = main.select("section.sectie")
    chart = {g["age_class"]: g for g in parse_chart(sections[0].svg)}
    classes, rubrics = {}, []
    for sec in sections[1:]:
        row, rubs = parse_class_section(sec)
        classes[row["age_class"]] = row
        rubrics += [{**meta, **r} for r in rubs]

    class_rows = []
    for age in sorted(set(chart) | set(classes), key=lambda a: AGE_ORDER.index(a) if a in AGE_ORDER else 99):
        r = {**meta, "age_class": age, "has_data": age in classes,
             **{k: v for k, v in chart.get(age, {}).items() if k != "age_class"},
             **{k: v for k, v in classes.get(age, {}).items() if k != "age_class"}}
        class_rows.append(r)
    return model_row, class_rows, rubrics


def parse_global(html: str) -> dict:
    soup = BeautifulSoup(html, "lxml")
    hints = [p.get_text(" ", strip=True) for p in soup.select("p.hint")]
    label = soup.select_one("header .label").get_text(" ", strip=True)
    total = re.search(r"op ([\d.]+) periodieke", hints[0])
    return {"period_label": label, "total_inspections": num(total.group(1)) if total else None,
            "hint": " | ".join(hints)}


# ---------------------------------------------------------------- main
def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--refresh", action="store_true", help="ignore the raw HTML cache")
    ap.add_argument("--limit", type=int, help="only scrape the first N models (testing)")
    args = ap.parse_args()

    client = PoliteClient(refresh=args.refresh)
    index_html = client.get(BASE, RAW / "_index.html")
    glob = parse_global(index_html)
    models = parse_index(index_html)[: args.limit]
    print(f"{len(models)} models; {glob['total_inspections']:,.0f} inspections in source")

    model_rows, class_rows, rubric_rows = [], [], []
    for i, meta in enumerate(models, 1):
        html = client.get(meta["url"], RAW / f"{meta['slug']}.html")
        mr, cr, rr = parse_model(html, meta)
        model_rows.append(mr); class_rows += cr; rubric_rows += rr
        print(f"[{i:3}/{len(models)}] {meta['model']:<35} classes={mr['classes_shown']} rubrics={len(rr)}")

    scraped_at = datetime.now(timezone.utc)
    models_df = pd.DataFrame(model_rows).assign(**glob, scraped_at=scraped_at)
    classes_df = pd.DataFrame(class_rows)
    rubrics_df = pd.DataFrame(rubric_rows)
    for df in (classes_df, rubrics_df):
        df["age_class"] = pd.Categorical(df["age_class"], categories=AGE_ORDER, ordered=True)
    classes_df["age_min"] = classes_df["age_class"].astype(str).str.extract(r"^(\d+)").astype(int)

    # sanity checks: chart labels and KPI blocks must agree; shown-count must match
    both = classes_df.dropna(subset=["defect_pct", "chart_model_pct"])
    assert (both["defect_pct"] == both["chart_model_pct"]).all(), "chart vs KPI mismatch"
    shown = classes_df.groupby("slug")["has_data"].sum()
    assert shown.sort_index().equals(models_df.set_index("slug")["classes_shown"].sort_index().astype(shown.dtype)), "classes_shown mismatch"

    combined = classes_df.merge(rubrics_df.drop(columns=["brand", "model", "url"]),
                                on=["slug", "age_class"], how="left")
    DATA.mkdir(exist_ok=True)
    models_df.to_parquet(DATA / "models.parquet", index=False)
    classes_df.to_parquet(DATA / "age_classes.parquet", index=False)
    rubrics_df.to_parquet(DATA / "rubrics.parquet", index=False)
    combined.to_parquet(DATA / "barometer.parquet", index=False)
    print(f"saved {len(models_df)} models, {len(classes_df)} model-classes, {len(rubrics_df)} rubric rows")


if __name__ == "__main__":
    main()
