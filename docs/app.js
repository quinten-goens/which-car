// GOCA Barometer dashboard: overview + compare tabs. Depends on i18n.js and common.js.
"use strict";
const SVGNS = "http://www.w3.org/2000/svg";
const SERIES = ["var(--series-1)", "var(--series-2)", "var(--series-3)"];
const geo = (xs) => (xs.length ? Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / xs.length) : null);

let D;
const state = {
  tab: "overview", ages: new Set(), minBrand: 3, q: "", sort: { key: "score", dir: 1 },
  rankMode: "best", // "best" | "worst" in the per-age card
  picked: [], // up to 2 model slugs: A and B — shared by the table, the tray and the Compare tab
  h2h: { mode: "models", ba: null, bb: null, rubAge: null }, // ba/bb = brands in brand mode
};

// ---------- formatting (locale-aware)
const nf = (v, d = 1) => v.toLocaleString(LOCALE(), { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtPct = (v, d = 1) => (v == null ? "—" : new Intl.NumberFormat(LOCALE(), { style: "percent", minimumFractionDigits: d, maximumFractionDigits: d }).format(v / 100));
const fmtInt = (v) => (v == null ? "—" : Math.round(v).toLocaleString(LOCALE()));
const fmtRel = (r) => (r == null ? "—" : (r >= 1 ? "+" : "−") + fmtPct(Math.abs((r - 1) * 100), 0));
function relWords(r) {
  if (r == null) return "—";
  const n = Math.round(Math.abs(r - 1) * 100);
  return n === 0 ? t("rel_same") : t(r < 1 ? "rel_fewer" : "rel_more", { n });
}
function ageLabel(a, short) {
  const m = a.match(/(\d+)-(\d+)/);
  return m ? `${m[1]}–${m[2]} ${t(short ? "yrs_s" : "yrs")}` : a;
}
const selAges = () => D.ages.filter((a) => state.ages.has(a));
const modelBySlug = (s) => D.models.find((m) => m.slug === s);

function el(tag, attrs = {}, parent) {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
}

// ---------- scoring
function modelScore(m) {
  const ratios = [], kmr = [];
  for (const age of selAges()) {
    const c = m.classes[age]; if (!c || c.pct == null) continue;
    ratios.push(c.pct / D.class_avg[age].pct);
    if (c.km && D.class_avg[age].km) kmr.push(c.km / D.class_avg[age].km);
  }
  return { score: geo(ratios), n: ratios.length, ratios, km: geo(kmr) };
}

function compute() {
  const q = state.q.trim().toLowerCase();
  const rows = D.models.map((m) => ({ m, ...modelScore(m) })).filter((r) => r.n > 0);
  const brands = new Map();
  for (const r of rows) {
    const b = brands.get(r.m.brand) || { brand: r.m.brand, ratios: [], models: [] };
    b.ratios.push(...r.ratios); b.models.push(r); brands.set(r.m.brand, b);
  }
  const brandRows = [...brands.values()].map((b) => ({
    ...b, score: geo(b.ratios),
    best: b.models.reduce((a, x) => (x.score < a.score ? x : a)), worst: b.models.reduce((a, x) => (x.score > a.score ? x : a)),
  }));
  const shownModels = q ? rows.filter((r) => (r.m.model + " " + r.m.brand).toLowerCase().includes(q)) : rows;
  return { rows, shownModels, brandRows };
}

// ---------- generic line chart: series = [{name, color, vals[], extra[], avg}]
function drawLine(box, series, ariaLabel) {
  box.innerHTML = "";
  const ages = D.ages;
  const W = Math.max(330, box.clientWidth), H = 280, L = 40, R = W < 420 ? 84 : W < 560 ? 110 : 140, T = 14, B = 30;
  const xs = (i) => L + (i + 0.5) * ((W - L - R) / ages.length);
  const all = series.flatMap((s) => s.vals.filter((v) => v != null));
  const ymax = Math.ceil(Math.max(5, ...all) / 5) * 5, sy = (v) => T + (1 - v / ymax) * (H - T - B);
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": ariaLabel }, box);
  for (let v = 0; v <= ymax; v += 5) {
    el("line", { x1: L, x2: W - R, y1: sy(v), y2: sy(v), class: v === 0 ? "zero" : "ax" }, svg);
    el("text", { x: L - 8, y: sy(v) + 4, "text-anchor": "end", "font-size": 11 }, svg).textContent = fmtPct(v, 0);
  }
  ages.forEach((a, i) => {
    const txt = el("text", { x: xs(i), y: H - 8, "text-anchor": "middle" }, svg);
    txt.textContent = W < 420 ? a.replace(/(\d+)-(\d+).*/, "$1–$2") : ageLabel(a, W < 620);
    if (!state.ages.has(a)) txt.setAttribute("opacity", 0.45);
  });
  const labels = [];
  for (const s of series) {
    let d = "", pen = false;
    s.vals.forEach((v, i) => { if (v == null) { pen = false; return; } d += (pen ? "L" : "M") + xs(i) + "," + sy(v); pen = true; });
    if (d) el("path", { d, fill: "none", stroke: s.color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
    s.vals.forEach((v, i) => { if (v != null) el("circle", { cx: xs(i), cy: sy(v), r: s.avg ? 3 : 4.5, fill: s.color, stroke: "var(--surface-1)", "stroke-width": 2 }, svg); });
    const li = s.vals.map((v, i) => (v != null ? i : -1)).filter((i) => i >= 0).pop();
    if (li != null) labels.push({ y: sy(s.vals[li]), x: xs(li), name: s.name, color: s.color });
  }
  labels.sort((a, b) => a.y - b.y);
  for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < 14) labels[i].y = labels[i - 1].y + 14;
  const maxChars = R > 120 ? 20 : R > 100 ? 15 : 11;
  for (const l of labels) {
    el("line", { x1: l.x + 8, x2: W - R + 8, y1: l.y, y2: l.y, stroke: l.color, "stroke-width": 1, opacity: 0.35 }, svg);
    el("text", { x: W - R + 12, y: l.y + 4, fill: "var(--text-primary)" }, svg).textContent = l.name.length > maxChars ? l.name.slice(0, maxChars - 1) + "…" : l.name;
  }
  const colW = (W - L - R) / ages.length;
  ages.forEach((a, i) => {
    const hit = el("rect", { x: xs(i) - colW / 2, y: T, width: colW, height: H - T - B, fill: "transparent" }, svg);
    const guide = el("line", { x1: xs(i), x2: xs(i), y1: T, y2: H - B, stroke: "var(--text-muted)", "stroke-width": 1, opacity: 0, "pointer-events": "none" }, svg);
    hit.addEventListener("mousemove", (e) => {
      guide.setAttribute("opacity", 0.5);
      const avg = D.class_avg[a].pct;
      showTip(e, `<b>${esc(ageLabel(a))}</b>` + series.map((s) => {
        const v = s.vals[i];
        const val = v == null ? `<span class="muted">${esc(t("tt_lt500"))}</span>`
          : `${fmtPct(v)}${s.avg ? "" : ` (${fmtRel(v / avg)})`}${s.extra?.[i] ? ` · ${s.extra[i]}` : ""}`;
        return `<br><span style="color:${s.color}">●</span> ${esc(s.name)}: ${val}`;
      }).join(""));
    });
    hit.addEventListener("mouseleave", () => { guide.setAttribute("opacity", 0); hideTip(); });
  });
}
const avgSeries = () => ({ name: t("avg_series"), color: "var(--avg)", avg: true, vals: D.ages.map((a) => D.class_avg[a].pct),
  extra: D.ages.map((a) => `${fmtInt(D.class_avg[a].km)} km`) });

// ======================================================= OVERVIEW
function renderTiles(c) {
  const brandsEligible = c.brandRows.filter((b) => b.models.length >= state.minBrand).sort((a, b) => a.score - b.score);
  const best = [...c.rows].filter((r) => r.n >= 2).sort((a, b) => a.score - b.score)[0];
  const tiles = [
    [fmtInt(D.total_inspections), t("tile_insp"), "i_tile_insp"],
    [D.models.length, t("tile_models", { b: new Set(D.models.map((m) => m.brand)).size }), "i_tile_models"],
    brandsEligible[0] ? [esc(brandsEligible[0].brand), t("tile_brand", { rel: relWords(brandsEligible[0].score) }), "i_tile_brand"] : ["—", t("tile_brand", { rel: "" }), "i_tile_brand"],
    best ? [esc(best.m.model), t("tile_model", { rel: relWords(best.score) }), "i_tile_model"] : ["—", t("tile_model", { rel: "" }), "i_tile_model"],
  ];
  $("#tiles").innerHTML = tiles.map(([b, s, k]) => `<div class="tile">${infoBtn(k)}<b>${b}</b><span>${s}</span></div>`).join("");
}

function renderBrands(c) {
  const rows = c.brandRows.filter((b) => b.models.length >= state.minBrand).sort((a, b) => a.score - b.score);
  const box = $("#brandChart"); box.innerHTML = "";
  if (!rows.length) { box.innerHTML = `<p class="muted">${esc(t("no_brand"))}</p>`; return; }
  const W = Math.max(320, box.clientWidth), rowH = 22, top = 24, labelW = 118, valW = 46, H = top + rows.length * rowH + 8;
  const vals = rows.map((r) => (r.score - 1) * 100);
  const ext = Math.max(10, Math.ceil(Math.max(...vals.map(Math.abs)) / 10) * 10);
  const x0 = labelW, x1 = W - valW, sx = (v) => x0 + ((v + ext) / (2 * ext)) * (x1 - x0);
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": t("brands_h") }, box);
  for (const tk of [-ext, -ext / 2, 0, ext / 2, ext]) {
    el("line", { x1: sx(tk), x2: sx(tk), y1: top - 6, y2: H - 4, class: tk === 0 ? "zero" : "ax" }, svg);
    el("text", { x: sx(tk), y: 12, "text-anchor": "middle", "font-size": 11 }, svg).textContent = tk === 0 ? "0" : (tk > 0 ? "+" : "−") + fmtPct(Math.abs(tk), 0);
  }
  rows.forEach((r, i) => {
    const v = vals[i], y = top + i * rowH, bh = 12, by = y + (rowH - bh) / 2;
    const xa = sx(Math.min(0, v)), xb = sx(Math.max(0, v)), w = Math.max(1, xb - xa);
    const g = el("g", { style: "cursor:pointer" }, svg);
    el("rect", { x: 0, y, width: W, height: rowH, fill: "transparent" }, g);
    el("text", { x: labelW - 8, y: y + rowH / 2 + 4, "text-anchor": "end", fill: "var(--text-primary)" }, g).textContent = r.brand;
    const rr = Math.min(4, w / 2), left = v < 0;
    const d = left
      ? `M${xb},${by} H${xa + rr} Q${xa},${by} ${xa},${by + rr} V${by + bh - rr} Q${xa},${by + bh} ${xa + rr},${by + bh} H${xb} Z`
      : `M${xa},${by} H${xb - rr} Q${xb},${by} ${xb},${by + rr} V${by + bh - rr} Q${xb},${by + bh} ${xb - rr},${by + bh} H${xa} Z`;
    el("path", { d, fill: left ? "var(--better)" : "var(--worse)" }, g);
    el("text", { x: W - 2, y: y + rowH / 2 + 4, "text-anchor": "end", "font-size": 11 }, g).textContent = fmtRel(r.score);
    g.addEventListener("mousemove", (e) => showTip(e, `<b>${esc(r.brand)}</b>: ${esc(t("tt_vs_avg", { rel: relWords(r.score) }))}<br>
      ${esc(t("tt_models", { n: r.models.length, p: r.ratios.length }))}<br>
      ${esc(t("tt_best"))}: ${esc(r.best.m.model)} (${fmtRel(r.best.score)})<br>${esc(t("tt_worst"))}: ${esc(r.worst.m.model)} (${fmtRel(r.worst.score)})`));
    g.addEventListener("mouseleave", hideTip);
    g.addEventListener("click", () => { $("#search").value = state.q = r.brand; render(); $("#modelsCard").scrollIntoView({ behavior: "smooth", block: "start" }); });
  });
}

function heatBg(ratio) {
  const tt = Math.max(-1, Math.min(1, Math.log(ratio) / Math.log(2.2)));
  return `background: rgba(var(${tt < 0 ? "--better-tint" : "--worse-tint"}), ${(Math.abs(tt) * 0.7).toFixed(3)})`;
}
const th = (label, info, { key, cls = "", sortable = true, extra = "", vars } = {}) => {
  const sorted = key && state.sort.key === key;
  return `<th ${key ? `data-key="${key}"` : ""} class="${cls} ${sortable && key ? "sortable" : ""}" ${sorted ? `aria-sort="${state.sort.dir > 0 ? "ascending" : "descending"}"` : ""}><span class="lab">${label}</span>${info ? infoBtn(info, vars) : ""}${extra}</th>`;
};

function renderTable(c) {
  const ages = selAges();
  const cols = {
    model: (r) => r.m.model, brand: (r) => r.m.brand, score: (r) => r.score, n: (r) => r.n, km: (r) => r.km,
    ...Object.fromEntries(ages.map((a) => ["age:" + a, (r) => (r.m.classes[a] ? r.m.classes[a].pct / D.class_avg[a].pct : null)])),
  };
  const { key, dir } = state.sort;
  const get = cols[key] || cols.score;
  const rows = [...c.shownModels].sort((a, b) => {
    const va = get(a), vb = get(b);
    if (va == null) return 1; if (vb == null) return -1;
    return (typeof va === "string" ? va.localeCompare(vb) : va - vb) * dir;
  });
  const tb = $("#modelTable");
  tb.innerHTML = `<thead><tr>
    ${th(esc(t("col_cmp")), "i_col_cmp", { sortable: false })}
    ${th(esc(t("col_rank")), "i_col_rank", { cls: "r", sortable: false })}
    ${th(esc(t("col_model")), "i_col_model", { key: "model" })}
    ${th(esc(t("col_brand")), "i_col_brand", { key: "brand" })}
    ${th(esc(t("col_score")), "i_col_score", { key: "score", cls: "r" })}
    ${th(esc(t("col_ages")), "i_col_ages", { key: "n", cls: "r" })}
    ${ages.map((a) => th(esc(ageLabel(a, true)), "i_col_age", { key: "age:" + a, cls: "r", vars: { age: ageLabel(a) }, extra: `<span class="avg">${esc(t("col_avg"))} ${fmtPct(D.class_avg[a].pct)}</span>` })).join("")}
    ${th(esc(t("col_km")), "i_col_km", { key: "km", cls: "r" })}
  </tr></thead><tbody>${rows.map((r, i) => {
    const pi = state.picked.indexOf(r.m.slug);
    return `<tr data-slug="${r.m.slug}" class="${pi >= 0 ? "sel" : ""}" style="${pi >= 0 ? "--sel-color:" + SERIES[pi] : ""}">
      <td><input type="checkbox" ${pi >= 0 ? "checked" : ""} aria-label="${esc(t("col_cmp"))} ${esc(r.m.model)}"></td>
      <td class="r muted">${i + 1}</td><td>${esc(r.m.model)}</td><td>${esc(r.m.brand)}</td>
      <td class="r" title="${esc(relWords(r.score))}"><b>${fmtRel(r.score)}</b></td><td class="r">${r.n}</td>
      ${ages.map((a) => { const cl = r.m.classes[a]; return cl ? `<td class="heat" style="${heatBg(cl.pct / D.class_avg[a].pct)}" data-age="${esc(a)}">${fmtPct(cl.pct)}</td>` : '<td class="na" data-na="1">—</td>'; }).join("")}
      <td class="r">${fmtRel(r.km)}</td></tr>`;
  }).join("") || `<tr><td colspan="${7 + ages.length}" class="muted">${esc(t("no_models"))}</td></tr>`}</tbody>`;

  tb.querySelectorAll("th[data-key]").forEach((h) => h.addEventListener("click", () => {
    const k = h.dataset.key;
    state.sort = { key: k, dir: state.sort.key === k ? -state.sort.dir : (k === "n" || k === "km" ? -1 : 1) };
    renderTable(c);
  }));
  tb.querySelectorAll("tbody tr[data-slug]").forEach((tr) => {
    tr.addEventListener("click", () => togglePick(tr.dataset.slug));
    tr.querySelectorAll("td.heat").forEach((td) => {
      td.addEventListener("mousemove", (e) => {
        const m = modelBySlug(tr.dataset.slug), a = td.dataset.age, cl = m.classes[a], avg = D.class_avg[a];
        showTip(e, `<b>${esc(m.model)}</b>, ${esc(ageLabel(a))}<br>${esc(t("tt_defects"))}: ${fmtPct(cl.pct)} (${esc(t("tt_average"))} ${fmtPct(avg.pct)}) – ${esc(relWords(cl.pct / avg.pct))}<br>${esc(t("tt_km"))}: ${fmtInt(cl.km)} (${esc(t("tt_average"))} ${fmtInt(avg.km)})`);
      });
      td.addEventListener("mouseleave", hideTip);
    });
    tr.querySelectorAll("td[data-na]").forEach((td) => {
      td.addEventListener("mousemove", (e) => showTip(e, t("i_na")));
      td.addEventListener("mouseleave", hideTip);
    });
  });
}


// ---------- picking models (max 2: A and B) + the sticky compare tray
const MAX_PICK = 2;
function setPicked(list) {
  state.picked = [...new Set(list.filter((s) => s && modelBySlug(s)))].slice(0, MAX_PICK);
  writeHash();
}
function togglePick(slug) {
  const i = state.picked.indexOf(slug);
  if (i >= 0) state.picked.splice(i, 1);
  else { if (state.picked.length >= MAX_PICK) state.picked.shift(); state.picked.push(slug); }
  writeHash(); render();
}

function renderTray() {
  const tray = $("#tray");
  const models = state.picked.map(modelBySlug).filter(Boolean);
  const show = state.tab === "overview" && models.length > 0;
  tray.hidden = !show; document.body.classList.toggle("has-tray", show);
  if (!show) return;
  tray.innerHTML = `<div class="tray-in">
    <span class="lbl">${esc(t("tray_label"))}</span>
    ${models.map((m, i) => `<button class="chip" data-slug="${m.slug}" title="✕"><i class="dot" style="background:${SERIES[i]}"></i>${esc(m.model)} ✕</button>`).join("")}
    ${models.length === 1 ? `<span class="muted tray-hint">${esc(t("tray_one"))}</span>` : ""}
    <span class="tray-actions">
      <button class="btn" id="trayClear">${esc(t("f_clear"))}</button>
      <button class="btn primary" id="trayGo">${esc(t(models.length === 1 ? "tray_go1" : "tray_go2"))}</button>
    </span></div>`;
  tray.querySelectorAll("button.chip").forEach((b) => b.addEventListener("click", () => togglePick(b.dataset.slug)));
  $("#trayClear").addEventListener("click", () => { setPicked([]); render(); });
  $("#trayGo").addEventListener("click", () => { state.h2h.mode = "models"; setTab("h2h"); scrollTo({ top: 0, behavior: "smooth" }); });
}

// ---------- best models per age (fills the space next to the brand chart)
function renderBest() {
  const worst = state.rankMode === "worst", box = $("#bestList");
  $("#bestHead").innerHTML = esc(t(worst ? "worst_h" : "best_h")) + infoBtn(worst ? "i_worst" : "i_best");
  $("#bestSub").textContent = t(worst ? "worst_sub" : "best_sub");
  const tg = $("#bestToggle");
  tg.innerHTML = ["best", "worst"].map((m) => `<button type="button" data-rank="${m}" aria-pressed="${state.rankMode === m}">${esc(t("rank_" + m))}</button>`).join("");
  tg.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { state.rankMode = b.dataset.rank; renderBest(); }));
  box.innerHTML = selAges().map((a) => {
    const avg = D.class_avg[a].pct;
    const top = D.models.filter((m) => m.classes[a]).map((m) => ({ m, r: m.classes[a].pct / avg }))
      .sort((x, y) => (worst ? y.r - x.r : x.r - y.r)).slice(0, 3);
    return `<div class="best-age"><h3>${esc(ageLabel(a))} <span class="muted">· ${esc(t("col_avg"))} ${fmtPct(avg)}</span></h3>
      <ol>${top.map(({ m, r }) => {
        const pi = state.picked.indexOf(m.slug);
        return `<li><button class="pick${pi >= 0 ? " on" : ""}" data-slug="${m.slug}" aria-pressed="${pi >= 0}">
          <i class="dot" style="background:${pi >= 0 ? SERIES[pi] : "transparent"};border:1px solid ${pi >= 0 ? "transparent" : "var(--text-muted)"}"></i>
          <span class="nm">${esc(m.model)}</span><span class="v">${fmtPct(m.classes[a].pct)}</span><b class="v">${fmtRel(r)}</b></button></li>`;
      }).join("")}</ol></div>`;
  }).join("");
  box.querySelectorAll("button.pick").forEach((b) => b.addEventListener("click", () => togglePick(b.dataset.slug)));
}

function rubricTable(rows) {
  const max = Math.max(...rows.flatMap((r) => [r[2], r[3]]), 0.01);
  return `<thead><tr>
    ${th(esc(t("rub_col_rubric")), "i_rub_col_rubric", { sortable: false })}
    ${th(esc(t("rub_col_model")), "i_rub_col_model", { sortable: false, cls: "r" })}
    ${th(esc(t("rub_col_class")), "i_rub_col_class", { sortable: false, cls: "r" })}
    ${th(esc(t("rub_col_diff")), "i_rub_col_diff", { sortable: false, cls: "r" })}
    ${th(esc(t("rub_col_bar")), "i_rub_col_bar", { sortable: false })}
    <th></th></tr></thead>
  <tbody>${rows.map(([code, name, mp, cp]) => `<tr><td class="wrapcell" title="${esc((code ? code + " " : "") + name)}">${esc(code ? code + " " : "")}${esc(rubName(name))}</td>
    <td class="r">${fmtPct(mp, 2)}</td><td class="r">${fmtPct(cp, 2)}</td><td class="r">${cp ? fmtRel(mp / cp) : "—"}</td>
    <td><div class="bar"><div class="m" style="width:${(mp / max) * 100}%"></div><div class="c" style="left:calc(${(cp / max) * 100}% - 1px)"></div></div></td>
    <td>${cp && mp >= cp * 1.25 ? `<span class="flag">${esc(t("weak"))}</span>${infoBtn("i_weak")}` : ""}</td></tr>`).join("")}</tbody>`;
}

// ======================================================= COMPARE (models or brands)
function entity(kind, id, color) {
  const ages = selAges();
  if (kind === "models") {
    const m = modelBySlug(id); if (!m) return null;
    const per = Object.fromEntries(D.ages.map((a) => [a, m.classes[a] ? { pct: m.classes[a].pct, km: m.classes[a].km, n: 1 } : null]));
    const s = modelScore(m);
    return { kind, id, name: m.model, color, per, score: s.score, nAges: s.n, model: m };
  }
  const ms = D.models.filter((m) => m.brand === id); if (!ms.length) return null;
  const per = {}, all = [];
  for (const a of D.ages) {
    const withData = ms.filter((m) => m.classes[a]);
    const r = withData.map((m) => m.classes[a].pct / D.class_avg[a].pct);
    const kr = withData.filter((m) => m.classes[a].km).map((m) => m.classes[a].km / D.class_avg[a].km);
    per[a] = r.length ? { pct: geo(r) * D.class_avg[a].pct, km: kr.length ? geo(kr) * D.class_avg[a].km : null, n: r.length } : null;
    if (ages.includes(a)) all.push(...r);
  }
  const models = ms.map((m) => ({ m, ...modelScore(m) })).filter((x) => x.n > 0).sort((a, b) => a.score - b.score);
  return { kind, id, name: id, color, per, score: geo(all), nAges: ages.filter((a) => per[a]).length, models };
}

function h2hDefaults() {
  const h = state.h2h, brands = [...new Set(D.models.map((m) => m.brand))];
  if (h.mode === "models") {
    if (!state.picked.length) setPicked(["volkswagen-golf", "toyota-yaris"].filter(modelBySlug).length ? ["volkswagen-golf", "toyota-yaris"] : [D.models[0].slug, D.models[1].slug]);
  } else {
    if (!brands.includes(h.ba)) h.ba = brands.includes("Toyota") ? "Toyota" : brands[0];
    if (!brands.includes(h.bb)) h.bb = brands.includes("Volkswagen") ? "Volkswagen" : brands[1];
  }
}

function options(mode, selected, allowNone) {
  if (mode === "brands") {
    return [...new Set(D.models.map((m) => m.brand))].sort((a, b) => a.localeCompare(b))
      .map((b) => `<option value="${esc(b)}" ${b === selected ? "selected" : ""}>${esc(b)}</option>`).join("");
  }
  const byBrand = new Map();
  D.models.forEach((m) => byBrand.set(m.brand, [...(byBrand.get(m.brand) || []), m]));
  return (allowNone ? `<option value="" ${!selected ? "selected" : ""}>${esc(t("h2h_none_opt"))}</option>` : "") +
    [...byBrand].map(([b, ms]) => `<optgroup label="${esc(b)}">${ms.map((m) =>
      `<option value="${m.slug}" ${m.slug === selected ? "selected" : ""}>${esc(m.model)}</option>`).join("")}</optgroup>`).join("");
}

function renderH2H() {
  const h = state.h2h; h2hDefaults();
  const isBrand = h.mode === "brands";
  const selA = isBrand ? h.ba : state.picked[0], selB = isBrand ? h.bb : state.picked[1] || "";
  const root = $("#h2h");
  root.innerHTML = `
  <section class="card">
    <p class="sub" style="margin-top:0">${esc(t("h2h_intro"))}</p>
    <div class="grp" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      <span class="lbl">${esc(t("h2h_mode"))}</span>
      <span class="seg" role="group">${["models", "brands"].map((m) => `<button type="button" data-mode="${m}" aria-pressed="${h.mode === m}">${esc(t("h2h_" + m))}</button>`).join("")}</span>${infoBtn("i_h2h_mode")}
    </div>
    <div class="vs">
      <div class="side"><label for="selA"><i class="dot" style="background:${SERIES[0]}"></i>A</label><select id="selA">${options(h.mode, selA, false)}</select></div>
      <button class="btn" id="swap" title="${esc(t("h2h_swap"))}" ${!selB ? "disabled" : ""}>⇄ ${esc(t("h2h_swap"))}</button>
      <div class="side"><label for="selB"><i class="dot" style="background:${SERIES[1]}"></i>B</label><select id="selB">${options(h.mode, selB, !isBrand)}</select></div>
    </div>
  </section>
  <div id="h2hBody"></div>`;
  root.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => {
    if (h.mode === b.dataset.mode) return;
    h.mode = b.dataset.mode; writeHash(); renderH2H();
  }));
  $("#selA").addEventListener("change", (e) => {
    if (isBrand) h.ba = e.target.value; else setPicked([e.target.value, state.picked[1] === e.target.value ? state.picked[0] : state.picked[1]]);
    writeHash(); renderH2H();
  });
  $("#selB").addEventListener("change", (e) => {
    if (isBrand) h.bb = e.target.value;
    else setPicked(e.target.value === state.picked[0] ? [e.target.value, state.picked[1]] : [state.picked[0], e.target.value]);
    writeHash(); renderH2H();
  });
  $("#swap").addEventListener("click", () => {
    if (isBrand) [h.ba, h.bb] = [h.bb, h.ba]; else setPicked([state.picked[1], state.picked[0]]);
    writeHash(); renderH2H();
  });

  const body = $("#h2hBody");
  if (isBrand && h.ba === h.bb) { body.innerHTML = `<section class="card"><p>${esc(t("h2h_same"))}</p></section>`; return; }
  const A = entity(h.mode, selA, SERIES[0]);
  const B = selB ? entity(h.mode, selB, SERIES[1]) : null;
  const ents = [A, B].filter(Boolean);
  const ages = selAges();

  let verdict;
  if (!B) verdict = esc(t("h2h_single"));
  else {
    const common = ages.filter((a) => A.per[a] && B.per[a]);
    if (!common.length) verdict = esc(t("h2h_none"));
    else {
      const r = geo(common.map((a) => A.per[a].pct / B.per[a].pct));
      const better = r <= 1 ? [A, B, 1 - r] : [B, A, 1 - 1 / r];
      const n = Math.round(better[2] * 100);
      verdict = (n < 2 ? t("h2h_equal", { a: esc(A.name), b: esc(B.name) })
        : t("h2h_better", { a: `<span style="color:${better[0].color}">●</span> ${esc(better[0].name)}`, b: esc(better[1].name), n }))
        + " " + esc(t("h2h_common", { k: common.length }));
    }
  }
  const scoreTile = (E) => `<div class="tile" style="--c:${E.color}">${infoBtn("i_h2h_score")}
      <span>${esc(E.name)}</span><b>${E.score == null ? "—" : fmtRel(E.score)}</b>
      <span>${esc(E.score == null ? "" : relWords(E.score))} · ${esc(t("h2h_nages", { n: E.nAges }))}${E.kind === "brands" ? " · " + esc(t("h2h_nmodels", { n: E.models.length })) : ""}</span></div>`;

  const cell = (E, a) => {
    const p = E.per[a];
    if (!p) return `<td class="na" data-na="1">—</td>`;
    return `<td class="r">${fmtPct(p.pct)}${isBrand ? ` <span class="muted">(${p.n})</span>` : ""}</td>`;
  };
  const tableRows = selAges().map((a) => {
    let win = "";
    if (B) {
      const pa = A.per[a], pb = B.per[a];
      win = "—";
      if (pa && pb) {
        const w = pa.pct < pb.pct ? A : B;
        win = Math.abs(pa.pct - pb.pct) < 0.05 ? esc(t("tie"))
          : `<span style="color:${w.color}">●</span> ${esc(w.name)} <span class="muted">(${fmtRel(Math.min(pa.pct, pb.pct) / Math.max(pa.pct, pb.pct))})</span>`;
      }
      win = `<td>${win}</td>`;
    }
    return `<tr><td>${esc(ageLabel(a))}</td>${ents.map((E) => cell(E, a)).join("")}<td class="r">${fmtPct(D.class_avg[a].pct)}</td>
      ${ents.map((E) => `<td class="r">${E.per[a]?.km ? fmtInt(E.per[a].km) : "—"}</td>`).join("")}<td class="r">${fmtInt(D.class_avg[a].km)}</td>${win}</tr>`;
  }).join("");
  const ageInfo = isBrand ? "i_col_brand_age" : "i_h2h_table";
  const dotName = (E) => `<i class="dot" style="background:${E.color}"></i> ${esc(E.name)}`;

  body.innerHTML = `
  <section class="card">
    <h2>${esc(t("h2h_verdict_h"))}${B ? infoBtn("i_h2h_verdict") : ""}</h2>
    <p class="verdict">${verdict}</p>
    <div class="scorebox">${ents.map(scoreTile).join("")}</div>
  </section>
  <section class="card">
    <h2>${esc(t("h2h_chart_h"))}${infoBtn(isBrand ? "i_h2h_chart_brands" : "i_h2h_chart_models")}</h2>
    <div class="legend"><span><i class="ln" style="background:var(--avg)"></i>${esc(t("avg_series"))}</span>${ents.map((E) => `<span><i class="ln" style="background:${E.color}"></i>${esc(E.name)}</span>`).join("")}</div>
    <div class="scroll" id="h2hLine"></div>
  </section>
  <section class="card">
    <h2>${esc(t("h2h_table_h"))}${infoBtn("i_h2h_table")}</h2>
    <div class="legend"><span>${esc(t("leg_na"))}</span>${infoBtn("i_na")}</div>
    <div class="scroll"><table>
      <thead><tr>${th(esc(t("col_age")), null, { sortable: false })}
        ${ents.map((E) => th(dotName(E), ageInfo, { sortable: false, cls: "r" })).join("")}
        ${th(esc(t("col_avg_full")), "i_rub_col_class", { sortable: false, cls: "r" })}
        ${ents.map((E, i) => th(esc(t("col_kmA", { x: i ? "B" : "A" })), "i_col_km", { sortable: false, cls: "r" })).join("")}
        ${th(esc(t("col_km_avg")), "i_col_km", { sortable: false, cls: "r" })}
        ${B ? th(esc(t("col_winner")), "i_col_winner", { sortable: false }) : ""}</tr></thead>
      <tbody>${tableRows}</tbody></table></div>
  </section>
  <div id="h2hDetail"></div>`;

  drawLine($("#h2hLine"), [avgSeries(), ...ents.map((E) => ({
    name: E.name, color: E.color, vals: D.ages.map((a) => E.per[a]?.pct ?? null),
    extra: D.ages.map((a) => (E.per[a]?.km ? `${fmtInt(E.per[a].km)} km` + (isBrand ? ` · ${t("h2h_nmodels", { n: E.per[a].n })}` : "") : null)),
  }))], t("h2h_chart_h"));
  body.querySelectorAll("td[data-na]").forEach((td) => {
    td.addEventListener("mousemove", (e) => showTip(e, t("i_na"))); td.addEventListener("mouseleave", hideTip);
  });

  if (isBrand) renderBrandDetail(A, B);
  else if (B) renderModelRubrics(A, B);
  else renderSingleRubrics(A);
}

