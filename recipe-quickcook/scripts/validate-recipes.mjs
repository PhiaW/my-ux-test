// validate-recipes.mjs — 驗證 AI 產出的食譜是否合乎 schema 與資料規範
//
// 用法：node scripts/validate-recipes.mjs [食譜檔路徑]
//   預設驗證 ../data/recipes.sample.js；可傳入暫存的新檔，例如：
//   node scripts/validate-recipes.mjs ./scripts/recipes.new.js
//
// 檢查項目：
//   1. 必填欄位齊全、sourceUrl 為 YouTube
//   2. core 食材皆為已知標準名，且分類不是 seasoning（調味料不該進 core）
//   3. replaceable.original 須在 core 內；substitutes（"不加" 除外）為已知名
//   4. seasonings 名稱為已知標準名
//   5. quantities 的 key 皆為已知名
//   6. steps 有 prep / cook 兩段陣列
//   會列出「需新增到 ingredients.js 的食材」清單。

import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { INGREDIENTS, normalize, categoryOf } from "../data/ingredients.js";
import { TAG_VOCAB } from "../data/scenarios.js";

const KNOWN = new Set(INGREDIENTS.map((i) => i.name));
const TAGS = new Set(Object.keys(TAG_VOCAB));

const target = process.argv[2] || "data/recipes.sample.js";
const mod = await import(pathToFileURL(resolve(process.cwd(), target)).href);
const RECIPES = mod.RECIPES || [];

let errors = 0;
const missingIngredients = new Set();

const isKnown = (name) => KNOWN.has(normalize(name));
const note = (id, msg) => { console.log(`  ✗ ${msg}`); errors++; };

for (const r of RECIPES) {
  const head = `[${r.id || "?"}] ${r.title || "(無標題)"}`;
  const local = [];
  const fail = (m) => local.push(m);

  // 1. 必填（sourceUrl 選填：自製食譜可留空 → 走品牌佔位圖）
  for (const f of ["id", "title", "servings"]) if (!r[f]) fail(`缺欄位 ${f}`);
  if (r.sourceUrl && !/^https?:\/\//.test(r.sourceUrl)) fail(`sourceUrl 非合法網址：${r.sourceUrl}`);
  if (!("sourceUrl" in r)) fail(`缺 sourceUrl 欄位（可留空字串）`);
  if (!("coverImage" in r)) fail(`缺 coverImage 欄位（可留空字串）`);
  if (r.tags) r.tags.forEach((t) => { if (!TAGS.has(t)) fail(`未知 tag：${t}`); });

  const ing = r.ingredients || {};
  const core = ing.core || [];

  // 2. core
  if (!core.length) fail(`core 為空`);
  core.forEach((c) => {
    if (!isKnown(c)) { fail(`core 食材不在主檔：${c}`); missingIngredients.add(c); }
    else if (categoryOf(c) === "seasoning") fail(`core 含調味料（應移到 seasonings）：${c}`);
  });

  // 3. replaceable
  (ing.replaceable || []).forEach((rep) => {
    if (!core.includes(rep.original)) fail(`replaceable.original 不在 core：${rep.original}`);
    (rep.substitutes || []).forEach((s) => {
      if (s !== "不加" && !isKnown(s)) { fail(`替代品不在主檔：${s}`); missingIngredients.add(s); }
    });
  });

  // 4. seasonings
  if (!Array.isArray(ing.seasonings)) fail(`缺 seasonings 陣列`);
  else ing.seasonings.forEach((s) => {
    if (typeof s !== "object" || !s.name) fail(`seasonings 格式錯（需 {name,...}）`);
    else if (!isKnown(s.name)) { fail(`調味料不在主檔：${s.name}`); missingIngredients.add(s.name); }
  });

  // 5. quantities
  Object.keys(r.quantities || {}).forEach((k) => {
    if (!isKnown(k)) { fail(`quantities key 不在主檔：${k}`); missingIngredients.add(k); }
  });

  // 6. steps
  const st = r.steps || {};
  if (!Array.isArray(st.prep) || !Array.isArray(st.cook)) fail(`steps 需含 prep / cook 兩段陣列`);
  else [...st.prep, ...st.cook].forEach((s, i) => {
    if (typeof s.text !== "string" || !("timerSec" in s)) fail(`step #${i + 1} 格式錯（需 {text,timerSec}）`);
  });

  if (local.length) { console.log(`\n${head}`); local.forEach((m) => note(r.id, m)); }
}

console.log(`\n${"─".repeat(40)}`);
if (errors === 0) console.log(`✓ ${RECIPES.length} 筆食譜全部通過驗證`);
else console.log(`✗ 共 ${errors} 個問題（${RECIPES.length} 筆食譜）`);

if (missingIngredients.size) {
  console.log(`\n需新增到 ingredients.js 的食材（${missingIngredients.size}）：`);
  console.log("  " + [...missingIngredients].join("、"));
}
process.exit(errors ? 1 : 0);
