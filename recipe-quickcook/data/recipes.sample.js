// 食譜資料（強化版 schema）
// 休假時用 AI 依 data-model.md 的 prompt 批次產出，貼進這個 Array 即可。
//
// 欄位說明見 ../data-model.md
// 規則：
//   - core 只放主食材（標準名、不含份量）。
//   - replaceable：缺件可替代；substitutes 含 "不加" 表示該主食材可省略。
//   - seasonings：調味料區，物件 {name, optional?, note?}；optional=true 表示可省略
//     （如含酒給孩子、或不易取得）。預設視為常備、不參與燈號比對。
//   - 份量另存 quantities map（顯示用）。
//   - steps 分兩段：prep（前置準備：開火前洗切醃調醬）、cook（開始料理：熱鍋開火後）。
//   - sourceUrl 優先用 YouTube（coverImage 留空時自動取 YT 縮圖，見 media.js）；
//     其他來源（如 IG）僅作備查外跳、無自動縮圖。recipe_001 飯糰為早期 IG 種子範例。

export const RECIPES = [
  {
    id: "recipe_001",
    title: "消防車紅蘿蔔肉末海苔飯糰",
    sourceUrl: "https://instagram.com/p/xxxxxx",
    coverImage: "",
    servings: "1 兒童份",
    scenarios: ["breakfast", "dinner"],
    tags: ["finger-food", "heat-stable", "no-fresh", "freezer-friendly", "kid-friendly"],
    ingredients: {
      core: ["胡蘿蔔", "豬絞肉", "白飯", "海苔"],
      replaceable: [
        { original: "豬絞肉", substitutes: ["雞肉絲"] },
      ],
      seasonings: [
        { name: "鹽" },
        { name: "醬油" },
      ],
    },
    quantities: {},
    prepGuideRef: ["胡蘿蔔泥", "炒熟豬絞肉"],
    steps: {
      prep: [
        { text: "取出冷凍的胡蘿蔔泥與熟豬絞肉，微波解凍加熱。", timerSec: null },
      ],
      cook: [
        { text: "白飯、胡蘿蔔泥、肉末均勻拌勻，捏成消防車造型飯糰。", timerSec: null },
        { text: "包裹大片壽司海苔（乾性防漏）。", timerSec: null },
        { text: "開啟電風扇吹涼散熱，再蓋上保鮮盒蓋子（防止海苔濕軟）。", timerSec: 60 },
      ],
    },
  },

  {
    id: "recipe_0Ig6Nt4XmVk",
    title: "番茄雞肉丼飯",
    sourceUrl: "https://www.youtube.com/watch?v=0Ig6Nt4XmVk",
    coverImage: "",
    servings: "2-3 人份",
    scenarios: ["dinner"],
    tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["雞胸肉", "番茄", "小黃瓜", "白飯"],
      replaceable: [
        { original: "雞胸肉", substitutes: ["雞腿肉"] },
        { original: "小黃瓜", substitutes: ["青椒", "彩椒"] },
      ],
      seasonings: [
        { name: "蒜頭" },
        { name: "鹽" },
        { name: "糖" },
        { name: "白胡椒粉" },
        { name: "太白粉" },
        { name: "橄欖油" },
        { name: "醬油" },
        { name: "白味噌" },
        { name: "醋" },
        { name: "清酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "辣椒", optional: true, note: "怕辣可省略" },
      ],
    },
    quantities: {
      "雞胸肉": "350g", "番茄": "3個", "小黃瓜": "2根（約200g）", "白飯": "適量",
      "醬油": "2茶匙", "清酒": "1大匙", "醋": "1.5大匙", "白味噌": "20g", "蒜頭": "2-3瓣",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "雞胸肉逆紋切成厚片。", timerSec: null },
        { text: "雞肉加入少許鹽、糖、白胡椒粉抓勻，靜置醃製。", timerSec: null },
        { text: "大番茄去皮切半，用湯匙挖出番茄籽（保留備用），番茄肉切大塊。", timerSec: null },
        { text: "小黃瓜切半去籽（防止出水），切滾刀塊；蒜頭切碎。", timerSec: null },
        { text: "將番茄籽剁碎，加入醬油2茶匙、清酒1大匙、醋1.5大匙、糖1茶匙、白胡椒粉1茶匙、白味噌20g混合調勻成醬汁。", timerSec: null },
        { text: "醃好的雞肉表面輕輕沾上一層薄薄的太白粉。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋倒入橄欖油，下雞肉雙面煎至金黃微焦後撈出備用。", timerSec: null },
        { text: "原鍋補少許油，中小火爆香蒜碎（可依喜好加辣椒）。", timerSec: null },
        { text: "倒入調好的醬汁，慢火熬煮至醬汁冒泡變濃稠。", timerSec: null },
        { text: "放入小黃瓜塊和番茄塊與醬汁翻炒均勻。", timerSec: null },
        { text: "倒回雞肉拌炒，讓雞肉均勻裹上醬汁。", timerSec: null },
        { text: "起鍋前撒入少許胡椒粉，淋上少許醋提味，鋪在熱白飯上即可。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_y0cbHNGGfd8",
    title: "蘿蔔雞肉炊飯",
    sourceUrl: "https://www.youtube.com/watch?v=y0cbHNGGfd8",
    coverImage: "",
    servings: "3-4 人份",
    scenarios: ["dinner", "weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "白蘿蔔", "白米","昆布柴魚高湯"],
      replaceable:  [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
        { original: "昆布柴魚高湯", substitutes: ["水"] },
      ],
      seasonings: [
        { name: "醬油" },
        { name: "味醂" },
        { name: "鹽" },
        { name: "糖" },
        { name: "橄欖油" },
        { name: "白胡椒粉" },
        { name: "清酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "蔥", optional: true, note: "裝飾用，可省略" },
      ],
    },
    quantities: {
      "雞腿肉": "1隻", "白蘿蔔": "400g（去皮後）", "白米": "300g", "昆布柴魚高湯": "300g",
      "醬油": "2大匙", "味醂": "1大匙", "鹽": "4g", "糖": "4g",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "去骨雞腿肉切成等份塊狀，擦乾水分備用。", timerSec: null },
        { text: "白蘿蔔刨去兩層外皮（口感較細），切成三角立體小塊狀。", timerSec: null },
        { text: "白蘿蔔塊加入鹽4g、糖4g搖晃均勻，靜置去苦澀味並入味。", timerSec: 1800 },
        { text: "雞肉塊加入少許鹽、白胡椒粉、糖1小匙、清酒1大匙抓揉均勻醃製。", timerSec: null },
        { text: "將醃好出水的白蘿蔔水份倒掉並瀝乾。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋倒入橄欖油，雞皮朝下將雞腿肉煎至表面焦香，翻面稍微煎一下撈出。", timerSec: null },
        { text: "原鍋放入瀝乾的蘿蔔塊，與雞肉油脂一同翻炒約2分鐘讓味道融合，隨即關火。", timerSec: null },
        { text: "將洗好瀝乾的白米放入鍋中，加入高湯300g、醬油2大匙、味醂1大匙攪拌均勻。", timerSec: null },
        { text: "將炒好的雞肉與蘿蔔鋪在米飯上（鍋底多餘的水分與油脂不要加進去）。", timerSec: null },
        { text: "壓力鍋：蓋上鍋蓋開中火，上壓後轉小火計時2分鐘，關火等待卸壓。電子鍋：直接啟動一般煮飯模式。", timerSec: null },
        { text: "煮好後開蓋，將飯與配料充份攪拌均勻，可依喜好加入蔥花增添香氣。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_rlTbwV3cj9g",
    title: "北海道鮭魚蔬菜燒",
    sourceUrl: "https://www.youtube.com/watch?v=rlTbwV3cj9g",
    coverImage: "",
    servings: "4 人份",
    scenarios: ["dinner", "weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["鮭魚", "高麗菜", "洋蔥", "胡蘿蔔", "綜合菇類"],
      replaceable: [
        { original: "鮭魚", substitutes: ["鱸魚", "虱目魚"] },
        { original: "綜合菇類", substitutes: ["鮮香菇"] },
      ],
      seasonings: [
        { name: "無鹽奶油" },
        { name: "鹽" },
        { name: "蒜頭" },
        { name: "白味噌" },
        { name: "味醂" },
        { name: "黑糖" },
        { name: "白胡椒粉" },
        { name: "黑胡椒" },
        { name: "清酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "蔥", optional: true, note: "裝飾用，可省略" },
      ],
    },
    quantities: {
      "鮭魚": "450g", "高麗菜": "半顆", "洋蔥": "1顆", "胡蘿蔔": "1條", "綜合菇類": "1盒",
      "無鹽奶油": "10g", "清酒": "2大匙", "黑糖": "5g",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "鮭魚切除中央大骨（魚骨保留煮湯），並用拔毛夾拔除肉中細刺。", timerSec: null },
        { text: "鮭魚兩面均勻抹上少許鹽、白胡椒粉，再淋上少許清酒抓掩按摩去腥。", timerSec: null },
        { text: "高麗菜去芯，硬梗切細，菜葉用手撕或切成大塊；洋蔥切瓣；胡蘿蔔切半月片；菇類去蒂頭掰開備用。", timerSec: null },
        { text: "調製醬汁：將白味噌、味醂、清酒2大匙、黑糖5g及少許蒜泥混合攪拌均勻。", timerSec: null },
        { text: "用廚房紙巾將醃好的鮭魚表面水分完全吸乾。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋倒入適量油，下鮭魚片大火煎至雙面金黃（一面約3分鐘，另一面約2分鐘，約九分熟）後撈出。", timerSec: null },
        { text: "用紙巾吸掉鍋中大部分油，僅留底油，放入奶油10g加熱至融化冒泡。", timerSec: null },
        { text: "下洋蔥、胡蘿蔔、高麗菜梗翻炒均勻，撒入少許黑胡椒炒出香氣。", timerSec: null },
        { text: "加入菇類翻炒至表面微黃，再鋪上高麗菜葉，蓋上鍋蓋燜軟。", timerSec: 40 },
        { text: "開蓋將蔬菜翻炒均勻，倒入調好的味噌醬汁拌炒，讓蔬菜均勻沾裹醬汁。", timerSec: null },
        { text: "將煎好的鮭魚片鋪在蔬菜上方，蓋上鍋蓋，轉中小火燜煮使味道融合。", timerSec: 300 },
        { text: "起鍋前撒上蔥花裝飾，即可連鍋上桌享用。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_sIbuWJyDyXQ",
    title: "家常番茄炒蛋",
    sourceUrl: "https://www.youtube.com/watch?v=sIbuWJyDyXQ",
    coverImage: "",
    servings: "1-2 人份",
    scenarios: ["dinner"],
    tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["番茄", "雞蛋", "蝦仁"],
      replaceable: [
        { original: "蝦仁", substitutes: ["乾蝦仁", "乾干貝絲", "不加"] },
      ],
      seasonings: [
        { name: "蔥" },
        { name: "蒜頭" },
        { name: "橄欖油" },
        { name: "糖" },
        { name: "鹽" },
        { name: "白胡椒粉" },
        { name: "米酒", optional: true, note: "含酒，給孩子可省略" },
      ],
    },
    quantities: {
      "番茄": "3顆", "雞蛋": "6顆", "蝦仁": "適量", "蔥": "1根", "蒜頭": "2瓣", "糖": "3-5g",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "番茄頂部輕劃十字，放入熱水燙5秒，撈出沖冰水去皮並切成6等份塊狀。", timerSec: null },
        { text: "青蔥切段並將蔥白與蔥綠分開，蒜頭切成蒜碎備用。", timerSec: null },
        { text: "打入雞蛋，加入3-5克糖徹底打勻至充氣。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋加入多一點橄欖油，微溫時倒入蛋液，用鍋鏟由外向內推動。", timerSec: null },
        { text: "蛋液大致凝固不流動時立刻關火，利用餘溫熟化後盛出備用。", timerSec: null },
        { text: "擦乾淨鍋子，冷鍋冷油下蔥白碎和蒜碎，小火炒出香味。", timerSec: null },
        { text: "加入蝦仁稍微推到鍋邊，接著放入番茄塊輕輕翻炒。", timerSec: null },
        { text: "加入少許白胡椒粉和少許鹽調味。", timerSec: null },
        { text: "倒入少許米酒和水（共約50ml），蓋上鍋蓋小火燜煮至番茄軟化。", timerSec: null },
        { text: "打開鍋蓋，轉小火，倒入先前炒好的雞蛋，輕輕翻動把蛋塊切成適當大小。", timerSec: null },
        { text: "關火，撒上蔥綠翻拌均勻即可盛盤。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_KJx4LpGhZYI",
    title: "無水版馬鈴薯燉肉",
    sourceUrl: "https://www.youtube.com/watch?v=KJx4LpGhZYI",
    coverImage: "",
    servings: "3-4 人份",
    scenarios: ["weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["洋蔥", "豬五花肉片", "豬梅花肉片", "馬鈴薯", "胡蘿蔔", "鴻喜菇"],
      replaceable: [
        { original: "豬五花肉片", substitutes: ["牛五花肉片", "梅花牛肉片"] },
        { original: "鴻喜菇", substitutes: ["雪白菇", "鮮香菇"] },
      ],
      seasonings: [
        { name: "蒜頭" },
        { name: "鹽" },
        { name: "味醂" },
        { name: "醬油" },
        { name: "糖" },
        { name: "白胡椒粉" },
        { name: "清酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "蔥", optional: true, note: "裝飾用，可省略" },
      ],
    },
    quantities: {
      "洋蔥": "2-3顆", "豬五花肉片": "適量", "豬梅花肉片": "適量", "馬鈴薯": "2-3顆",
      "胡蘿蔔": "1根", "鴻喜菇": "1盒", "蒜頭": "35g",
      "清酒": "70cc", "味醂": "50cc", "醬油": "35-40cc", "糖": "5g",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "豬肉片對切成適當大小並一片片分開，加入少許鹽、白胡椒粉、清酒抓勻醃製。", timerSec: null },
        { text: "洋蔥切寬條狀，鋪滿鑄鐵鍋底部並用雙手抓鬆。", timerSec: null },
        { text: "蒜頭切成蒜碎（約35克），均勻撒在洋蔥上。", timerSec: null },
        { text: "鴻喜菇切除底部、剝開，均勻鋪在鍋內。", timerSec: null },
        { text: "將醃好的豬肉片一片片分開，均勻鋪在菇類上方。", timerSec: null },
        { text: "紅蘿蔔與馬鈴薯去皮、挖除凹眼，切成滾刀塊（馬鈴薯塊比紅蘿蔔略大），均勻鋪在肉片上。", timerSec: null },
        { text: "調製醬汁：將清酒70cc、味醂50cc、醬油35-40cc、糖5克混合均勻備用。", timerSec: null },
      ],
      cook: [
        { text: "在最上方的蔬菜表面撒上極少許鹽提味，蓋上鍋蓋，以中小火慢煮。", timerSec: 900 },
        { text: "打開鍋蓋，確認食材已蒸煮出水，將整鍋食材徹底翻拌均勻。", timerSec: null },
        { text: "倒入調好的醬汁拌勻，將表面稍微壓平，蓋上鍋蓋，轉中小火繼續燉煮。", timerSec: 1800 },
        { text: "時間到後打開鍋蓋，輕輕翻拌均勻，撒上蔥花即可整鍋上桌。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_QttPBfho4_Q",
    title: "簡單版番茄燉牛肉義大利麵",
    sourceUrl: "https://www.youtube.com/watch?v=QttPBfho4_Q",
    coverImage: "",
    servings: "4-5 人份",
    scenarios: ["weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["牛肋條", "番茄", "洋蔥", "義大利麵番茄醬", "麵條"],
      replaceable: [
        { original: "麵條", substitutes: ["義大利麵", "烏龍麵"] },
        { original: "牛肋條", substitutes: ["牛腩", "牛腱心"] },
        { original: "義大利麵番茄醬", substitutes: ["番茄糊", "整粒番茄罐頭"] },
      ],
      seasonings: [
        { name: "蒜頭" },
        { name: "鹽" },
        { name: "黑胡椒" },
        { name: "綜合香料" },
        { name: "蒜苗", optional: true, note: "裝飾用，可省略" },
        { name: "西班牙煙燻紅椒粉", optional: true, note: "不易取得可省略" },
        { name: "伍斯特醬", optional: true, note: "不易取得可省略" },
        { name: "辣椒粉", optional: true, note: "怕辣可省略" },
      ],
    },
    quantities: {
      "牛肋條": "750g", "番茄": "2-3顆", "洋蔥": "1顆", "義大利麵番茄醬": "340g", "麵條": "適量",
      "蒜頭": "35g", "西班牙煙燻紅椒粉": "7-10g", "伍斯特醬": "30ml",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "洋蔥切細丁，蒜頭切末，蒜苗蒜白切片，牛番茄切大丁備用。", timerSec: null },
        { text: "牛肋條修除多餘油脂（油留用），肉切小塊，加鹽、黑胡椒、綜合香料抓勻醃製。", timerSec: null },
      ],
      cook: [
        { text: "修下的牛油下鍋煸出油脂，取出部分油，留底油將牛肉塊分批煎至表面焦香後盛出。", timerSec: null },
        { text: "原鍋視情況補牛油和橄欖油，下洋蔥丁炒香，再下蒜白片與蒜末充分炒出香氣。", timerSec: null },
        { text: "將牛肉倒回鍋中與蔬菜拌勻，加入西班牙煙燻紅椒粉、辣椒粉炒香，再加鹽、黑胡椒、綜合香料調味。", timerSec: null },
        { text: "放入新鮮番茄塊充分拌炒均勻。", timerSec: null },
        { text: "倒入一罐義大利麵番茄醬，並用原醬罐裝半罐水搖勻後倒入鍋中。", timerSec: null },
        { text: "加入伍斯特醬輕輕拌勻。", timerSec: null },
        { text: "轉最小火，蓋上鍋蓋燉煮。", timerSec: 3600 },
        { text: "開蓋確認味道即完成，搭配煮好的麵條一同享用。", timerSec: null },
      ],
    },
  },

  // ── 蘿潔塔的廚房（YouTube 批次匯入 2026-06-02）──
  {
    id: "recipe_ZqopAN3nLVc",
    title: "蔥薑爆雞",
    sourceUrl: "https://www.youtube.com/watch?v=ZqopAN3nLVc",
    coverImage: "",
    servings: "2-3 人份",
    scenarios: ["dinner"],
    tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "蔥"],
      replaceable: [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
      ],
      seasonings: [
        { name: "薑" },
        { name: "鹽" },
        { name: "糖" },
        { name: "白胡椒粉" },
        { name: "太白粉" },
        { name: "芝麻油" },
        { name: "醬油" },
        { name: "蠔油" },
        { name: "清酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "辣椒", optional: true, note: "怕辣可省略，有辣味更香" },
      ],
    },
    quantities: {
      "雞腿肉": "約300g", "蔥": "3-4株（159g）", "薑": "約30g",
      "醬油": "10g", "蠔油": "7g", "糖": "2g", "清酒": "1大匙", "太白粉": "2小匙",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "雞腿肉切成絲，加入少許鹽、糖、清酒、太白粉水與少量芝麻油拌勻，醃製。", timerSec: 600 },
        { text: "青蔥切斜片並將蔥白、蔥綠分開；嫩薑與辣椒切絲備用。", timerSec: null },
        { text: "調醬汁：醬油10g、蠔油7g、糖2g、清酒1大匙混合拌勻。", timerSec: null },
      ],
      cook: [
        { text: "平底鍋倒入油，先放入雞肉絲煎出焦香至差不多熟。", timerSec: null },
        { text: "放入辣椒絲、嫩薑絲與蔥白炒出香味。", timerSec: null },
        { text: "倒入醬汁嗆出醬香，最後放入蔥綠翻炒一下即可起鍋。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_6zMjBjugWSk",
    title: "雞肉巧達濃湯",
    sourceUrl: "https://www.youtube.com/watch?v=6zMjBjugWSk",
    coverImage: "",
    servings: "3-4 人份",
    scenarios: ["dinner", "weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "胡蘿蔔", "馬鈴薯", "洋蔥", "鮮奶", "鮮奶油"],
      replaceable: [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
      ],
      seasonings: [
        { name: "蒜頭" },
        { name: "無鹽奶油" },
        { name: "麵粉" },
        { name: "鹽" },
        { name: "黑胡椒" },
        { name: "白味噌" },
        { name: "清酒", optional: true, note: "可用白葡萄酒；含酒給孩子可省略" },
        { name: "迷迭香", optional: true, note: "不易取得可省略" },
        { name: "肉豆蔻", optional: true, note: "不易取得可省略" },
        { name: "帕瑪森乾酪", optional: true, note: "可省略" },
      ],
    },
    quantities: {
      "雞腿肉": "600g", "胡蘿蔔": "1條（200g）", "馬鈴薯": "2顆（500g）", "洋蔥": "1-2顆（300g）",
      "鮮奶": "200ml", "鮮奶油": "200ml", "蒜頭": "30g", "無鹽奶油": "20g+20g（湯）／30g（白醬）",
      "麵粉": "30g", "清酒": "2大匙", "白味噌": "10g",
    },
    prepGuideRef: [],
    // ⚠ steps 為標準巧達濃湯作法推測（來源描述未附作法），待對影片校對。
    steps: {
      prep: [
        { text: "雞腿肉切塊；胡蘿蔔、馬鈴薯、洋蔥切小丁；蒜頭切末備用。", timerSec: null },
      ],
      cook: [
        { text: "鍋中放奶油，炒香蒜末與洋蔥，加入雞肉塊煎至表面變色。", timerSec: null },
        { text: "下胡蘿蔔、馬鈴薯略炒，加熱水400~500ml、清酒、迷迭香，煮至蔬菜軟透。", timerSec: 1200 },
        { text: "另起鍋做白醬：奶油30g融化後加麵粉30g炒勻，分次加入鮮奶與鮮奶油攪打至滑順。", timerSec: null },
        { text: "白醬倒入湯鍋拌勻，加白味噌、鹽、黑胡椒調味，可刨少許肉豆蔻與帕瑪森乾酪。", timerSec: null },
      ],
    },
  },

  // ── 自製簡易早餐（Gemini 生成，純文字無 YT；sourceUrl 留空 → 顯示品牌佔位圖）──
  {
    id: "recipe_002",
    title: "高鐵小火車海苔起司飯糰",
    sourceUrl: "",
    coverImage: "",
    servings: "1 小份",
    scenarios: ["breakfast"],
    tags: ["finger-food", "heat-stable", "no-fresh", "quick", "kid-friendly"],
    ingredients: {
      core: ["白飯", "起司片", "海苔"],
      replaceable: [
        { original: "起司片", substitutes: ["不加"] },
      ],
      seasonings: [
        { name: "鹽", optional: true },
      ],
    },
    quantities: { "白飯": "半碗", "起司片": "半片", "海苔": "1片（大片壽司海苔）" },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "將起司片切成細絲或碎狀備用。", timerSec: null },
        { text: "準備一張大片壽司海苔，用乾淨剪刀剪成火車造型（或條狀長條）備用。", timerSec: null },
      ],
      cook: [
        { text: "溫熱的白飯加入起司碎（利用餘溫讓起司微融增加黏性），可加極少許鹽拌勻。", timerSec: null },
        { text: "將起司飯捏成小高鐵或小火車形狀的緊實飯糰。", timerSec: null },
        { text: "外面包覆剪好的壽司海苔，利用飯的濕氣讓海苔自然黏緊固定。", timerSec: null },
        { text: "開啟電風扇吹涼 1 分鐘散熱，確保乾爽後再裝入保鮮盒（防止海苔悶軟）。", timerSec: 60 },
      ],
    },
  },

  {
    id: "recipe_003",
    title: "金黃南瓜豆腐手抓煎餅",
    sourceUrl: "",
    coverImage: "",
    servings: "1 小份",
    scenarios: ["breakfast"],
    tags: ["finger-food", "heat-stable", "quick", "kid-friendly"],
    ingredients: {
      core: ["南瓜", "嫩豆腐", "雞蛋"],
      replaceable: [
        { original: "南瓜", substitutes: ["胡蘿蔔"] },
      ],
      seasonings: [
        { name: "鹽" },
      ],
    },
    quantities: { "南瓜": "1大匙（南瓜泥）", "嫩豆腐": "1/4盒", "雞蛋": "1顆" },
    prepGuideRef: ["南瓜泥"],
    steps: {
      prep: [
        { text: "從冷凍庫取出週末預製的南瓜泥，微波解凍備用。", timerSec: null },
        { text: "冷藏的嫩豆腐用湯匙壓碎，並用廚房紙巾稍微吸乾多餘水分。", timerSec: null },
        { text: "大碗中打入雞蛋，加入南瓜泥、壓碎的嫩豆腐與少許鹽，用叉子徹底攪拌均勻成濃稠蛋糊。", timerSec: null },
      ],
      cook: [
        { text: "平底鍋開小火，倒入極少許油，用湯匙挖取適量蛋糊平鋪於鍋面，形成一口大小的小圓餅。", timerSec: null },
        { text: "小火慢煎至底部定型且邊緣微焦，小心翻面。", timerSec: null },
        { text: "煎至兩面金黃、中心熟透（豆腐與蛋完全凝固）即可起鍋。", timerSec: null },
        { text: "開啟電風扇吹涼 1 分鐘散熱，再裝盒外帶。", timerSec: 60 },
      ],
    },
  },

  {
    id: "recipe_004",
    title: "綠花椰菜碎蒸蛋磚",
    sourceUrl: "",
    coverImage: "",
    servings: "1 小份",
    scenarios: ["breakfast", "dinner"],
    tags: ["finger-food", "heat-stable", "freezer-friendly", "quick", "kid-friendly"],
    ingredients: {
      core: ["綠花椰菜", "雞蛋"],
      replaceable: [
        { original: "綠花椰菜", substitutes: ["胡蘿蔔"] },
      ],
      seasonings: [
        { name: "鹽" },
        { name: "醬油", optional: true },
      ],
    },
    quantities: { "綠花椰菜": "1大匙（花椰菜碎）", "雞蛋": "1顆" },
    prepGuideRef: ["綠花椰菜碎"],
    steps: {
      prep: [
        { text: "取出週末已川燙並冷凍的綠花椰菜碎，微波解凍加熱。", timerSec: null },
        { text: "準備一個可微波的耐熱方形小容器，內壁薄擦一層油（方便脫模）。", timerSec: null },
        { text: "耐熱容器內打入雞蛋，加入解凍的綠花椰菜碎、少許鹽（或1滴醬油）與1大匙溫水，徹底打散均勻。", timerSec: null },
      ],
      cook: [
        { text: "蓋上微波專用蓋（留小縫），以中火（約500W-600W）微波至完全凝固。亦可用電鍋外鍋半杯水蒸熟。", timerSec: 90 },
        { text: "取出稍微放涼後倒扣脫模，將方形蒸蛋切成長條「磚狀」（方便小子用手抓取且不沾手）。", timerSec: null },
        { text: "開啟電風扇吹涼 1 分鐘散熱，排除多餘水氣後再蓋盒外帶。", timerSec: 60 },
      ],
    },
  },

  {
    id: "recipe_005",
    title: "香蔥雞肉絲香拌飯糰",
    sourceUrl: "",
    coverImage: "",
    servings: "1 小份",
    scenarios: ["breakfast", "dinner"],
    tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["雞肉絲", "蔥", "白飯", "海苔"],
      replaceable: [
        { original: "雞肉絲", substitutes: ["豬絞肉"] },
        { original: "蔥", substitutes: ["不加"] },
      ],
      seasonings: [
        { name: "醬油" },
      ],
    },
    quantities: { "雞肉絲": "1大匙（熟）", "蔥": "少許（蔥花）", "白飯": "半碗", "海苔": "1片（大片壽司海苔）" },
    prepGuideRef: ["炒熟豬絞肉"],
    steps: {
      prep: [
        { text: "將蔥切成極細的蔥花備用。大片海苔剪成條狀備用。", timerSec: null },
        { text: "若雞肉絲為冷凍，先微波解凍，並用乾淨廚房剪刀稍微剪得更細碎（方便小子咀嚼）。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋不用油（或極少許油），下蔥花與雞肉絲稍微翻炒出香味。", timerSec: null },
        { text: "淋入半小匙醬油快速翻炒均勻，讓肉絲收汁上色後關火盛出。", timerSec: null },
        { text: "將炒好的香蔥雞肉絲與溫熱白飯混合均勻，用力捏緊成一口大小的小球飯糰。", timerSec: null },
        { text: "飯糰外層包覆一圈海苔條固定。", timerSec: null },
        { text: "開啟電風扇吹涼 1 分鐘散熱，蒸發米飯表面水氣再裝盒。", timerSec: 60 },
      ],
    },
  },

  {
    id: "recipe_006",
    title: "消防車蔬菜肉末蛋捲",
    sourceUrl: "",
    coverImage: "",
    servings: "1 兒童份",
    scenarios: ["breakfast", "dinner"],
    tags: ["finger-food", "heat-stable", "freezer-friendly", "quick", "kid-friendly"],
    ingredients: {
      core: ["胡蘿蔔", "豬絞肉", "雞蛋"],
      replaceable: [
        { original: "豬絞肉", substitutes: ["雞肉絲"] },
      ],
      seasonings: [
        { name: "鹽" },
        { name: "醬油", optional: true },
      ],
    },
    quantities: { "胡蘿蔔": "1小匙（胡蘿蔔泥）", "豬絞肉": "1大匙（炒熟）", "雞蛋": "1-2顆" },
    prepGuideRef: ["胡蘿蔔泥", "炒熟豬絞肉"],
    steps: {
      prep: [
        { text: "從冷凍庫取出預製的胡蘿蔔泥與熟豬絞肉，微波解凍備用。", timerSec: null },
        { text: "大碗中打入雞蛋，將解凍的胡蘿蔔泥、熟豬絞肉與少許鹽（或極少許醬油）加入，充份打散攪拌均勻。", timerSec: null },
      ],
      cook: [
        { text: "平底鍋開小火，倒入少許油，將混合好的肉末蔬菜蛋液倒入鍋中，輕輕晃動鍋子讓蛋液均勻鋪平。", timerSec: null },
        { text: "待蛋液底部稍微定型、表面仍呈微熟半凝固狀態時，從邊緣慢慢往前捲起成蛋捲（厚蛋燒狀）。", timerSec: null },
        { text: "雙面稍微輕壓慢煎，確保內部的肉末與蛋液完全熟透後起鍋。", timerSec: null },
        { text: "放至微涼後，切成一口一個的厚蛋捲磚。", timerSec: null },
        { text: "開啟電風扇吹涼 1 分鐘，排出多餘熱氣後裝入外帶盒。", timerSec: 60 },
      ],
    },
  },
];
