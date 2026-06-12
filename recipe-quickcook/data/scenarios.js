// 時段場景設定
// scenario 按鈕只負責「篩選符合 impliedTags 的食譜」，不在程式裡寫死條件。
// 食譜若 tags 涵蓋某場景的 impliedTags（或 scenarios 明列該場景），即出現在該場景。

// 唯一來源：app 端一律 import 本檔，勿在 src 另寫死 label/map。
// UI 情境縮為兩種：快速早餐 / 午晚餐（舊資料 dinner 併入 weekend，見 SCENARIO_MAP）。
export const SCENARIOS = [
  {
    id: "breakfast",
    label: "快速早餐",
    impliedTags: ["finger-food", "heat-stable", "no-fresh"], // 固態手抓、耐悶熱、非生鮮
  },
  {
    id: "weekend",
    label: "午晚餐",
    impliedTags: [],
  },
];

// 舊資料的 dinner 併入 weekend（UI 已縮為兩種情境）；正規化時使用
export const SCENARIO_MAP = { breakfast: "breakfast", dinner: "weekend", weekend: "weekend" };

// 由 SCENARIOS 推導 {id: label}，供 filter / 詳情頁顯示
export const SCENARIO_LABEL = SCENARIOS.reduce((m, s) => ((m[s.id] = s.label), m), {});

// tag 詞彙表（食譜 tags 只能用這些；新增 tag 先補這裡）
export const TAG_VOCAB = {
  "finger-food": "固態手抓",
  "heat-stable": "耐悶熱",
  "no-fresh": "非生鮮",
  "freezer-friendly": "可冷凍",
  "quick": "快速（<10 分）",
  "one-pot": "一鍋到底",
  "電鍋": "電鍋",
  "氣炸": "氣炸",
  "kid-friendly": "兒童友善",
};

// 「方法」次篩選只用這些 tag（依此順序顯示）
export const METHOD_TAGS = ["one-pot", "電鍋", "氣炸"];