function ageChipsFor(ages, age) {
  return `<div class="tabs">${ages.map((a) => `<button class="chip" aria-pressed="${a === age}" data-age="${esc(a)}">${esc(ageLabel(a))}</button>`).join("")}</div>`;
}

function renderSingleRubrics(A) {
  const h = state.h2h, box = $("#h2hDetail");
  const ages = selAges().filter((a) => A.model.rubrics[a]);
  if (!ages.length) { box.innerHTML = ""; return; }
  const age = ages.includes(h.rubAge) ? h.rubAge : ages[0];
  box.innerHTML = `<section class="card">
    <h2>${esc(t("rub_h"))}${infoBtn("i_rub")}</h2>
    <p class="sub">${esc(t("rub_sub"))} <span class="flag">${esc(t("weak"))}</span>${infoBtn("i_weak")}</p>
    ${ageChipsFor(ages, age)}
    <div class="scroll"><table>${rubricTable(A.model.rubrics[age])}</table></div></section>`;
  box.querySelectorAll("[data-age]").forEach((b) => b.addEventListener("click", () => { h.rubAge = b.dataset.age; renderSingleRubrics(A); }));
}

function renderModelRubrics(A, B) {
  const h = state.h2h;
  const ages = selAges().filter((a) => A.model.rubrics[a] || B.model.rubrics[a]);
  const box = $("#h2hDetail");
  if (!ages.length) { box.innerHTML = ""; return; }
  const age = ages.includes(h.rubAge) ? h.rubAge : ages[0];
  const listA = A.model.rubrics[age], listB = B.model.rubrics[age];
  const keyOf = (r) => (r[0] || "") + "|" + r[1];
  const mapA = new Map((listA || []).map((r) => [keyOf(r), r])), mapB = new Map((listB || []).map((r) => [keyOf(r), r]));
  const floorA = listA ? Math.min(...listA.map((r) => r[2])) : null, floorB = listB ? Math.min(...listB.map((r) => r[2])) : null;
  const keys = [...new Set([...mapA.keys(), ...mapB.keys()])];
  const rows = keys.map((k) => {
    const ra = mapA.get(k), rb = mapB.get(k), base = ra || rb;
    return { code: base[0], name: base[1], cp: base[3], a: ra ? ra[2] : null, b: rb ? rb[2] : null };
  }).sort((x, y) => Math.max(y.a ?? floorA ?? 0, y.b ?? floorB ?? 0) - Math.max(x.a ?? floorA ?? 0, x.b ?? floorB ?? 0));
  const max = Math.max(0.01, ...rows.flatMap((r) => [r.a ?? 0, r.b ?? 0, r.cp]));
  const val = (v, list, floor) => (v != null ? fmtPct(v, 2) : list ? `<span class="muted">≤ ${fmtPct(floor, 2)}</span>` : `<span class="muted" data-na="1">—</span>`);
  box.innerHTML = `<section class="card">
    <h2>${esc(t("h2h_rub_h"))}${infoBtn("i_h2h_rub")}</h2>
    <p class="sub">${esc(t("h2h_rub_sub"))}</p>
    ${ageChipsFor(ages, age)}
    <div class="scroll"><table>
      <thead><tr>${th(esc(t("rub_col_rubric")), "i_rub_col_rubric", { sortable: false })}
        ${th(`<i class="dot" style="background:${A.color}"></i> ${esc(A.name)}`, "i_rub_col_model", { sortable: false, cls: "r" })}
        ${th(`<i class="dot" style="background:${B.color}"></i> ${esc(B.name)}`, "i_rub_col_model", { sortable: false, cls: "r" })}
        ${th(esc(t("rub_col_class")), "i_rub_col_class", { sortable: false, cls: "r" })}
        ${th("", "i_rub_col_bar", { sortable: false })}</tr></thead>
      <tbody>${rows.map((r) => `<tr><td class="wrapcell" title="${esc((r.code ? r.code + " " : "") + r.name)}">${esc(r.code ? r.code + " " : "")}${esc(rubName(r.name))}</td>
        <td class="r">${val(r.a, listA, floorA)}</td><td class="r">${val(r.b, listB, floorB)}</td><td class="r">${fmtPct(r.cp, 2)}</td>
        <td><div class="bar2">${r.a != null ? `<div class="a" style="width:${(r.a / max) * 100}%"></div>` : ""}${r.b != null ? `<div class="b" style="width:${(r.b / max) * 100}%"></div>` : ""}<div class="c" style="left:calc(${(r.cp / max) * 100}% - 1px)"></div></div></td></tr>`).join("")}</tbody>
    </table></div></section>`;
  box.querySelectorAll("[data-age]").forEach((b) => b.addEventListener("click", () => { h.rubAge = b.dataset.age; renderModelRubrics(A, B); }));
}

