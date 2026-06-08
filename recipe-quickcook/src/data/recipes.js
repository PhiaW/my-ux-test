// 單一資料來源：直接讀根目錄 data/（與批次匯入 pipeline 共用同一份）
import { RECIPES as RAW_RECIPES } from "../../data/recipes.sample.js";
import { SCENARIO_MAP, SCENARIO_LABEL, TAG_VOCAB } from "../../data/scenarios.js";

// 情境/方法標籤單一來源：re-export 給 FilterDropdowns / RecipeDetail / HomePage 使用
export { SCENARIO_LABEL, TAG_VOCAB };

// 正規化：攤平 ingredients、映射情境去重、保留 tags / prepGuideRef
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
    tags: r.tags || [],
    prepGuideRef: r.prepGuideRef || [],
    core: ing.core || [],
    replaceable: ing.replaceable || [],
    seasonings: ing.seasonings || [],
    quantities: r.quantities || {},
    steps: r.steps || { prep: [], cook: [] },
  };
});
