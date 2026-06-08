// 食材主檔（canonical master list）— 全 App 唯一食材來源
// 規則：
//   - name = 標準名（唯一），食譜一律引用此名
//   - aliases = 別名；比對時把別名正規化回標準名（解決「胡蘿蔔/紅蘿蔔」）
//   - category = 採買分類：protein 蛋白質 / vegetable 蔬菜 / grain 主食 /
//                dairy 乳製 / seasoning 調味 / other 其他
//   - pick = 是否出現在「我冰箱有」勾選器（PICKABLE 由此推導，勿另寫死名單）
//   - common = 是否為常用食材（picker 優先露出；其餘收在「顯示更多」）
//
// 重要：調味料（鹽/糖/油/醬油/清酒…）category 一律 seasoning，且在食譜中
//       放進 ingredients.seasonings（視為恆有、不參與燈號比對），預設不 pick。
//
// AI 產食譜時：把本清單的「標準名」一併餵給 AI，要求只能用清單內名稱；
// 若出現新食材，先補進本檔再用。

export const INGREDIENTS = [
  // ── 蛋白質 protein ──
  { name: "雞蛋",       aliases: ["蛋"],                         category: "protein", pick: true, common: true },
  { name: "嫩豆腐",     aliases: ["豆腐"],                       category: "protein", pick: true, common: true },
  { name: "豬絞肉",     aliases: ["豬肉末", "絞肉"],              category: "protein", pick: true, common: true },
  { name: "雞肉絲",     aliases: ["雞胸肉絲"],                   category: "protein", pick: true },
  { name: "雞胸肉",     aliases: ["雞肉"],                       category: "protein", pick: true, common: true },
  { name: "雞腿肉",     aliases: ["去骨雞腿肉", "雞腿排", "雞腿"], category: "protein", pick: true, common: true },
  { name: "鮭魚",       aliases: ["鮭魚切片"],                   category: "protein", pick: true, common: true },
  { name: "鱸魚",       aliases: [],                             category: "protein", pick: true },
  { name: "虱目魚",     aliases: ["虱目魚片"],                   category: "protein", pick: true },
  { name: "蝦仁",       aliases: ["蝦", "草蝦仁"],               category: "protein", pick: true },
  { name: "豬五花肉片", aliases: ["五花肉片", "豬五花"],          category: "protein", pick: true },
  { name: "豬梅花肉片", aliases: ["梅花肉片", "豬梅花"],          category: "protein", pick: true, common: true },
  { name: "牛五花肉片", aliases: ["牛五花"],                     category: "protein", pick: true },
  { name: "梅花牛肉片", aliases: ["牛梅花肉片"],                  category: "protein", pick: true },
  { name: "牛肋條",     aliases: ["牛肋"],                       category: "protein", pick: true },
  { name: "牛腩",       aliases: [],                             category: "protein", pick: true },
  { name: "牛腱心",     aliases: ["牛腱"],                       category: "protein", pick: true },
  { name: "油豆腐",     aliases: ["三角油豆腐", "豆腐泡"],         category: "protein" },
  { name: "香腸",       aliases: ["台式香腸"],                   category: "protein" },
  { name: "蛤蠣",       aliases: ["文蛤", "蜊仔", "海瓜子"],       category: "protein" },
  { name: "板豆腐",     aliases: ["傳統豆腐", "老豆腐"],          category: "protein", pick: true, common: true },
  { name: "鮪魚罐頭",   aliases: ["鮪魚", "水煮鮪魚", "油漬鮪魚"], category: "protein", pick: true, common: true },
  { name: "毛豆",       aliases: ["冷凍毛豆", "毛豆仁"],          category: "protein", pick: true },

  // ── 蔬菜 vegetable ──
  { name: "南瓜",       aliases: [],                             category: "vegetable", pick: true, common: true },
  { name: "胡蘿蔔",     aliases: ["紅蘿蔔"],                     category: "vegetable", pick: true, common: true },
  { name: "綠花椰菜",   aliases: ["花椰菜", "青花菜", "西蘭花"],   category: "vegetable", pick: true },
  { name: "洋蔥",       aliases: [],                             category: "vegetable", pick: true, common: true },
  { name: "蔥",         aliases: ["青蔥", "蔥白", "蔥花"],        category: "vegetable", pick: true, common: true },
  { name: "鮮香菇",     aliases: ["香菇"],                       category: "vegetable", pick: true },
  { name: "番茄",       aliases: ["大番茄", "牛番茄", "蕃茄"],     category: "vegetable", pick: true, common: true },
  { name: "小黃瓜",     aliases: ["黃瓜"],                       category: "vegetable", pick: true },
  { name: "白蘿蔔",     aliases: ["蘿蔔"],                       category: "vegetable", pick: true },
  { name: "馬鈴薯",     aliases: ["洋芋"],                       category: "vegetable", pick: true, common: true },
  { name: "高麗菜",     aliases: [],                             category: "vegetable", pick: true, common: true },
  { name: "青椒",       aliases: [],                             category: "vegetable", pick: true },
  { name: "彩椒",       aliases: ["甜椒"],                       category: "vegetable", pick: true },
  { name: "鴻喜菇",     aliases: [],                             category: "vegetable", pick: true },
  { name: "雪白菇",     aliases: [],                             category: "vegetable", pick: true },
  { name: "綜合菇類",   aliases: ["菇類"],                       category: "vegetable", pick: true },
  { name: "蒜苗",       aliases: ["青蒜"],                       category: "vegetable" },
  { name: "娃娃菜",     aliases: ["娃娃白菜", "小白菜"],          category: "vegetable", pick: true },
  { name: "青江菜",     aliases: ["青江白菜"],                   category: "vegetable", pick: true },
  { name: "金針菇",     aliases: [],                             category: "vegetable", pick: true, common: true },
  { name: "玉米",       aliases: ["玉米粒", "甜玉米"],            category: "vegetable", pick: true, common: true },
  { name: "玉米筍",     aliases: [],                             category: "vegetable", pick: true },

  // ── 主食 grain ──
  { name: "白飯",       aliases: ["米飯", "飯"],                 category: "grain", pick: true, common: true },
  { name: "白米",       aliases: ["米", "生米"],                 category: "grain", pick: true, common: true },
  { name: "麵條",       aliases: ["麵"],                         category: "grain", pick: true },
  { name: "義大利麵",   aliases: ["義大利麵條", "義麵"],          category: "grain", pick: true },
  { name: "烏龍麵",     aliases: [],                             category: "grain", pick: true },
  { name: "地瓜",       aliases: ["番薯", "甘藷", "烤地瓜"],       category: "grain", pick: true, common: true },
  { name: "吐司",       aliases: ["白吐司", "全麥吐司", "土司"],   category: "grain", pick: true, common: true },
  { name: "麵包",       aliases: ["餐包", "歐包", "貝果"],         category: "grain", pick: true },
  { name: "燕麥",       aliases: ["燕麥片", "即食燕麥", "大燕麥片"], category: "grain", pick: true, common: true },

  // ── 乳製 dairy（picker 歸入「其他」） ──
  { name: "起司片",     aliases: ["乳酪片", "起士片"],            category: "dairy" },
  { name: "無鹽奶油",   aliases: ["奶油"],                       category: "dairy" },
  { name: "鮮奶",       aliases: ["牛奶", "牛乳"],               category: "dairy", pick: true, common: true },
  { name: "鮮奶油",     aliases: ["動物性鮮奶油", "鮮奶油醬"],     category: "dairy", pick: true },
  { name: "帕瑪森乾酪", aliases: ["帕瑪森起司", "起司粉", "乳酪粉"], category: "dairy" },
  { name: "優格",       aliases: ["無糖優格", "優酪乳"],          category: "dairy", pick: true },

  // ── 海苔、醬料基底等 other ──
  { name: "海苔",       aliases: ["壽司海苔", "紫菜"],            category: "other", pick: true, common: true },
  { name: "義大利麵番茄醬", aliases: ["番茄紅醬", "義式番茄醬", "紅醬"], category: "other", pick: true },
  { name: "番茄糊",     aliases: [],                             category: "other", pick: true },
  { name: "整粒番茄罐頭", aliases: ["番茄罐頭"],                  category: "other", pick: true },
  { name: "無糖豆漿",   aliases: ["豆漿"],                       category: "other", pick: true, common: true },
  { name: "蔓越莓乾",   aliases: ["蔓越莓"],                     category: "other", pick: true },
  { name: "葡萄乾",     aliases: [],                             category: "other", pick: true },
  { name: "綜合堅果",   aliases: ["堅果", "堅果碎"],              category: "other", pick: true },
  { name: "紅棗",       aliases: ["紅棗乾"],                     category: "other", pick: true },
  { name: "枸杞",       aliases: [],                             category: "other", pick: true },

  // ── 調味料 seasoning（食譜中放 seasonings；多數不 pick） ──
  { name: "鹽",         aliases: ["食鹽"],                       category: "seasoning" },
  { name: "醬油",       aliases: [],                             category: "seasoning" },
  { name: "醬油膏",     aliases: [],                             category: "seasoning" },
  { name: "雞骨高湯",   aliases: ["雞高湯"],                     category: "seasoning" },
  { name: "醬瓜",       aliases: ["蔭瓜", "花瓜"],               category: "seasoning" },
  { name: "糖",         aliases: ["砂糖", "白糖"],               category: "seasoning" },
  { name: "黑糖",       aliases: [],                             category: "seasoning" },
  { name: "白胡椒粉",   aliases: ["白胡椒", "胡椒粉"],            category: "seasoning" },
  { name: "黑胡椒",     aliases: ["黑胡椒粒", "綜合胡椒粒"],       category: "seasoning" },
  { name: "太白粉",     aliases: [],                             category: "seasoning" },
  { name: "橄欖油",     aliases: ["油", "食用油", "沙拉油"],       category: "seasoning" },
  { name: "清酒",       aliases: ["料理酒"],                     category: "seasoning" },
  { name: "米酒",       aliases: [],                             category: "seasoning" },
  { name: "白酒",       aliases: ["白葡萄酒"],                   category: "seasoning" },
  { name: "醋",         aliases: ["白醋"],                       category: "seasoning" },
  { name: "味醂",       aliases: [],                             category: "seasoning" },
  { name: "白味噌",     aliases: ["味噌", "味噌醬"],              category: "seasoning" },
  { name: "蒜頭",       aliases: ["蒜", "大蒜", "蒜末", "蒜碎", "蒜泥"], category: "seasoning" },
  { name: "辣椒",       aliases: [],                             category: "seasoning" },
  { name: "辣椒粉",     aliases: [],                             category: "seasoning" },
  { name: "昆布柴魚高湯", aliases: ["高湯", "柴魚高湯", "昆布高湯"], category: "seasoning", pick: true },
  { name: "西班牙煙燻紅椒粉", aliases: ["煙燻紅椒粉", "紅椒粉"],   category: "seasoning" },
  { name: "綜合香料",   aliases: ["義式香料", "綜合香草", "義式香草"], category: "seasoning" },
  { name: "伍斯特醬",   aliases: ["烏斯特醬", "辣醬油"],          category: "seasoning" },
  { name: "薑",         aliases: ["嫩薑", "薑絲", "薑片", "老薑"],  category: "seasoning" },
  { name: "芝麻油",     aliases: ["麻油", "香油"],               category: "seasoning" },
  { name: "蠔油",       aliases: [],                             category: "seasoning" },
  { name: "麵粉",       aliases: ["高筋麵粉", "低筋麵粉", "中筋麵粉"], category: "seasoning" },
  { name: "迷迭香",     aliases: ["迷迭香草"],                   category: "seasoning" },
  { name: "肉豆蔻",     aliases: [],                             category: "seasoning" },
  { name: "乾蝦仁",     aliases: ["蝦米", "蝦皮"],               category: "seasoning" },
  { name: "乾干貝絲",   aliases: ["干貝絲"],                     category: "seasoning" },
  { name: "咖哩塊",     aliases: ["咖哩", "咖哩醬"],              category: "seasoning" },
  { name: "美乃滋",     aliases: ["沙拉醬", "美奶滋", "蛋黃醬"],   category: "seasoning" },
];

