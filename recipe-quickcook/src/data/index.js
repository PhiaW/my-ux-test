// 資料層唯一入口（barrel）
// 所有元件一律從 "../data" import，勿直接伸手進根目錄 ../../data/，
// 以維持「單一來源」：canonical 食材/食譜/情境/備料皆住在根 data/。

// 食譜 + 情境/方法標籤（recipes.js 已橋接根 data/ 並正規化）
export { RECIPES, SCENARIO_LABEL, TAG_VOCAB, METHOD_TAGS } from "./recipes.js";

// 食材：canonical 主檔（含 picker 衍生的 PICKABLE / COMMON / CATEGORY_LABELS）
export {
  INGREDIENTS,
  PICKABLE,
  COMMON,
  CATEGORY_LABELS,
  ALIAS_MAP,
  normalize,
  categoryOf,
} from "../../data/ingredients.js";

// 食材 picker UI 圖示（UI 專屬）
export { CATEGORY_ICONS } from "./ingredients.js";

// 備料元件指南
export { PREP_GUIDES } from "../../data/prep-guides.js";

// 純邏輯 helpers（封面、燈號、篩選、洗牌、計時格式…）
export * from "./helpers.js";
