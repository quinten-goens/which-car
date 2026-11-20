// Shared by every page: language, theme, top bar, (i) help tooltips.
"use strict";
const LANGS = ["nl", "fr", "de", "en"];
const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } };
const load = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (s, r = document) => r.querySelector(s);

let LANG = (() => {
  const q = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(q)) return q;
  const s = load("lang"); if (LANGS.includes(s)) return s;
  const n = (navigator.language || "").slice(0, 2).toLowerCase();
  return LANGS.includes(n) ? n : "nl";
})();
const LOCALE = () => window.I18N[LANG]._locale;

function t(key, vars = {}) {
  const s = window.I18N[LANG][key] ?? window.I18N.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}
function rubName(nl) {
  const tr = window.RUBRICS[nl];
  if (!tr || LANG === "nl") return nl;
  return tr[{ en: 0, fr: 1, de: 2 }[LANG]];
}
const infoBtn = (key, vars) =>
  `<button type="button" class="info" data-tip="${key}"${vars ? ` data-vars="${esc(JSON.stringify(vars))}"` : ""} aria-label="${esc(t("info"))}">i</button>`;

// ---------- theme
function applyTheme(mode) {
  if (mode === "light" || mode === "dark") document.documentElement.dataset.theme = mode;
  else delete document.documentElement.dataset.theme;
}
applyTheme(load("theme"));

// ---------- tooltip (shared by info buttons and chart hovers)
const tip = document.createElement("div");
tip.id = "tip"; tip.hidden = true; tip.setAttribute("role", "tooltip");
document.addEventListener("DOMContentLoaded", () => document.body.appendChild(tip));
function placeTip(x, y, below) {
  const pad = 12, w = tip.offsetWidth, h = tip.offsetHeight;
  let left = x + pad, top = below != null ? below + 6 : y + pad;
  if (left + w > innerWidth - 8) left = Math.max(8, x - w - pad);
  if (top + h > innerHeight - 8) top = Math.max(8, (below != null ? y - 6 : y - pad) - h);
  tip.style.left = left + "px"; tip.style.top = top + "px";
}
function showTip(e, html) { tip.innerHTML = html; tip.hidden = false; placeTip(e.clientX, e.clientY); }
function showTipAt(el, html) {
  tip.innerHTML = html; tip.hidden = false;
  const r = el.getBoundingClientRect(); placeTip(r.left, r.top, r.bottom);
}
function hideTip() { tip.hidden = true; }
const infoHtml = (b) => t(b.dataset.tip, b.dataset.vars ? JSON.parse(b.dataset.vars) : {});
let pinned = null;
document.addEventListener("mouseover", (e) => { const b = e.target.closest?.(".info"); if (b && !pinned) showTipAt(b, infoHtml(b)); });
document.addEventListener("mouseout", (e) => { const b = e.target.closest?.(".info"); if (b && !pinned) hideTip(); });
document.addEventListener("focusin", (e) => { const b = e.target.closest?.(".info"); if (b) showTipAt(b, infoHtml(b)); });
document.addEventListener("focusout", (e) => { if (e.target.closest?.(".info")) { pinned = null; hideTip(); } });
document.addEventListener("click", (e) => {
  const b = e.target.closest?.(".info");
  if (b) { // tap/click pins the help text (touch devices); never triggers sorting etc.
    e.preventDefault(); e.stopPropagation();
    if (pinned === b) { pinned = null; hideTip(); } else { pinned = b; showTipAt(b, infoHtml(b)); }
    return;
  }
  if (pinned) { pinned = null; hideTip(); }
}, true);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { pinned = null; hideTip(); } });
addEventListener("scroll", () => { if (pinned) { pinned = null; hideTip(); } }, { passive: true });

// ---------- top bar + static texts
const langListeners = [];
function onLang(fn) { langListeners.push(fn); }

function renderTopbar() {
  const bar = $("#topbar"); if (!bar) return;
  const page = document.body.dataset.page;
  const theme = load("theme") || "auto";
  bar.innerHTML = `<nav aria-label="Pages">
      <a href="./" ${page === "dashboard" ? 'aria-current="page"' : ""}>${esc(t("nav_dashboard"))}</a>
      <a href="about.html" ${page === "about" ? 'aria-current="page"' : ""}>${esc(t("nav_about"))}</a>
    </nav>
    <div class="prefs">
      <span class="seg" role="group" aria-label="${esc(t("lang"))}">${LANGS.map((l) =>
        `<button type="button" data-lang="${l}" aria-pressed="${l === LANG}" title="${esc(window.I18N[l]._name)}" lang="${l}">${l.toUpperCase()}</button>`).join("")}</span>
      <span class="seg" role="group" aria-label="${esc(t("theme"))}">${["auto", "light", "dark"].map((m) =>
        `<button type="button" data-theme-set="${m}" aria-pressed="${m === theme}">${esc(t("theme_" + m))}</button>`).join("")}</span>${infoBtn("i_theme")}
    </div>`;
  bar.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  bar.querySelectorAll("[data-theme-set]").forEach((b) => b.addEventListener("click", () => {
    store("theme", b.dataset.themeSet); applyTheme(b.dataset.themeSet); renderTopbar();
  }));
}

function applyStatic() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i]").forEach((e) => { e.innerHTML = t(e.dataset.i); });
  document.querySelectorAll("[data-i-ph]").forEach((e) => { e.placeholder = t(e.dataset.iPh); });
  document.querySelectorAll("[data-tip-static]").forEach((e) => { e.outerHTML = infoBtn(e.dataset.tipStatic); });
  document.querySelectorAll(".info").forEach((e) => e.setAttribute("aria-label", t("info")));
  const tk = document.body.dataset.titleKey;
  if (tk) document.title = t(tk) + " – GOCA Barometer";
  renderTopbar();
}

function setLang(l) {
  LANG = l; store("lang", l);
  const u = new URL(location.href); u.searchParams.set("lang", l); history.replaceState(null, "", u);
  applyStatic(); langListeners.forEach((fn) => fn());
}
document.addEventListener("DOMContentLoaded", applyStatic);
