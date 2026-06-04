// 時段場景設定
// scenario 按鈕只負責「篩選符合 impliedTags 的食譜」，不在程式裡寫死條件。
// 食譜若 tags 涵蓋某場景的 impliedTags（或 scenarios 明列該場景），即出現在該場景。

export const SCENARIOS = [
  {
    id: "breakfast",
    label: "週間早餐",
    impliedTags: ["finger-food", "heat-stable", "no-fresh"], // 固態手抓、耐悶熱、非生鮮
  },
  {
    id: "dinner",
    label: "平日晚餐",
    impliedTags: [],
  },
  {
    id: "weekend",
    label: "週末三餐",
    impliedTags: [],
  },
];

// tag 詞彙表（食譜 tags 只能用這些；新增 tag 先補這裡）
export const TAG_VOCAB = {
  "finger-food": "固態手抓",
  "heat-stable": "耐悶熱",
  "no-fresh": "非生鮮",
  "freezer-friendly": "可冷凍",
  "quick": "快速（<10 分）",
  "one-pot": "一鍋到底",
  "kid-friendly": "兒童友善",
};
