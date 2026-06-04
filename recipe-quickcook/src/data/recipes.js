// 單一資料來源：直接讀根目錄 data/（與批次匯入 pipeline 共用同一份）
import { RECIPES as RAW_RECIPES } from "../../data/recipes.sample.js";

// 情境（時段）標籤
export const SCENARIO_LABEL = { breakfast: "快速早餐", weekend: "假日午晚餐" };

// 舊資料的 dinner 併入 weekend（UI 已縮為兩種情境）
const SCENARIO_MAP = { breakfast: "breakfast", dinner: "weekend", weekend: "weekend" };

// 食安提醒（raw 資料尚無此欄，於此處補；未來可寫回 raw）
const SAFETY_NOTES = {
  recipe_0Ig6Nt4XmVk: ["雞肉須煮至中心全熟、無血水，再給孩子食用。"],
  recipe_rlTbwV3cj9g: [
    "鮭魚需充分加熱至中心不透明，避免生食風險。",
    "生鮮魚類冷藏保存勿超過 1–2 天，並與蔬菜分開處理避免交叉污染。",
  ],
};

// 正規化：攤平 ingredients、映射情境去重、補食安提醒
export const RECIPES = RAW_RECIPES.map((r) => {
  const ing = r.ingredients || {};
  const scenarios = [...new Set((r.scenarios || []).map((s) => SCENARIO_MAP[s] || s))];
  return {
    id: r.id,
    title: r.title,
    sourceUrl: r.sourceUrl || "",
    coverImage: r.coverImage || "",
    servings: r.servings || "",
    scenarios,
    core: ing.core || [],
    replaceable: ing.replaceable || [],
    seasonings: ing.seasonings || [],
    quantities: r.quantities || {},
    steps: r.steps || { prep: [], cook: [] },
    ...(SAFETY_NOTES[r.id] ? { safetyNotes: SAFETY_NOTES[r.id] } : {}),
  };
});