function weakSpots(E) {
  const counts = new Map(); let n = 0;
  for (const m of D.models.filter((x) => x.brand === E.id)) {
    for (const a of selAges()) {
      const list = m.rubrics[a]; if (!list) continue; n++;
      for (const [code, name, mp, cp] of list) {
        if (!cp || mp < cp * 1.25) continue;
        const k = (code || "") + "|" + name;
        counts.set(k, { code, name, k: (counts.get(k)?.k || 0) + 1 });
      }
    }
  }
  return { n, top: [...counts.values()].filter((c) => c.k >= 2).sort((a, b) => b.k - a.k).slice(0, 6) };
}

function renderBrandDetail(A, B) {
  const col = (E) => {
    const w = weakSpots(E);
    return `<div>
      <h3 style="margin:0 0 6px;display:flex;align-items:center;gap:6px"><i class="dot" style="background:${E.color}"></i>${esc(E.name)}</h3>
      <ul class="list">${E.models.map((x) => `<li><span>${esc(x.m.model)} <span class="muted">· ${esc(t("h2h_nages", { n: x.n }))}</span></span><b title="${esc(relWords(x.score))}">${fmtRel(x.score)}</b></li>`).join("")}</ul>
      <h3 style="margin:16px 0 6px;font-size:14px;display:flex;align-items:center">${esc(t("h2h_weak_h"))}${infoBtn("i_h2h_weak")}</h3>
      ${w.top.length ? `<ul class="list">${w.top.map((x) => `<li><span title="${esc((x.code ? x.code + " " : "") + x.name)}">${esc(x.code ? x.code + " " : "")}${esc(rubName(x.name))}</span><span class="muted">${esc(t("h2h_weak_row", { k: x.k, n: w.n }))}</span></li>`).join("")}</ul>`
        : `<p class="muted">${esc(t("h2h_weak_none"))}</p>`}
    </div>`;
  };
  $("#h2hDetail").innerHTML = `<section class="card">
    <h2>${esc(t("h2h_models_h"))}${infoBtn("i_h2h_models")}</h2>
    <div class="grid2" style="margin-top:10px">${col(A)}${B ? col(B) : ""}</div></section>`;
}

