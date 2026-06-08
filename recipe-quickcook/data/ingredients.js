// 食材主檔（canonical master list）
// 規則：
//   - name = 標準名（唯一），食譜一律引用此名
//   - aliases = 別名；比對時把別名正規化回標準名（解決「胡蘿蔔/紅蘿蔔」）
//   - category = 採買分類：protein 蛋白質 / vegetable 蔬菜 / grain 主食 /
//                dairy 乳製 / seasoning 調味 / other 其他
//
// 重要：調味料（鹽/糖/油/醬油/清酒…）category 一律 seasoning，且在食譜中
//       放進 ingredients.seasonings（視為恆有、不參與燈號比對）。core 只放主食材。
//
// AI 產食譜時：把本清單的「標準名」一併餵給 AI，要求只能用清單內名稱；
// 若出現新食材，先補進本檔再用。

export const INGREDIENTS = [
  // ── 蛋白質 protein ──
  { name: "雞蛋",       aliases: ["蛋"],                         category: "protein" },
  { name: "嫩豆腐",     aliases: ["豆腐"],                       category: "protein" },
  { name: "豬絞肉",     aliases: ["豬肉末", "絞肉"],              category: "protein" },
  { name: "雞肉絲",     aliases: ["雞胸肉絲"],                   category: "protein" },
  { name: "雞胸肉",     aliases: ["雞肉"],                       category: "protein" },
  { name: "雞腿肉",     aliases: ["去骨雞腿肉", "雞腿排", "雞腿"], category: "protein" },
  { name: "鮭魚",       aliases: ["鮭魚切片"],                   category: "protein" },
  { name: "鱸魚",       aliases: [],                             category: "protein" },
  { name: "虱目魚",     aliases: ["虱目魚片"],                   category: "protein" },
  { name: "蝦仁",       aliases: ["蝦", "草蝦仁"],               category: "protein" },
  { name: "豬五花肉片", aliases: ["五花肉片", "豬五花"],          category: "protein" },
  { name: "豬梅花肉片", aliases: ["梅花肉片", "豬梅花"],          category: "protein" },
  { name: "牛五花肉片", aliases: ["牛五花"],                     category: "protein" },
  { name: "梅花牛肉片", aliases: ["牛梅花肉片"],                  category: "protein" },
  { name: "牛肋條",     aliases: ["牛肋"],                       category: "protein" },
  { name: "牛腩",       aliases: [],                             category: "protein" },
  { name: "牛腱心",     aliases: ["牛腱"],                       category: "protein" },
  { name: "油豆腐",     aliases: ["三角油豆腐", "豆腐泡"],         category: "protein" },
  { name: "香腸",       aliases: ["台式香腸"],                   category: "protein" },
  { name: "蛤蠣",       aliases: ["文蛤", "蜊仔", "海瓜子"],       category: "protein" },
  { name: "板豆腐",     aliases: ["傳統豆腐", "老豆腐"],          category: "protein" },
  { name: "鮪魚罐頭",   aliases: ["鮪魚", "水煮鮪魚", "油漬鮪魚"], category: "protein" },
  { name: "毛豆",       aliases: ["冷凍毛豆", "毛豆仁"],          category: "protein" },

  // ── 蔬菜 vegetable ──
  { name: "南瓜",       aliases: [],                             category: "vegetable" },
  { name: "胡蘿蔔",     aliases: ["紅蘿蔔"],                     category: "vegetable" },
  { name: "綠花椰菜",   aliases: ["花椰菜", "青花菜", "西蘭花"],   category: "vegetable" },
  { name: "洋蔥",       aliases: [],                             category: "vegetable" },
  { name: "蔥",         aliases: ["青蔥", "蔥白", "蔥花"],        category: "vegetable" },
  { name: "鮮香菇",     aliases: ["香菇"],                       category: "vegetable" },
  { name: "番茄",       aliases: ["大番茄", "牛番茄", "蕃茄"],     category: "vegetable" },
  { name: "小黃瓜",     aliases: ["黃瓜"],                       category: "vegetable" },
  { name: "白蘿蔔",     aliases: ["蘿蔔"],                       category: "vegetable" },
  { name: "馬鈴薯",     aliases: ["洋芋"],                       category: "vegetable" },
  { name: "高麗菜",     aliases: [],                             category: "vegetable" },
  { name: "青椒",       aliases: [],                             category: "vegetable" },
  { name: "彩椒",       aliases: ["甜椒"],                       category: "vegetable" },
  { name: "鴻喜菇",     aliases: [],                             category: "vegetable" },
  { name: "雪白菇",     aliases: [],                             category: "vegetable" },
  { name: "綜合菇類",   aliases: ["菇類"],                       category: "vegetable" },
  { name: "蒜苗",       aliases: ["青蒜"],                       category: "vegetable" },
  { name: "娃娃菜",     aliases: ["娃娃白菜", "小白菜"],          category: "vegetable" },
  { name: "青江菜",     aliases: ["青江白菜"],                   category: "vegetable" },
  { name: "金針菇",     aliases: [],                             category: "vegetable" },
  { name: "玉米",       aliases: ["玉米粒", "甜玉米"],            category: "vegetable" },
  { name: "玉米筍",     aliases: [],                             category: "vegetable" },

  // ── 主食 grain ──
  { name: "白飯",       aliases: ["米飯", "飯"],                 category: "grain" },
  { name: "白米",       aliases: ["米", "生米"],                 category: "grain" },
  { name: "麵條",       aliases: ["麵"],                         category: "grain" },
  { name: "義大利麵",   aliases: ["義大利麵條", "義麵"],          category: "grain" },
  { name: "烏龍麵",     aliases: [],                             category: "grain" },
  { name: "地瓜",       aliases: ["番薯", "甘藷", "烤地瓜"],       category: "grain" },
  { name: "吐司",       aliases: ["白吐司", "全麥吐司", "土司"],   category: "grain" },
  { name: "麵包",       aliases: ["餐包", "歐包", "貝果"],         category: "grain" },
  { name: "燕麥",       aliases: ["燕麥片", "即食燕麥", "大燕麥片"], category: "grain" },

  // ── 乳製 dairy ──
  { name: "起司片",     aliases: ["乳酪片", "起士片"],            category: "dairy" },
  { name: "無鹽奶油",   aliases: ["奶油"],                       category: "dairy" },
  { name: "鮮奶",       aliases: ["牛奶", "牛乳"],               category: "dairy" },
  { name: "鮮奶油",     aliases: ["動物性鮮奶油", "鮮奶油醬"],     category: "dairy" },
  { name: "帕瑪森乾酪", aliases: ["帕瑪森起司", "起司粉", "乳酪粉"], category: "dairy" },
  { name: "優格",       aliases: ["無糖優格", "優酪乳"],          category: "dairy" },

  // ── 海苔、醬料基底等 other ──
  { name: "海苔",       aliases: ["壽司海苔", "紫菜"],            category: "other" },
  { name: "義大利麵番茄醬", aliases: ["番茄紅醬", "義式番茄醬", "紅醬"], category: "other" },
  { name: "番茄糊",     aliases: [],                             category: "other" },
  { name: "整粒番茄罐頭", aliases: ["番茄罐頭"],                  category: "other" },
  { name: "無糖豆漿",   aliases: ["豆漿"],                       category: "other" },
  { name: "蔓越莓乾",   aliases: ["蔓越莓"],                     category: "other" },
  { name: "葡萄乾",     aliases: [],                             category: "other" },
  { name: "綜合堅果",   aliases: ["堅果", "堅果碎"],              category: "other" },
  { name: "紅棗",       aliases: ["紅棗乾"],                     category: "other" },
  { name: "枸杞",       aliases: [],                             category: "other" },

  // ── 調味料 seasoning（食譜中放 seasonings） ──
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
  { name: "昆布柴魚高湯", aliases: ["高湯", "柴魚高湯", "昆布高湯"], category: "seasoning" },
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
