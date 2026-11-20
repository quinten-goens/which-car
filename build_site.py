"""Export the scraped parquet files to docs/data.json for the static dashboard."""

import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).parent
DATA, DOCS = ROOT / "data", ROOT / "docs"


def clean(v):
    return None if pd.isna(v) else (round(float(v), 4) if isinstance(v, float) else v)


def main() -> None:
    models = pd.read_parquet(DATA / "models.parquet")
    classes = pd.read_parquet(DATA / "age_classes.parquet")
    rubrics = pd.read_parquet(DATA / "rubrics.parquet")
    ages = list(classes["age_class"].cat.categories)

    shown = classes[classes["has_data"]]
    class_avg = {
        age: {
            "pct": clean(classes.loc[classes.age_class == age, "chart_class_pct"].dropna().mode().iloc[0]),
            "km": clean(shown.loc[shown.age_class == age, "class_avg_km"].dropna().mode().iloc[0])
            if (shown.age_class == age).any() else None,
        }
        for age in ages
    }

    out = []
    for m in models.itertuples():
        mc = shown[shown.slug == m.slug]
        mr = rubrics[rubrics.slug == m.slug]
        out.append({
            "slug": m.slug, "brand": m.brand, "model": m.model, "url": m.url,
            "classes": {
                r.age_class: {"pct": clean(r.defect_pct), "km": clean(r.avg_km), "verdict": r.kpi_verdict}
                for r in mc.itertuples()
            },
            "rubrics": {
                age: [[clean(r.rubric_code), r.rubric_name, clean(r.model_pct), clean(r.class_pct)]
                      for r in grp.sort_values("rank").itertuples()]
                for age, grp in mr.groupby("age_class", observed=True)
            },
        })

    meta = models.iloc[0]
    payload = {
        "period": meta["period_label"], "total_inspections": clean(meta["total_inspections"]),
        "scraped_at": str(meta["scraped_at"])[:10], "source": "https://gocabarometer.gocavlaanderen.be/",
        "ages": ages, "class_avg": class_avg, "models": out,
    }
    DOCS.mkdir(exist_ok=True)
    (DOCS / "data.json").write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"wrote docs/data.json: {len(out)} models, {(DOCS / 'data.json').stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