// ======================================================= wiring
function writeHash() {
  const p = new URLSearchParams();
  if (state.tab === "h2h") {
    p.set("tab", "compare"); p.set("mode", state.h2h.mode);
    if (state.h2h.mode === "brands") { p.set("a", state.h2h.ba); p.set("b", state.h2h.bb); }
  }
  if (state.picked.length) p.set("m", state.picked.join(","));
  const s = p.toString();
  history.replaceState(null, "", location.pathname + location.search + (s ? "#" + s : ""));
}
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (["h2h", "compare"].includes(p.get("tab"))) state.tab = "h2h";
  if (["models", "brands"].includes(p.get("mode"))) state.h2h.mode = p.get("mode");
  if (state.h2h.mode === "brands") { state.h2h.ba = p.get("a"); state.h2h.bb = p.get("b"); }
  const m = p.get("m") ? p.get("m").split(",") : [p.get("a"), p.get("b")]; // older links used a/b for models
  state.picked = m.filter((s) => s && modelBySlug(s)).slice(0, MAX_PICK);
}

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tabs-main button").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === tab));
  $("#overview").hidden = tab !== "overview"; $("#h2h").hidden = tab !== "h2h";
  document.querySelectorAll(".ov-only").forEach((e) => { e.hidden = tab !== "overview"; });
  writeHash(); render();
}