// 別名 → 標準名 對照表（比對時用）
export const ALIAS_MAP = INGREDIENTS.reduce((map, ing) => {
  map[ing.name] = ing.name;
  ing.aliases.forEach((a) => { map[a] = ing.name; });
  return map;
}, {});

// 正規化：任何輸入名 → 標準名（找不到則原樣回傳）
export const normalize = (raw) => ALIAS_MAP[raw?.trim()] ?? raw?.trim();

// 取分類（給採買清單分組用）
export const categoryOf = (name) =>
  INGREDIENTS.find((i) => i.name === normalize(name))?.category ?? "other";

export const CATEGORY_LABELS = {
  protein: "蛋白質",
  vegetable: "蔬菜",
  grain: "主食",
  dairy: "乳製品",
  seasoning: "調味料",
  other: "其他",
};

// ───────── picker 衍生資料（由主檔推導，勿另寫死名單） ─────────
// canonical category → picker 分組：dairy / seasoning 併入 other
const PICK_BUCKET = {
  protein: "protein",
  vegetable: "vegetable",
  grain: "grain",
  dairy: "other",
  seasoning: "other",
  other: "other",
};

// PICKABLE：{ protein:[...], vegetable:[...], grain:[...], other:[...] }
export const PICKABLE = INGREDIENTS.filter((i) => i.pick).reduce((m, i) => {
  const bucket = PICK_BUCKET[i.category];
  (m[bucket] ||= []).push(i.name);
  return m;
}, {});

// COMMON：常用食材（picker 優先露出）
export const COMMON = new Set(INGREDIENTS.filter((i) => i.common).map((i) => i.name));
