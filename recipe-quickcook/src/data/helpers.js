// ───────── 封面圖：自填 > YT 縮圖 > 品牌佔位圖 ─────────
export const youtubeId = (url) => {
  const m = (url || "").match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
};

// 佔位圖配色（無真實照片時，依 id 雜湊取一組品牌色）
const PLACEHOLDER_PALETTE = [
  { bg: "#F4F7F1", fg: "#688943" }, { bg: "#FBF1DF", fg: "#B27D24" },
  { bg: "#E1EAD8", fg: "#425928" }, { bg: "#EFEEEC", fg: "#5C5A56" },
];
const hashStr = (s) => [...String(s)].reduce((a, c) => a + c.charCodeAt(0), 0);

export const placeholderColor = (r) =>
  PLACEHOLDER_PALETTE[hashStr(r.id || r.title) % PLACEHOLDER_PALETTE.length];

// 真實封面網址：自填 coverImage > YouTube 縮圖；皆無則回傳 null（改用 FA 佔位圖）
export const coverImageUrl = (r) => {
  if (r.coverImage?.trim()) return r.coverImage.trim();
  const yt = youtubeId(r.sourceUrl);
  return yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : null;
};

// ───────── 主食材狀態：HAVE / SUBBED / OPTIONAL(可不加) / MISSING ─────────
export function coreStatus(recipe, selected) {
  return recipe.core.map((c) => {
    if (selected.has(c)) return { name: c, state: "HAVE" };
    const rep = recipe.replaceable.find((r) => r.original === c);
    const realSubs = rep ? rep.substitutes.filter((s) => s !== "不加") : [];
    const sub = realSubs.find((s) => selected.has(s));
    if (sub) return { name: c, state: "SUBBED", via: sub };
    if (rep && rep.substitutes.includes("不加")) return { name: c, state: "OPTIONAL" };
    return { name: c, state: "MISSING" };
  });
}

export const isReady = (recipe, selected) =>
  coreStatus(recipe, selected).every((d) => d.state !== "MISSING");

// 符合度：已備齊的主食材數（HAVE 或可用替代 SUBBED）
export const matchCount = (recipe, selected) =>
  coreStatus(recipe, selected).filter((d) => d.state === "HAVE" || d.state === "SUBBED").length;

// 篩選器只列出資料中實際出現過的值（依指定順序）
export function activeValues(recipes, getArr, order) {
  const set = new Set();
  recipes.forEach((r) => (getArr(r) || []).forEach((v) => set.add(v)));
  return order.filter((k) => set.has(k));
}

// 備料元件反向索引：prepGuideRef 名稱 → 使用它的食譜清單（依使用數由多到少）
export function prepComponents(recipes) {
  const map = new Map();
  recipes.forEach((r) =>
    (r.prepGuideRef || []).forEach((name) => {
      if (!map.has(name)) map.set(name, []);
      map.get(name).push(r);
    })
  );
  return [...map.entries()]
    .map(([name, used]) => ({ name, recipes: used }))
    .sort((a, b) => b.recipes.length - a.recipes.length);
}

// 計時格式 mm:ss
export const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
