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
    servings: "1 人份",
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
    prepGuideRef: ["辛香料備料盒"],
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
    tags: ["one-pot", "電鍋", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "白蘿蔔", "白米"],
      replaceable:  [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
      ],
      seasonings: [
        { name: "昆布柴魚高湯", note: "可用清水代替" },
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
    prepGuideRef: ["切塊雞腿肉", "萬用高湯"],
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
    prepGuideRef: ["辛香料備料盒", "洋蔥（切好備用）"],
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
    prepGuideRef: ["辛香料備料盒"],
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
    prepGuideRef: ["辛香料備料盒", "洋蔥（切好備用）"],
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
    prepGuideRef: ["辛香料備料盒", "洋蔥（切好備用）"],
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
    prepGuideRef: ["辛香料備料盒"],
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
    prepGuideRef: ["辛香料備料盒", "切塊雞腿肉", "洋蔥（切好備用）", "萬用高湯"],
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
    servings: "1 人份",
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

  // ── YouTube 批次匯入 2026-06-05（字幕/描述齊全，可直接上架）──
  {
    id: "recipe_XZy8HR5QlJE",
    title: "台式壽喜燒",
    sourceUrl: "https://www.youtube.com/watch?v=XZy8HR5QlJE",
    coverImage: "",
    servings: "2-3 人份",
    scenarios: ["dinner", "weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["豬五花肉片", "洋蔥", "娃娃菜", "青江菜", "油豆腐", "鴻喜菇", "雪白菇", "金針菇", "鮮香菇", "胡蘿蔔"],
      replaceable: [
        { original: "豬五花肉片", substitutes: ["牛五花肉片", "豬梅花肉片"] },
        { original: "娃娃菜", substitutes: ["高麗菜"] },
        { original: "油豆腐", substitutes: ["嫩豆腐", "不加"] },
        { original: "雪白菇", substitutes: ["鴻喜菇"] },
        { original: "金針菇", substitutes: ["不加"] },
      ],
      seasonings: [
        { name: "蒜頭" },
        { name: "蔥" },
        { name: "醬油膏" },
        { name: "糖" },
        { name: "醬油" },
        { name: "米酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "雞骨高湯" },
        { name: "無鹽奶油" },
        { name: "芝麻油" },
      ],
    },
    quantities: {
      "豬五花肉片": "250g", "洋蔥": "半顆", "娃娃菜": "150g", "青江菜": "100g", "油豆腐": "6小塊",
      "鴻喜菇": "50g", "雪白菇": "50g", "金針菇": "50g", "鮮香菇": "2朵", "胡蘿蔔": "片花6片",
      "蒜頭": "20g", "蔥": "2支", "醬油膏": "3大匙", "糖": "1大匙", "醬油": "1大匙",
      "米酒": "1大匙", "雞骨高湯": "100cc", "無鹽奶油": "20g", "芝麻油": "1大匙",
    },
    prepGuideRef: ["辛香料備料盒", "洋蔥（切好備用）", "萬用高湯"],
    steps: {
      prep: [
        { text: "洋蔥切寬片狀；青蔥切小段並將蔥白、蔥綠分開；蒜頭備好。", timerSec: null },
        { text: "豬五花肉片若過長，對切一刀成適口大小。", timerSec: null },
        { text: "娃娃菜、青江菜洗淨切段；各式菇類去蒂剝開；油豆腐、胡蘿蔔片花備好。", timerSec: null },
      ],
      cook: [
        { text: "湯鍋開中火，下芝麻油1大匙，放入蒜頭、洋蔥、蔥白，耐心煸出焦香。", timerSec: null },
        { text: "下豬五花肉片煸炒，利用油脂煸出豬油香氣。", timerSec: null },
        { text: "醬油膏3大匙下鍋炒出醬香，續入米酒1大匙、雞骨高湯100cc、醬油1大匙、糖1大匙。", timerSec: null },
        { text: "依序放入娃娃菜、油豆腐、胡蘿蔔、菇類、蔥綠、金針菇，轉小火蓋上鍋蓋慢煮，逼出蔬菜鮮甜。", timerSec: 180 },
        { text: "掀蓋下無鹽奶油20g，放入青江菜稍微整理，煮至醬汁略呈濃稠。", timerSec: null },
        { text: "邊涮肉片邊享用，肉片不會過熟、軟嫩鮮甜。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_Av76_guazi",
    title: "瓜仔肉丸蒸蛋（電鍋）",
    sourceUrl: "https://www.youtube.com/watch?v=Av76E1bbm5c",
    coverImage: "",
    servings: "2-3 人份",
    scenarios: ["dinner"],
    tags: ["電鍋", "kid-friendly"],
    ingredients: {
      core: ["豬絞肉", "雞蛋"],
      replaceable: [
        { original: "豬絞肉", substitutes: ["雞肉絲"] },
      ],
      seasonings: [
        { name: "醬瓜" },
        { name: "太白粉" },
        { name: "糖" },
        { name: "白胡椒粉" },
        { name: "蔥" },
        { name: "薑" },
      ],
    },
    quantities: {
      "豬絞肉": "500g", "雞蛋": "3顆", "醬瓜": "100g（醬瓜汁3大匙）",
      "太白粉": "1大匙", "糖": "1茶匙", "白胡椒粉": "1/2茶匙", "蔥": "20g（蔥花）", "薑": "10g（薑末）",
    },
    prepGuideRef: ["辛香料備料盒"],
    steps: {
      prep: [
        { text: "雞蛋打成蛋液備用。", timerSec: null },
        { text: "豬絞肉加糖、白胡椒粉、太白粉抓勻，摔打出黏性。", timerSec: null },
        { text: "加入醬瓜、醬瓜汁、薑末、蔥花拌勻，捏成肉丸狀。", timerSec: null },
      ],
      cook: [
        { text: "保鮮盒中放入肉丸，淋上蛋液。", timerSec: null },
        { text: "電鍋外鍋一杯水，放入蒸至開關跳起即可。", timerSec: null },
      ],
    },
  },

  {
    id: "recipe_Av76_xiangchang",
    title: "香腸蒸雞（電鍋）",
    sourceUrl: "https://www.youtube.com/watch?v=Av76E1bbm5c",
    coverImage: "",
    servings: "2-3 人份",
    scenarios: ["dinner", "weekend"],
    tags: ["電鍋", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "香腸"],
      replaceable: [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
      ],
      seasonings: [
        { name: "薑" },
        { name: "蔥" },
        { name: "醬油" },
        { name: "鹽" },
        { name: "糖" },
        { name: "太白粉" },
        { name: "米酒", optional: true, note: "含酒，給孩子可省略" },
        { name: "辣椒", optional: true, note: "怕辣可省略" },
      ],
    },
    quantities: {
      "雞腿肉": "2片（500g）", "香腸": "4根", "薑": "15g（薑末）", "蔥": "20g（蔥段）",
      "辣椒": "20g（辣椒末）", "醬油": "1大匙", "鹽": "1/4茶匙", "糖": "1茶匙", "太白粉": "1大匙", "米酒": "1大匙",
    },
    prepGuideRef: ["辛香料備料盒", "切塊雞腿肉"],
    steps: {
      prep: [
        { text: "雞腿排切塊放入保鮮盒，撒上薑末、辣椒末。", timerSec: null },
        { text: "淋入醬油、鹽、糖、米酒、太白粉抓勻。", timerSec: null },
        { text: "加入香腸片與蔥段拌勻。", timerSec: null },
      ],
      cook: [
        { text: "電鍋外鍋一杯水，放入蒸至開關跳起即可。", timerSec: null },
      ],
    },
  },

  // ── YouTube 批次匯入 2026-06-05（步驟人工補齊後上架）──
  {
    id: "recipe_QD8Hcjt1Yu8",
    title: "雞肉蔬菜風味飯（電鍋一鍋到底）",
    sourceUrl: "https://www.youtube.com/watch?v=QD8Hcjt1Yu8",
    coverImage: "",
    servings: "2 人份",
    scenarios: ["dinner"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["白米", "雞胸肉", "鴻喜菇", "高麗菜", "胡蘿蔔"],
      replaceable: [
        { original: "雞胸肉", substitutes: ["雞腿肉"] },
        { original: "鴻喜菇", substitutes: ["香菇", "金針菇"] },
      ],
      seasonings: [
        { name: "鹽" },
        { name: "醬油", optional: true, note: "可省略" },
        { name: "香油" },
        { name: "白胡椒粉", optional: true, note: "可省略" },
      ],
    },
    quantities: {
      "白米": "1.5杯", "雞胸肉": "1副（切一口大小）", "鴻喜菇": "50g", "高麗菜": "100g", "胡蘿蔔": "30g",
      "鹽": "適量", "醬油": "1.5大匙",
    },
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "白米洗淨，放入電鍋內鍋，加入平常煮飯的水量", timerSec: null },
        { text: "將鹽、醬油、香油與少許白胡椒粉加入米水中，稍微攪拌均勻。", timerSec: null },
      ],
      cook: [
        { text: "將切好的雞肉塊、胡蘿蔔丁、菇類鋪在米飯上（建議最後鋪上高麗菜絲增加水分與甜味）。", timerSec: null },
        { text: "在電鍋外鍋加入 1杯水，按下開關。", timerSec: null },
        { text: "開關跳起後，先不要打開，續悶 10 分鐘讓風味融合。接著開蓋淋上香油（或放入奶油），用飯匙輕輕由下而上拌勻即可享用。", timerSec: 600 },
      ],
    },
  },

  {
    id: "recipe_I7R8V8xfeFU",
    title: "南瓜豬肉杯餐",
    sourceUrl: "https://www.youtube.com/watch?v=I7R8V8xfeFU",
    coverImage: "",
    servings: "2 杯",
    scenarios: ["breakfast", "dinner"],
    tags: ["heat-stable", "kid-friendly"],
    ingredients: {
      core: ["白米", "南瓜", "豬梅花肉片", "鴻喜菇", "洋蔥"],
      replaceable: [],
      seasonings: [
        { name: "鹽" },
        { name: "醬油" },
        { name: "奶油", optional: true, note: "可省略" },
        { name: "白胡椒粉", optional: true, note: "可省略" },
      ],
    },
    quantities: { "白米": "1.5杯", "南瓜": "半顆或切丁", "豬梅花肉片": "200g", "鴻喜菇": "半包" },
    prepGuideRef: ["洋蔥（切好備用）"],
    steps: {
      prep: [
        { text: "食材鋪底：內鍋洗淨放入白米與對應水量，接著鋪上豬肉片、洋蔥丁與鴻禧菇", timerSec: null },
        { text: "將切塊或切丁的南瓜均勻鋪在最上層。", timerSec: null },
      ],
      cook: [
        { text: "外鍋加入 1 杯水，按下開關蒸煮，跳起後先不開蓋，繼續燜 10-15 分鐘讓米心熟透。", timerSec: 900 },
        { text: "開蓋後加入醬油、奶油、鹽巴與胡椒粉，將所有食材輕輕翻攪均勻，即可享用。", timerSec: 900 },
      ],
    },
  },

  {
    id: "recipe_b7w1yqR2HPU",
    title: "蛤蠣雞肉燉飯",
    sourceUrl: "https://www.youtube.com/watch?v=b7w1yqR2HPU",
    coverImage: "",
    servings: "2-3 人份",
    scenarios: ["dinner"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["蛤蠣", "雞腿肉", "白米", "洋蔥"],
      replaceable: [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
      ],
      seasonings: [
        { name: "蒜頭" },
        { name: "鹽" },
        { name: "黑胡椒" },
        { name: "奶油" },
        { name: "義式香草", optional: true, note: "可省略" },
        { name: "白酒", optional: true, note: "可省略" },
      ],
    },
    quantities: { "白米": "1.5杯", "雞腿肉": "一副", "蛤蠣": "1斤", "蒜頭": "3-5瓣（切末）", "洋蔥": "半顆（切丁）" },
    prepGuideRef: ["辛香料備料盒", "切塊雞腿肉", "洋蔥（切好備用）", "萬用高湯"],
    steps: {
      prep: [
        { text: "蛤蠣事先泡鹽水吐沙。", timerSec: null },
        { text: "雞腿肉切一口大小。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋倒入適量橄欖油，將雞腿肉塊下鍋煎至金黃上色（約8分熟），先起鍋備用。", timerSec: null },
        { text: "用原鍋殘留的雞油爆香蒜末與洋蔥丁，炒至洋蔥呈現透明軟化。", timerSec: null },
        { text: "倒入生米翻炒，讓每粒米都裹上油脂。接著倒入白酒嗆鍋，讓酒精揮發。", timerSec: null },
        { text: "分次加入高湯，邊煮邊攪拌。當湯汁被吸收得差不多時，再補高湯，持續約 15-20 分鐘至米心熟透。", timerSec: 1200 },
        { text: "將步驟1煎好的雞肉塊與蛤蠣一起放入鍋中，蓋上鍋蓋燜煮至蛤蠣全開。", timerSec: 1200 },
        { text: "加入少許奶油與黑胡椒提味，快速翻拌均勻即可起鍋享用。", timerSec: 1200 },
      ],
    },
  },

  {
    id: "recipe_xJkUhM-paik",
    title: "香菇麻油雞飯",
    sourceUrl: "https://www.youtube.com/watch?v=xJkUhM-paik",
    coverImage: "",
    servings: "3-4 人份",
    scenarios: ["dinner", "weekend"],
    tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "鮮香菇", "白米"],
      replaceable: [
        { original: "雞腿肉", substitutes: ["雞胸肉"] },
      ],
      seasonings: [
        { name: "芝麻油" },
        { name: "薑" },
        { name: "鹽" },
        { name: "醬油" },
        { name: "米酒", optional: true, note: "原片用全酒香氣濃，給孩子請減量或用半酒" },
        { name: "蔥花", optional: true, note: "可省略" },
      ],
    },
    quantities: { "鮮香菇": "70-100g" },
    prepGuideRef: ["辛香料備料盒", "切塊雞腿肉"],
    steps: {
      prep: [
        { text: "乾香菇泡開。", timerSec: 1800 },
        { text: "雞腿肉切丁，香菇切絲。", timerSec: null },
      ],
      cook: [
        { text: "冷鍋倒入黑麻油，放入老薑片，用小火慢慢煸至薑片邊緣捲曲、飄出香味（避免大火將麻油燒苦）。", timerSec: null },
        { text: "放入切好的香菇絲炒香，接著加入雞腿肉，將雞肉煎至表面微微變白上色", timerSec: null },
        { text: "加入醬油、米酒嗆出香氣，接著倒入洗淨的白米一起翻炒，讓每粒米都沾附到油脂", timerSec: null },
        { text: "將所有炒好的食材倒入電鍋內鍋中，加入「香菇水」與適量清水（總水量約 1.5～2 杯，喜愛較軟口感可放 2 杯）", timerSec: null },
        { text: "外鍋倒入 1 杯水，按下炊飯鍵。跳起後不要馬上打開，繼續悶 15-20 分鐘，開蓋撒點蔥花拌勻即可享用", timerSec: null },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // 可攜帶早餐 — AI 原創簡易食譜（使用者授權從無到有產製，非 YT 來源）
  // 規格：可裝盒攜帶、不灑湯水、小孩友善、避免起司＋蛋同盤
  // 步驟為原創家常做法（食材/步驟/份量同一手，無來源不一致問題）
  // sourceUrl 留空 → 走品牌佔位圖
  // ════════════════════════════════════════════════════════════════
  {
    id: "recipe_b01",
    title: "蔓越莓堅果隔夜燕麥",
    sourceUrl: "",
    coverImage: "",
    servings: "1 人份",
    scenarios: ["breakfast"],
    tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["燕麥", "鮮奶", "蔓越莓乾", "綜合堅果"],
      replaceable: [{ original: "鮮奶", substitutes: ["無糖豆漿", "優格"] }],
      seasonings: [],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "取一個附蓋容器，倒入燕麥約 4 大匙、鮮奶（或無糖豆漿）約 120ml，攪拌均勻。", timerSec: null },
        { text: "蓋上蓋子冷藏一夜，讓燕麥吸飽水分軟化（前一晚備好）。", timerSec: null },
      ],
      cook: [
        { text: "早晨取出，鋪上蔓越莓乾與綜合堅果。", timerSec: null },
        { text: "喜歡更滑順可加一匙優格拌勻，蓋好即可帶走。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b05",
    title: "紅棗枸杞稠燕麥粥",
    sourceUrl: "",
    coverImage: "",
    servings: "1 人份",
    scenarios: ["breakfast"],
    tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["燕麥", "紅棗", "枸杞"],
      replaceable: [],
      seasonings: [{ name: "黑糖", optional: true, note: "可省略或減量" }],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "紅棗去核切小塊，枸杞稍微沖洗瀝乾。", timerSec: null },
      ],
      cook: [
        { text: "小鍋加入燕麥約 4 大匙、水或鮮奶 200ml、紅棗，中小火煮滾。", timerSec: 180 },
        { text: "轉小火邊煮邊攪至濃稠，關火前加入枸杞略煮，可依喜好加少許黑糖。", timerSec: 60 },
        { text: "裝入保溫盒帶走。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b06",
    title: "鮪魚玉米鹹燕麥",
    sourceUrl: "",
    coverImage: "",
    servings: "1 人份",
    scenarios: ["breakfast"],
    tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["燕麥", "鮪魚罐頭", "玉米"],
      replaceable: [{ original: "鮪魚罐頭", substitutes: ["雞蛋"] }],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "鮪魚罐頭瀝掉湯汁，玉米粒備好。", timerSec: null },
      ],
      cook: [
        { text: "小鍋加燕麥約 4 大匙與水 200ml，中小火煮成稠粥。", timerSec: 180 },
        { text: "加入鮪魚、玉米拌勻，以少許鹽調味，再煮約 1 分鐘。", timerSec: 60 },
        { text: "裝入保溫盒帶走。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b10",
    title: "鮭魚海苔飯糰",
    sourceUrl: "",
    coverImage: "",
    servings: "1 人份",
    scenarios: ["breakfast"],
    tags: ["finger-food", "heat-stable", "no-fresh", "freezer-friendly", "kid-friendly"],
    ingredients: {
      core: ["鮭魚", "海苔", "白飯"],
      replaceable: [{ original: "鮭魚", substitutes: ["鮪魚罐頭"] }],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "鮭魚抹上少許鹽，海苔裁成適當大小。", timerSec: null },
      ],
      cook: [
        { text: "平底鍋小火將鮭魚煎熟，去皮去骨後撥成魚鬆。", timerSec: 360 },
        { text: "溫熱白飯與鮭魚鬆拌勻，捏成方便手拿的小飯糰。", timerSec: null },
        { text: "包上海苔，用電風扇吹涼後再蓋盒蓋（避免海苔濕軟）。", timerSec: 60 },
      ],
    },
  },
  {
    id: "recipe_b14",
    title: "鮭魚海苔炒飯",
    sourceUrl: "",
    coverImage: "",
    servings: "1-2 人份",
    scenarios: ["breakfast"],
    tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["鮭魚", "海苔", "白飯", "雞蛋"],
      replaceable: [{ original: "鮭魚", substitutes: ["鮪魚罐頭"] }],
      seasonings: [{ name: "鹽" }, { name: "醬油" }],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "鮭魚煎熟撥碎（或用前晚備好的鮭魚鬆），雞蛋打散。", timerSec: null },
      ],
      cook: [
        { text: "熱鍋下少許油，倒入蛋液炒成蛋碎後盛起。", timerSec: 60 },
        { text: "同鍋下白飯炒鬆，加入鮭魚與蛋碎，沿鍋邊嗆少許醬油、加鹽調味。", timerSec: 180 },
        { text: "起鍋前撒上剪碎的海苔拌勻，裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b20",
    title: "玉米玉子燒",
    sourceUrl: "",
    coverImage: "",
    servings: "1-2 人份",
    scenarios: ["breakfast"],
    tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["雞蛋", "玉米"],
      replaceable: [{ original: "玉米", substitutes: ["海苔", "不加"] }],
      seasonings: [{ name: "鹽" }, { name: "糖", optional: true } ],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "雞蛋約 3 顆打散，加少許鹽（可加少許糖）與瀝乾的玉米粒拌勻。", timerSec: null },
      ],
      cook: [
        { text: "玉子燒鍋抹薄油小火熱鍋，分 2-3 次倒入蛋液，每次半凝固時由一端捲起。", timerSec: 240 },
        { text: "全部捲好後放涼定型，切成厚片裝盒。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_b25",
    title: "鮪魚玉米熱壓吐司",
    sourceUrl: "",
    coverImage: "",
    servings: "1 人份",
    scenarios: ["breakfast"],
    tags: ["finger-food", "heat-stable", "no-fresh", "quick", "kid-friendly"],
    ingredients: {
      core: ["吐司", "鮪魚罐頭", "玉米"],
      replaceable: [{ original: "玉米", substitutes: ["起司片", "不加"] }],
      seasonings: [{ name: "美乃滋", optional: true }],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "鮪魚瀝油，與玉米、少許美乃滋拌成內餡；熱壓機預熱。", timerSec: 180 },
      ],
      cook: [
        { text: "兩片吐司夾入鮪魚玉米餡。", timerSec: null },
        { text: "放入熱壓機壓 3-4 分鐘至金黃，對切後用紙包好帶走。", timerSec: 240 },
      ],
    },
  },
  {
    id: "recipe_b29",
    title: "氣炸地瓜塊＋水煮蛋",
    sourceUrl: "",
    coverImage: "",
    servings: "1 人份",
    scenarios: ["breakfast"],
    tags: ["finger-food", "heat-stable", "no-fresh", "freezer-friendly", "kid-friendly"],
    ingredients: {
      core: ["地瓜", "雞蛋"],
      replaceable: [{ original: "地瓜", substitutes: ["南瓜"] }],
      seasonings: [],
    },
    quantities: {},
    prepGuideRef: [],
    steps: {
      prep: [
        { text: "地瓜洗淨切塊，雞蛋備好。", timerSec: null },
      ],
      cook: [
        { text: "雞蛋冷水入鍋煮約 10 分鐘成全熟，撈起泡冷水後剝殼。", timerSec: 600 },
        { text: "地瓜塊以氣炸鍋 180°C 約 15 分鐘至外酥內軟。", timerSec: 900 },
        { text: "地瓜與水煮蛋一起裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b02",
    title: "葡萄乾燕麥布丁",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["燕麥", "鮮奶", "葡萄乾"],
      replaceable: [{ original: "鮮奶", substitutes: ["無糖豆漿", "優格"] }],
      seasonings: [],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "容器倒入燕麥約 4 大匙、鮮奶 120ml 拌勻，蓋上冷藏一夜。", timerSec: null }],
      cook: [{ text: "早晨取出，拌入葡萄乾即可帶走，喜歡更濃可加一匙優格。", timerSec: null }],
    },
  },
  {
    id: "recipe_b03",
    title: "南瓜泥燕麥杯",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["南瓜", "燕麥", "鮮奶"],
      replaceable: [{ original: "鮮奶", substitutes: ["無糖豆漿"] }],
      seasonings: [],
    },
    quantities: {}, prepGuideRef: ["南瓜泥"],
    steps: {
      prep: [
        { text: "南瓜切塊蒸熟壓成泥（或用前晚備好的南瓜泥）。", timerSec: 600 },
        { text: "容器放入燕麥約 4 大匙、鮮奶 120ml、南瓜泥拌勻，蓋上冷藏一夜。", timerSec: null },
      ],
      cook: [{ text: "早晨取出，可撒少許綜合堅果即可帶走。", timerSec: null }],
    },
  },
  {
    id: "recipe_b04",
    title: "地瓜泥燕麥杯",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["地瓜", "燕麥", "無糖豆漿"],
      replaceable: [{ original: "無糖豆漿", substitutes: ["鮮奶"] }],
      seasonings: [],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [
        { text: "地瓜蒸熟壓成泥。", timerSec: 600 },
        { text: "容器放入燕麥約 4 大匙、無糖豆漿 120ml、地瓜泥拌勻，蓋上冷藏一夜。", timerSec: null },
      ],
      cook: [{ text: "早晨取出即可帶走，喜歡可加少許葡萄乾。", timerSec: null }],
    },
  },
  {
    id: "recipe_b07",
    title: "雞蛋蔥花鹹燕麥",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["燕麥", "雞蛋", "蔥"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "蔥切成蔥花，雞蛋打散。", timerSec: null }],
      cook: [
        { text: "小鍋加燕麥約 4 大匙與水 200ml，中小火煮成稠粥。", timerSec: 180 },
        { text: "淋入蛋液拌成蛋花，加少許鹽調味，撒蔥花。", timerSec: 60 },
        { text: "裝入保溫盒帶走。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b08",
    title: "香菇雞蛋稠粥",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly", "電鍋"],
    ingredients: {
      core: ["鮮香菇", "雞蛋", "白米"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "白米洗淨，香菇切片；前晚設定電子鍋預約煮粥（米水比約 1:6）。", timerSec: null }],
      cook: [
        { text: "粥煮好後趁熱打入蛋液拌成蛋花，加少許鹽調味。", timerSec: 60 },
        { text: "稍涼後裝入保溫盒帶走。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b09",
    title: "虱目魚稠粥",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly", "one-pot"],
    ingredients: {
      core: ["虱目魚", "白米"],
      replaceable: [],
      seasonings: [{ name: "薑" }, { name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "白米洗淨，虱目魚確認去刺、切小塊，薑切絲。", timerSec: null }],
      cook: [
        { text: "白米加水煮成稠粥。", timerSec: 1200 },
        { text: "放入虱目魚與薑絲煮熟，加鹽調味。", timerSec: 300 },
        { text: "稍涼後裝入保溫盒帶走。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b11",
    title: "鮪魚美乃滋飯糰",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["鮪魚罐頭", "白飯", "海苔"],
      replaceable: [],
      seasonings: [{ name: "美乃滋" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "鮪魚瀝油，拌入少許美乃滋成餡；海苔裁好。", timerSec: null }],
      cook: [
        { text: "溫熱白飯包入鮪魚美乃滋餡，捏成小飯糰。", timerSec: null },
        { text: "包上海苔，吹涼後再蓋盒蓋。", timerSec: 60 },
      ],
    },
  },
  {
    id: "recipe_b12",
    title: "玉米雞蛋飯糰",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["玉米", "雞蛋", "白飯"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞蛋打散，玉米粒瀝乾。", timerSec: null }],
      cook: [
        { text: "熱鍋下少許油，蛋液與玉米炒成金黃蛋碎，加少許鹽。", timerSec: 120 },
        { text: "與溫熱白飯拌勻，捏成小飯糰，吹涼裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b13",
    title: "海苔玉子燒飯糰",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["雞蛋", "海苔", "白飯"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞蛋打散加少許鹽。", timerSec: null }],
      cook: [
        { text: "玉子燒鍋分次倒蛋液捲成玉子燒，切小塊。", timerSec: 240 },
        { text: "溫熱白飯捏成飯糰，放上玉子燒、包海苔，吹涼裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b15",
    title: "肉片玉米炒飯",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["豬梅花肉片", "玉米", "白飯"],
      replaceable: [{ original: "豬梅花肉片", substitutes: ["雞胸肉"] }],
      seasonings: [{ name: "醬油" }, { name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "豬肉片切小片，玉米瀝乾。", timerSec: null }],
      cook: [
        { text: "熱鍋下油炒香肉片，加入玉米略炒。", timerSec: 120 },
        { text: "下白飯炒鬆，沿鍋邊嗆醬油、加鹽調味，炒勻裝盒。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_b16",
    title: "雞蛋醬油海苔炒飯",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["雞蛋", "白飯", "海苔"],
      replaceable: [],
      seasonings: [{ name: "醬油" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞蛋打散。", timerSec: null }],
      cook: [
        { text: "熱鍋下油，倒蛋液稍凝固後下白飯炒鬆。", timerSec: 120 },
        { text: "沿鍋邊嗆少許醬油炒勻，起鍋前撒剪碎海苔，裝盒。", timerSec: 60 },
      ],
    },
  },
  {
    id: "recipe_b17",
    title: "高麗菜豬肉炒飯",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["高麗菜", "豬梅花肉片", "白飯"],
      replaceable: [{ original: "豬梅花肉片", substitutes: ["豬五花肉片"] }],
      seasonings: [{ name: "醬油" }, { name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "高麗菜切細絲，豬肉片切小片。", timerSec: null }],
      cook: [
        { text: "熱鍋炒香豬肉片，加高麗菜炒軟。", timerSec: 180 },
        { text: "下白飯炒鬆，以醬油、鹽調味炒勻裝盒。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_b18",
    title: "番茄雞蛋炒飯",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["番茄", "雞蛋", "白飯"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "番茄切小丁，雞蛋打散。", timerSec: null }],
      cook: [
        { text: "熱鍋炒蛋盛起；同鍋炒番茄丁至軟出汁。", timerSec: 120 },
        { text: "下白飯與蛋炒勻，加鹽調味，裝盒。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_b19",
    title: "玉子燒（海苔捲）",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["雞蛋", "海苔"],
      replaceable: [{ original: "海苔", substitutes: ["不加"] }],
      seasonings: [{ name: "鹽" }, { name: "糖", optional: true }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞蛋約 3 顆打散，加少許鹽（可加少許糖）。", timerSec: null }],
      cook: [
        { text: "玉子燒鍋抹薄油，倒第一層蛋液鋪上海苔，半凝固時捲起。", timerSec: 120 },
        { text: "分次補蛋液續捲，全部捲好放涼切厚片裝盒。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_b21",
    title: "馬鈴薯絲煎餅",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["馬鈴薯", "雞蛋"],
      replaceable: [],
      seasonings: [{ name: "鹽" }, { name: "麵粉", optional: true, note: "幫助定型，可省略" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "馬鈴薯刨成細絲沖去澱粉、瀝乾，加雞蛋、少許鹽（可加一匙麵粉）拌勻。", timerSec: null }],
      cook: [
        { text: "平底鍋下油，鋪平馬鈴薯絲，中小火煎至兩面金黃定型。", timerSec: 480 },
        { text: "放涼切塊裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b22",
    title: "高麗菜蛋煎（大阪燒風）",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["高麗菜", "雞蛋"],
      replaceable: [],
      seasonings: [{ name: "鹽" }, { name: "麵粉" }, { name: "美乃滋", optional: true }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "高麗菜切細絲，與雞蛋、少許麵粉、鹽拌成麵糊。", timerSec: null }],
      cook: [
        { text: "平底鍋下油，倒入麵糊鋪平，中小火煎至兩面金黃。", timerSec: 480 },
        { text: "放涼切塊，可擠少許美乃滋，裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b23",
    title: "玉米筍炒蛋",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["玉米筍", "雞蛋"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "玉米筍切小段，雞蛋打散。", timerSec: null }],
      cook: [
        { text: "熱鍋炒玉米筍略熟，倒入蛋液炒成滑蛋，加鹽調味。", timerSec: 180 },
        { text: "放涼裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b24",
    title: "板豆腐煎切塊",
    sourceUrl: "", coverImage: "", servings: "1-2 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["板豆腐"],
      replaceable: [],
      seasonings: [{ name: "醬油" }, { name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "板豆腐切厚片，用廚房紙巾吸乾表面水分。", timerSec: null }],
      cook: [
        { text: "平底鍋下油，中火將豆腐兩面煎至金黃，淋少許醬油。", timerSec: 360 },
        { text: "放涼切成方便手拿的小塊，裝盒。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_b26",
    title: "味噌豬肉片熱壓吐司",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "quick", "kid-friendly"],
    ingredients: {
      core: ["吐司", "豬梅花肉片"],
      replaceable: [],
      seasonings: [{ name: "白味噌" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "豬肉片煎熟，抹上薄薄一層味噌；熱壓機預熱。", timerSec: 180 },],
      cook: [
        { text: "兩片吐司夾入味噌豬肉片。", timerSec: null },
        { text: "放入熱壓機壓 3-4 分鐘至金黃，對切紙包帶走。", timerSec: 240 },
      ],
    },
  },
  {
    id: "recipe_b27",
    title: "地瓜泥堅果熱壓吐司",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["吐司", "地瓜", "綜合堅果"],
      replaceable: [{ original: "綜合堅果", substitutes: ["蔓越莓乾", "不加"] }],
      seasonings: [],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "地瓜蒸熟壓泥；熱壓機預熱。", timerSec: 600 }],
      cook: [
        { text: "吐司抹上地瓜泥、撒綜合堅果碎後夾起。", timerSec: null },
        { text: "放入熱壓機壓 3-4 分鐘，對切紙包帶走。", timerSec: 240 },
      ],
    },
  },
  {
    id: "recipe_b28",
    title: "南瓜泥熱壓吐司",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["吐司", "南瓜"],
      replaceable: [{ original: "南瓜", substitutes: ["地瓜"] }],
      seasonings: [],
    },
    quantities: {}, prepGuideRef: ["南瓜泥"],
    steps: {
      prep: [{ text: "南瓜蒸熟壓泥；熱壓機預熱。", timerSec: 600 }],
      cook: [
        { text: "吐司抹上南瓜泥夾起。", timerSec: null },
        { text: "放入熱壓機壓 3-4 分鐘，對切紙包帶走。", timerSec: 240 },
      ],
    },
  },
  {
    id: "recipe_b30",
    title: "蒸南瓜塊＋葡萄乾優格盒",
    sourceUrl: "", coverImage: "", servings: "1 人份",
    scenarios: ["breakfast"], tags: ["finger-food", "heat-stable", "no-fresh", "kid-friendly"],
    ingredients: {
      core: ["南瓜", "葡萄乾", "優格"],
      replaceable: [{ original: "葡萄乾", substitutes: ["蔓越莓乾"] }],
      seasonings: [],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "南瓜切成方便手拿的塊狀。", timerSec: null }],
      cook: [
        { text: "南瓜塊蒸熟放涼。", timerSec: 600 },
        { text: "南瓜裝盒，優格與葡萄乾另用小盒分裝（食用前再淋，避免出水）。", timerSec: null },
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // 午晚餐 — AI 原創簡易食譜（使用者授權從無到有產製，非 YT 來源）
  // 規格：30 分內為主、不辣不香菜、小孩友善、1-2 人份（可放大 4 份備餐）
  // ════════════════════════════════════════════════════════════════
  {
    id: "recipe_d31",
    title: "氣炸鹽味雞腿＋花椰菜",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "綠花椰菜"],
      replaceable: [{ original: "綠花椰菜", substitutes: ["玉米筍", "娃娃菜"] }],
      seasonings: [{ name: "鹽" }, { name: "黑胡椒", optional: true }],
    },
    quantities: {}, prepGuideRef: ["切塊雞腿肉"],
    steps: {
      prep: [{ text: "雞腿肉抹鹽（可加黑胡椒）略醃，花椰菜切小朵。", timerSec: 600 }],
      cook: [
        { text: "雞腿放氣炸鍋 180°C 約 18 分鐘，中途翻面。", timerSec: 1080 },
        { text: "花椰菜水煮或氣炸至熟，與雞腿一起盛盤。", timerSec: 300 },
      ],
    },
  },
  {
    id: "recipe_d32",
    title: "味噌雞腿照燒丼",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "白飯"],
      replaceable: [{ original: "雞腿肉", substitutes: ["雞胸肉"] }],
      seasonings: [{ name: "白味噌" }, { name: "醬油" }, { name: "味醂" }, { name: "糖" }],
    },
    quantities: {}, prepGuideRef: ["切塊雞腿肉"],
    steps: {
      prep: [{ text: "雞腿切塊；味噌、醬油、味醂、糖調成照燒醬。", timerSec: null }],
      cook: [
        { text: "雞腿皮面朝下煎出油、煎至金黃。", timerSec: 360 },
        { text: "倒入照燒醬燒至收汁亮澤，鋪在白飯上。", timerSec: 240 },
      ],
    },
  },
  {
    id: "recipe_d33",
    title: "日式咖哩雞",
    sourceUrl: "", coverImage: "", servings: "3-4 人份",
    scenarios: ["weekend"], tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "馬鈴薯", "胡蘿蔔", "洋蔥"],
      replaceable: [{ original: "雞腿肉", substitutes: ["雞胸肉"] }],
      seasonings: [{ name: "咖哩塊" }],
    },
    quantities: {}, prepGuideRef: ["切塊雞腿肉", "洋蔥（切好備用）"],
    steps: {
      prep: [{ text: "雞腿、馬鈴薯、胡蘿蔔、洋蔥切塊。", timerSec: null }],
      cook: [
        { text: "鍋中炒香洋蔥與雞腿，加入根莖菜略炒。", timerSec: 300 },
        { text: "加水蓋過食材燉煮至軟。", timerSec: 900 },
        { text: "關火放入咖哩塊融化，再小火煮至濃稠。", timerSec: 300 },
      ],
    },
  },
  {
    id: "recipe_d34",
    title: "電鍋蔥油雞胸",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["電鍋", "kid-friendly"],
    ingredients: {
      core: ["雞胸肉", "蔥"],
      replaceable: [{ original: "雞胸肉", substitutes: ["雞腿肉"] }],
      seasonings: [{ name: "鹽" }, { name: "薑" }, { name: "芝麻油" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞胸抹鹽，鋪上薑片、部分蔥段；另把蔥花備好。", timerSec: null }],
      cook: [
        { text: "電鍋外鍋一杯水，蒸熟雞胸。", timerSec: 1200 },
        { text: "雞胸切片，淋上熱芝麻油拌蔥花的蔥油。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_d35",
    title: "雞胸肉炒高麗菜",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["雞胸肉", "高麗菜"],
      replaceable: [],
      seasonings: [{ name: "鹽" }, { name: "醬油" }, { name: "蒜頭" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞胸切片略抓鹽，高麗菜剝小片，蒜頭切末。", timerSec: null }],
      cook: [
        { text: "熱鍋炒香蒜末與雞胸至變白。", timerSec: 180 },
        { text: "下高麗菜炒軟，加醬油、鹽調味炒勻。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_d36",
    title: "香菇雞湯",
    sourceUrl: "", coverImage: "", servings: "3-4 人份",
    scenarios: ["weekend"], tags: ["電鍋", "one-pot"],
    ingredients: {
      core: ["雞腿肉", "鮮香菇"],
      replaceable: [],
      seasonings: [{ name: "鹽" }, { name: "薑" }, { name: "米酒", optional: true, note: "給孩子可省略" }],
    },
    quantities: {}, prepGuideRef: ["切塊雞腿肉"],
    steps: {
      prep: [{ text: "雞腿切塊汆燙，香菇切片，薑切片。", timerSec: null }],
      cook: [
        { text: "雞腿、香菇、薑片放入內鍋加水，電鍋外鍋兩杯水蒸燉。", timerSec: 2400 },
        { text: "起鍋加鹽調味（可加少許米酒）。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_d37",
    title: "氣炸鹽烤鮭魚＋娃娃菜",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["鮭魚", "娃娃菜"],
      replaceable: [{ original: "娃娃菜", substitutes: ["青江菜", "綠花椰菜"] }],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "鮭魚抹鹽，娃娃菜對半切。", timerSec: null }],
      cook: [
        { text: "鮭魚氣炸 180°C 約 12 分鐘。", timerSec: 720 },
        { text: "娃娃菜水煮或清炒至熟，與鮭魚一起盛盤。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_d38",
    title: "味噌鮭魚燒",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["鮭魚"],
      replaceable: [],
      seasonings: [{ name: "白味噌" }, { name: "味醂" }, { name: "醬油" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "味噌、味醂、醬油調勻，抹在鮭魚上醃 15 分鐘。", timerSec: 900 }],
      cook: [{ text: "鮭魚以烤箱或氣炸 180°C 烤至熟、表面微焦香。", timerSec: 720 }],
    },
  },
  {
    id: "recipe_d39",
    title: "電鍋清蒸鱸魚",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["電鍋", "kid-friendly"],
    ingredients: {
      core: ["鱸魚"],
      replaceable: [],
      seasonings: [{ name: "薑" }, { name: "蔥" }, { name: "醬油" }, { name: "米酒", optional: true, note: "給孩子可省略" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "鱸魚洗淨擦乾，表面劃刀，鋪上薑絲、蔥段。", timerSec: null }],
      cook: [
        { text: "電鍋外鍋一杯水蒸熟。", timerSec: 900 },
        { text: "倒掉腥水，換新蔥絲，淋熱油與少許醬油。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_d40",
    title: "香煎虱目魚肚",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["虱目魚"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "虱目魚肚擦乾水分，兩面抹少許鹽。", timerSec: null }],
      cook: [{ text: "平底鍋熱油，魚皮朝下中火煎至金黃酥脆，翻面煎熟。", timerSec: 480 }],
    },
  },
  {
    id: "recipe_d41",
    title: "鱸魚味噌湯",
    sourceUrl: "", coverImage: "", servings: "2-3 人份",
    scenarios: ["weekend"], tags: ["one-pot"],
    ingredients: {
      core: ["鱸魚", "板豆腐"],
      replaceable: [{ original: "板豆腐", substitutes: ["嫩豆腐"] }],
      seasonings: [{ name: "白味噌" }, { name: "薑" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "鱸魚切塊，豆腐切丁，薑切片。", timerSec: null }],
      cook: [
        { text: "水加薑片煮滾，下鱸魚與豆腐煮熟。", timerSec: 420 },
        { text: "關小火，把味噌調散入湯（勿大滾），即可。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_d42",
    title: "虱目魚粥",
    sourceUrl: "", coverImage: "", servings: "2-3 人份",
    scenarios: ["weekend"], tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["虱目魚", "白米"],
      replaceable: [],
      seasonings: [{ name: "薑" }, { name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "白米洗淨，虱目魚去刺切塊，薑切絲。", timerSec: null }],
      cook: [
        { text: "白米加水煮成粥。", timerSec: 1200 },
        { text: "下虱目魚與薑絲煮熟，加鹽調味。", timerSec: 300 },
      ],
    },
  },
  {
    id: "recipe_d43",
    title: "薑燒豬肉片",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["豬梅花肉片", "洋蔥"],
      replaceable: [{ original: "豬梅花肉片", substitutes: ["豬五花肉片"] }],
      seasonings: [{ name: "薑" }, { name: "醬油" }, { name: "味醂" }, { name: "糖" }],
    },
    quantities: {}, prepGuideRef: ["洋蔥（切好備用）"],
    steps: {
      prep: [{ text: "洋蔥切絲，薑磨泥；醬油、味醂、糖、薑泥調成醬。", timerSec: null }],
      cook: [
        { text: "熱鍋炒軟洋蔥，下豬肉片炒至變色。", timerSec: 240 },
        { text: "倒入薑燒醬炒勻收汁。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_d44",
    title: "豬肉味噌炒高麗菜",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["豬梅花肉片", "高麗菜"],
      replaceable: [],
      seasonings: [{ name: "白味噌" }, { name: "醬油" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "高麗菜剝小片，豬肉片切小片；味噌加少許水化開。", timerSec: null }],
      cook: [
        { text: "熱鍋炒香豬肉片，下高麗菜炒軟。", timerSec: 240 },
        { text: "倒入味噌醬炒勻。", timerSec: 60 },
      ],
    },
  },
  {
    id: "recipe_d45",
    title: "馬鈴薯燉肉",
    sourceUrl: "", coverImage: "", servings: "3-4 人份",
    scenarios: ["weekend"], tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["豬梅花肉片", "馬鈴薯", "洋蔥", "胡蘿蔔"],
      replaceable: [],
      seasonings: [{ name: "醬油" }, { name: "味醂" }, { name: "糖" }],
    },
    quantities: {}, prepGuideRef: ["洋蔥（切好備用）"],
    steps: {
      prep: [{ text: "馬鈴薯、胡蘿蔔切塊，洋蔥切絲，豬肉片切段。", timerSec: null }],
      cook: [
        { text: "炒香洋蔥與豬肉片，加入根莖菜略炒。", timerSec: 300 },
        { text: "加水至半淹，下醬油、味醂、糖，中小火燉至馬鈴薯鬆軟。", timerSec: 1200 },
      ],
    },
  },
  {
    id: "recipe_d46",
    title: "豬肉金針菇捲",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["豬五花肉片", "金針菇"],
      replaceable: [{ original: "豬五花肉片", substitutes: ["豬梅花肉片"] }],
      seasonings: [{ name: "醬油" }, { name: "味醂" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "金針菇分成小束，用豬五花肉片捲起。", timerSec: null }],
      cook: [
        { text: "肉捲收口朝下入鍋煎至定型上色。", timerSec: 300 },
        { text: "淋醬油、味醂燒至收汁。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_d47",
    title: "咖哩豬肉烏龍",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["豬梅花肉片", "烏龍麵", "洋蔥"],
      replaceable: [],
      seasonings: [{ name: "咖哩塊" }],
    },
    quantities: {}, prepGuideRef: ["洋蔥（切好備用）"],
    steps: {
      prep: [{ text: "洋蔥切絲，豬肉片切段。", timerSec: null }],
      cook: [
        { text: "炒香洋蔥與豬肉片，加水煮滾。", timerSec: 300 },
        { text: "放入咖哩塊融化煮稠，下烏龍麵煮熟。", timerSec: 300 },
      ],
    },
  },
  {
    id: "recipe_d48",
    title: "蔥爆豬肉",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick"],
    ingredients: {
      core: ["豬梅花肉片", "蔥", "洋蔥"],
      replaceable: [{ original: "洋蔥", substitutes: ["不加"] }],
      seasonings: [{ name: "醬油" }, { name: "蒜頭" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "蔥切段，洋蔥切絲，蒜頭切片，豬肉片切段。", timerSec: null }],
      cook: [
        { text: "大火炒香蒜片與豬肉片至上色。", timerSec: 180 },
        { text: "下洋蔥與蔥段、嗆醬油快炒至蔥香。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_d49",
    title: "不辣麻婆豆腐",
    sourceUrl: "", coverImage: "", servings: "2-3 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["板豆腐", "豬絞肉"],
      replaceable: [{ original: "板豆腐", substitutes: ["嫩豆腐"] }],
      seasonings: [{ name: "白味噌" }, { name: "醬油" }, { name: "蒜頭" }, { name: "太白粉" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "豆腐切丁汆燙瀝乾，蒜頭切末；太白粉加水備芡汁。", timerSec: null }],
      cook: [
        { text: "炒香蒜末與豬絞肉，加味噌、醬油與少許水煮滾。", timerSec: 240 },
        { text: "下豆腐輕推煮入味，最後勾薄芡。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_d50",
    title: "玉米筍毛豆炒蛋",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["玉米筍", "毛豆", "雞蛋"],
      replaceable: [],
      seasonings: [{ name: "鹽" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "玉米筍切小段，毛豆退冰，雞蛋打散。", timerSec: null }],
      cook: [
        { text: "玉米筍與毛豆下鍋炒熟。", timerSec: 180 },
        { text: "倒入蛋液炒成滑蛋，加鹽調味。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_d51",
    title: "日式茶碗蒸",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["電鍋", "kid-friendly"],
    ingredients: {
      core: ["雞蛋", "鮮香菇", "玉米筍"],
      replaceable: [{ original: "玉米筍", substitutes: ["不加"] }],
      seasonings: [{ name: "鹽" }, { name: "昆布柴魚高湯" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "雞蛋打散與放涼的高湯以 1:3 混合過篩，香菇、玉米筍切小片放入碗中。", timerSec: null }],
      cook: [{ text: "電鍋外鍋半杯水、鍋蓋留縫蒸至凝固（避免大火起蜂窩）。", timerSec: 900 }],
    },
  },
  {
    id: "recipe_d52",
    title: "番茄豆腐蛋花煮",
    sourceUrl: "", coverImage: "", servings: "2-3 人份",
    scenarios: ["weekend"], tags: ["one-pot", "kid-friendly"],
    ingredients: {
      core: ["番茄", "板豆腐", "雞蛋"],
      replaceable: [{ original: "板豆腐", substitutes: ["嫩豆腐"] }],
      seasonings: [{ name: "鹽" }, { name: "醬油" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "番茄切塊，豆腐切丁，雞蛋打散。", timerSec: null }],
      cook: [
        { text: "炒番茄出汁，加水與豆腐煮滾，加鹽、醬油調味。", timerSec: 300 },
        { text: "淋入蛋液成蛋花即可。", timerSec: 60 },
      ],
    },
  },
  {
    id: "recipe_d53",
    title: "照燒板豆腐排",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["板豆腐"],
      replaceable: [],
      seasonings: [{ name: "醬油" }, { name: "味醂" }, { name: "糖" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "板豆腐切厚片吸乾水分；醬油、味醂、糖調成照燒醬。", timerSec: null }],
      cook: [
        { text: "平底鍋將豆腐兩面煎至金黃。", timerSec: 360 },
        { text: "倒入照燒醬燒至收汁亮澤。", timerSec: 120 },
      ],
    },
  },
  {
    id: "recipe_d54",
    title: "親子丼",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "雞蛋", "洋蔥", "白飯"],
      replaceable: [{ original: "雞腿肉", substitutes: ["雞胸肉"] }],
      seasonings: [{ name: "醬油" }, { name: "味醂" }, { name: "糖" }],
    },
    quantities: {}, prepGuideRef: ["切塊雞腿肉", "洋蔥（切好備用）"],
    steps: {
      prep: [{ text: "雞腿切小塊，洋蔥切絲，雞蛋打散。", timerSec: null }],
      cook: [
        { text: "醬油、味醂、糖加水煮滾，下洋蔥與雞腿煮熟。", timerSec: 360 },
        { text: "淋入蛋液半熟即關火，蓋飯上。", timerSec: 60 },
      ],
    },
  },
  {
    id: "recipe_d55",
    title: "鮭魚炊飯",
    sourceUrl: "", coverImage: "", servings: "3-4 人份",
    scenarios: ["weekend"], tags: ["電鍋", "one-pot", "kid-friendly"],
    ingredients: {
      core: ["鮭魚", "胡蘿蔔", "白米"],
      replaceable: [],
      seasonings: [{ name: "醬油" }, { name: "味醂" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "白米洗淨，胡蘿蔔切細丁。", timerSec: null }],
      cook: [
        { text: "米加水與醬油、味醂，鋪上鮭魚與胡蘿蔔，按電子鍋炊飯。", timerSec: null },
        { text: "跳起後悶 10 分鐘，取出鮭魚去骨拆碎拌勻。", timerSec: 600 },
      ],
    },
  },
  {
    id: "recipe_d56",
    title: "味噌烏龍湯麵",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["one-pot"],
    ingredients: {
      core: ["烏龍麵", "板豆腐", "金針菇"],
      replaceable: [{ original: "板豆腐", substitutes: ["嫩豆腐"] }],
      seasonings: [{ name: "白味噌" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "豆腐切丁，金針菇剝散。", timerSec: null }],
      cook: [
        { text: "水煮滾下豆腐、金針菇與烏龍麵煮熟。", timerSec: 300 },
        { text: "關小火把味噌調散入湯（勿大滾）。", timerSec: null },
      ],
    },
  },
  {
    id: "recipe_d57",
    title: "高麗菜豬肉炒烏龍",
    sourceUrl: "", coverImage: "", servings: "2 人份",
    scenarios: ["weekend"], tags: ["quick", "one-pot", "kid-friendly"],
    ingredients: {
      core: ["烏龍麵", "豬梅花肉片", "高麗菜"],
      replaceable: [],
      seasonings: [{ name: "醬油" }, { name: "蠔油" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "高麗菜剝小片，豬肉片切段，烏龍麵稍微汆燙散開。", timerSec: null }],
      cook: [
        { text: "炒香豬肉片，下高麗菜炒軟。", timerSec: 240 },
        { text: "下烏龍麵，加醬油、蠔油炒勻。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_d58",
    title: "玉米雞肉炊飯",
    sourceUrl: "", coverImage: "", servings: "3-4 人份",
    scenarios: ["weekend"], tags: ["電鍋", "one-pot", "kid-friendly"],
    ingredients: {
      core: ["雞腿肉", "玉米", "白米"],
      replaceable: [{ original: "雞腿肉", substitutes: ["雞胸肉"] }],
      seasonings: [{ name: "醬油" }, { name: "味醂" }],
    },
    quantities: {}, prepGuideRef: ["切塊雞腿肉"],
    steps: {
      prep: [{ text: "白米洗淨，雞腿切小塊，玉米粒備好。", timerSec: null }],
      cook: [
        { text: "米加水與醬油、味醂，鋪上雞腿與玉米，按電子鍋炊飯。", timerSec: null },
        { text: "跳起後悶 10 分鐘，拌勻即可。", timerSec: 600 },
      ],
    },
  },
  {
    id: "recipe_d59",
    title: "南瓜雞肉鹹燉飯",
    sourceUrl: "", coverImage: "", servings: "2-3 人份",
    scenarios: ["weekend"], tags: ["kid-friendly"],
    ingredients: {
      core: ["南瓜", "雞胸肉", "白飯"],
      replaceable: [{ original: "雞胸肉", substitutes: ["雞腿肉"] }],
      seasonings: [{ name: "鹽" }, { name: "鮮奶", optional: true, note: "增加滑順，可省略" }],
    },
    quantities: {}, prepGuideRef: ["南瓜泥"],
    steps: {
      prep: [{ text: "南瓜蒸熟壓泥，雞胸切丁。", timerSec: 600 }],
      cook: [
        { text: "炒熟雞胸丁，加入南瓜泥與少許水（可加鮮奶）煮成濃稠醬。", timerSec: 300 },
        { text: "拌入白飯煮至收汁，加鹽調味。", timerSec: 180 },
      ],
    },
  },
  {
    id: "recipe_d60",
    title: "蔬菜味噌湯定食",
    sourceUrl: "", coverImage: "", servings: "2-3 人份",
    scenarios: ["weekend"], tags: ["one-pot"],
    ingredients: {
      core: ["高麗菜", "胡蘿蔔", "板豆腐"],
      replaceable: [{ original: "板豆腐", substitutes: ["嫩豆腐"] }],
      seasonings: [{ name: "白味噌" }, { name: "昆布柴魚高湯" }],
    },
    quantities: {}, prepGuideRef: [],
    steps: {
      prep: [{ text: "高麗菜剝小片，胡蘿蔔切薄片，豆腐切丁。", timerSec: null }],
      cook: [
        { text: "高湯煮滾，下胡蘿蔔、高麗菜、豆腐煮軟。", timerSec: 480 },
        { text: "關小火把味噌調散入湯（勿大滾），配白飯成定食。", timerSec: null },
      ],
    },
  },
];