function renderAgeChips() {
  $("#ageChips").innerHTML = D.ages.map((a) => `<button class="chip" aria-pressed="${state.ages.has(a)}" data-age="${esc(a)}">${esc(ageLabel(a, true))}</button>`).join("");
  $("#ageChips").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
    const a = b.dataset.age;
    if (state.ages.has(a) && state.ages.size > 1) state.ages.delete(a); else state.ages.add(a);
    b.setAttribute("aria-pressed", state.ages.has(a)); render();
  }));
}

function renderMeta() {
  const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  const m = D.period.match(/(\p{L}+)\s+(\d{4})\s*[–-]\s*(\p{L}+)\s+(\d{4})/u);
  let period = "";
  if (m) {
    const f = (mon, y) => new Date(+y, months.indexOf(mon.toLowerCase()), 1).toLocaleDateString(LOCALE(), { month: "long", year: "numeric" });
    period = t("period_fmt", { from: f(m[1], m[2]), to: f(m[3], m[4]) });
  }
  $("#period").textContent = period ? `(${period})` : "";
  $("#footer").innerHTML = t("footer", { d: esc(D.scraped_at), src: esc(D.source) });
  renderAgeChips();
}

function render() {
  if (!D) return;
  hideTip();
  if (state.tab === "overview") {
    const c = compute();
    renderTiles(c); renderBrands(c); renderBest(); renderTable(c);
  } else renderH2H();
  renderTray();
}

function init(data) {
  D = data;
  D.ages.forEach((a) => state.ages.add(a));
  readHash();
  document.querySelectorAll(".tabs-main button").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
  $("#minBrand").addEventListener("input", (e) => { state.minBrand = Math.max(1, +e.target.value || 1); render(); });
  $("#search").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  onLang(() => { renderMeta(); render(); });
  renderMeta(); setTab(state.tab);
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(render, 150); });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json").then((r) => r.json()).then(init).catch((e) => {
    $(".wrap").insertAdjacentHTML("afterbegin", `<p style="color:var(--worse)">${t("load_err", { e: esc(e.message) })}</p>`);
  });
});
