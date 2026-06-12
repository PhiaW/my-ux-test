// 單一資料來源：直接讀根目錄 data/（與批次匯入 pipeline 共用同一份）
import { RECIPES as RAW_RECIPES } from "../../data/recipes.sample.js";
import { SCENARIO_MAP, SCENARIO_LABEL, TAG_VOCAB, METHOD_TAGS } from "../../data/scenarios.js";

// 情境/方法標籤單一來源：re-export 給 FilterDropdowns / RecipeDetail / HomePage 使用
export { SCENARIO_LABEL, TAG_VOCAB, METHOD_TAGS };

// 食譜 → 封面圖分類（無真實照片時用通用分類圖 public/cover/<key>.jpg）
// 依「擺盤外觀」歸類，一張通用圖代表整類；新食譜在此補 id 即自動套圖
const IMG_CAT_GROUPS = {
  onigiri: ["recipe_001", "recipe_002", "recipe_005", "recipe_b10", "recipe_b11", "recipe_b12", "recipe_b13"],
  "fried-rice": ["recipe_b14", "recipe_b15", "recipe_b16", "recipe_b17", "recipe_b18"],
  donburi: ["recipe_0Ig6Nt4XmVk", "recipe_d32", "recipe_d54", "recipe_d61"],
  "claypot-rice": ["recipe_y0cbHNGGfd8", "recipe_QD8Hcjt1Yu8", "recipe_I7R8V8xfeFU", "recipe_b7w1yqR2HPU", "recipe_xJkUhM-paik", "recipe_d55", "recipe_d58", "recipe_d59"],
  congee: ["recipe_b08", "recipe_b09", "recipe_d42"],
  oatmeal: ["recipe_b01", "recipe_b02", "recipe_b03", "recipe_b04", "recipe_b05", "recipe_b06", "recipe_b07"],
  egg: ["recipe_004", "recipe_006", "recipe_sIbuWJyDyXQ", "recipe_Av76_guazi", "recipe_b19", "recipe_b20", "recipe_b22", "recipe_b23", "recipe_d50", "recipe_d51"],
  pancake: ["recipe_003", "recipe_b21", "recipe_b24"],
  sandwich: ["recipe_b25", "recipe_b26", "recipe_b27", "recipe_b28"],
  chicken: ["recipe_ZqopAN3nLVc", "recipe_Av76_xiangchang", "recipe_d31", "recipe_d33", "recipe_d34", "recipe_d35"],
  fish: ["recipe_rlTbwV3cj9g", "recipe_d37", "recipe_d38", "recipe_d39", "recipe_d40", "recipe_d62"],
  "meat-tofu": ["recipe_KJx4LpGhZYI", "recipe_d43", "recipe_d44", "recipe_d45", "recipe_d46", "recipe_d48", "recipe_d49", "recipe_d53"],
  soup: ["recipe_6zMjBjugWSk", "recipe_d36", "recipe_d41", "recipe_d52", "recipe_d56", "recipe_d60", "recipe_XZy8HR5QlJE"],
  noodles: ["recipe_QttPBfho4_Q", "recipe_d47", "recipe_d57"],
  "snack-box": ["recipe_b29", "recipe_b30"],
};
const IMG_CAT = Object.fromEntries(
  Object.entries(IMG_CAT_GROUPS).flatMap(([cat, ids]) => ids.map((id) => [id, cat]))
);

// 正規化：攤平 ingredients、映射情境去重、保留 tags / prepGuideRef、帶入封面分類
export const RECIPES = RAW_RECIPES.map((r) => {
  const ing = r.ingredients || {};
  const scenarios = [...new Set((r.scenarios || []).map((s) => SCENARIO_MAP[s] || s))];
  return {
    id: r.id,
    title: r.title,
    sourceUrl: r.sourceUrl || "",
    coverImage: r.coverImage || "",
    imgCat: IMG_CAT[r.id] || "",
    servings: r.servings || "",
    scenarios,
    tags: r.tags || [],
    prepGuideRef: r.prepGuideRef || [],
    core: ing.core || [],
    replaceable: ing.replaceable || [],
    seasonings: ing.seasonings || [],
    quantities: r.quantities || {},
    steps: r.steps || { prep: [], cook: [] },
  };
});
