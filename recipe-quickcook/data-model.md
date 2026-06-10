# Recipe QuickCook — 資料模型規格

> 純前端食譜查看 App 的資料地基。先定 schema 與比對邏輯，再進 vibecoding。
> 技術棧：Vite + React。`data/` 之後會移入 `src/data/`。

---

## 1. 檔案結構

```
recipe-quickcook/
├── data-model.md            ← 本檔（規格）
└── data/
    ├── ingredients.js        ← 食材主檔（標準名 + 別名 + 分類）
    ├── scenarios.js          ← 時段場景 + tag 詞彙表
    ├── media.js              ← YouTube 縮圖 / videoId helper（封面圖 fallback）
    └── recipes.sample.js     ← 食譜資料（AI 批次產出貼這裡）
```

---

## 2. Recipe Schema

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | string | 唯一鍵（recipe_001…） |
| `title` | string | 菜名 |
| `sourceUrl` | string | 原始影片連結（**優先用 YouTube**；IG 嵌入常擋，YT 可外跳回看） |
| `coverImage` | string | 封面圖 URL（自製食譜套真照片就填這裡，**優先序最高**）。留空時 fallback 序：**YT 連結→YT 縮圖；否則→通用分類圖 `public/cover/<imgCat>.jpg`；皆無→FA fire-burner 佔位**（見 `helpers.js` `coverImageUrl`）。替換實拍照流程見 §2.1 |
| `servings` | string | 份量（選填，如「2-3 人份」） |
| `scenarios` | string[] | 適用時段（對應 scenarios.js 的 id） |
| `tags` | string[] | 屬性標籤（只能用 TAG_VOCAB 內的 key） |
| `ingredients.core` | string[] | **核心主食材**（標準名）— 燈號比對對象。**僅蛋白質/蔬菜/主食，禁放調味料** |
| `ingredients.replaceable` | `{original, substitutes[]}[]` | 缺件可替代（標準名）；`substitutes` 含 `"不加"` 表示該主食材**可省略** |
| `ingredients.seasonings` | `{name, optional?, note?}[]` | **調味料區**。預設常備、不參與燈號比對；`optional:true` 表示可省略（如含酒給孩子、不易取得），`note` 寫省略原因 |
| `quantities` | `{[name]: string}` | 食材標準名 → 份量字串（**顯示用，不參與比對**），如 `{"雞胸肉":"350g"}` |
| `prepGuideRef` | string[] | 對應備料指引頁的模組名 |
| `steps.prep` | `{text, timerSec}[]` | **前置準備**：開火前的洗、切、醃、調醬（含醃漬等待計時） |
| `steps.cook` | `{text, timerSec}[]` | **開始料理**：熱鍋開火後的實際烹煮；`timerSec` 為計時秒數，無則 `null` |

> ⚠️ 不要用平行 `timers` 陣列；計時一律內嵌在 step 物件，避免增刪步驟錯位。
>
> ⚠️ **core / seasonings 分界**：判斷食譜燈號的是「主食材」。鹽、糖、油、醬油、清酒、味醂、太白粉、蒜頭等廚房常備調味一律進 `seasonings`；放進 core 會讓使用者永遠勾不齊 → 全紅燈，破壞核心功能。
>
> ⚠️ **數量不入 core 字串**：core 只放純標準名（`"雞胸肉"`），份量另存 `quantities` map，確保正規化與燈號比對乾淨。

---

## 2.1 封面圖：替換實拍照 SOP

> 用途：某道菜實際做過、拍了照，想把通用分類圖換成自己的照片。

**優先序**：`coverImage`（自填）> YouTube 縮圖 > 通用分類圖 > FA 佔位圖。
只要填了 `coverImage` 就會蓋過後面所有 fallback，**不必動 `imgCat`**（留著當備援）。

**步驟**

1. **壓圖**：裁成約 **4:3、寬 ~800px、JPG**（封面卡顯示高 140px、詳情頁 200px，不需高解析；避免 repo 變肥）。
2. **放檔**：丟進 `public/cover/photos/`，**用 recipe id 命名**便於對應：
   ```
   public/cover/photos/recipe_d61.jpg
   ```
3. **填欄位**：在 `data/recipes.sample.js` 對應那筆加一行（路徑開頭用 `/`，對應 public 根）：
   ```js
   coverImage: "/cover/photos/recipe_d61.jpg",
   ```
4. 存檔即生效。**退回通用圖**：刪掉該行或設 `coverImage: ""`。

**批次**：多張就重複「丟檔 → 加一行」即可；命名統一用 id，日後一眼對得上。

---

## 3. 燈號比對演算法（核心邏輯）

輸入：使用者勾選的食材集合 `selected`（已正規化為標準名）。
只比對 `core`；`seasonings` 視為恆有；`replaceable` 提供補救。

```
對每個 core 食材，判定狀態：
  HAVE    → core 在 selected 中
  SUBBED  → core 不在 selected，但它的某個 substitute 在 selected 中
  MISSING → 以上皆否

依結果上燈號：
  🟢 綠燈  = 全部 HAVE（無 SUBBED、無 MISSING）
  🟡 黃燈  = 0 個 MISSING 且 ≥1 SUBBED（全靠替代補齊）
            或 剛好 1 個 MISSING（差一樣 → 提示「再買 X 就能做」）
  ⚪ 灰階  = ≥2 個 MISSING（不顯示或淡化）
```

UI 呈現：
- 黃燈—SUBBED：標示「用 ✅雞肉絲 代替 豬絞肉」
- 黃燈—缺 1：標示「差 1 樣：胡蘿蔔」
- 空狀態：若無任何綠/黃 → 引導「冰箱再加一樣，就能解鎖這些 🟡」

---

## 4. 採買清單邏輯（頁二）

1. 勾選想做的食譜 → 蒐集其 `core`（可選含已選替代品的實際品項）。
2. **正規化 + 去重**（`normalize()`）。
3. 依 `categoryOf()` 分組（蔬菜/蛋白質/…）方便逛超市。
4. 一鍵複製：`navigator.clipboard.writeText()` 輸出乾淨 Memo 文字。
5. （建議）採買勾選狀態存 `localStorage`，關掉重開不流失。

---

## 5. AI 轉化 Prompt 範本（休假批次用）

> 產出前先把 `ingredients.js` 的標準名清單貼給 AI。

```
你是料理資料結構化助手。請分析我提供的 IG 料理影片/文字，
嚴格依下方 JSON 物件格式輸出「單一食譜」，不要任何前言、說明或 markdown 區塊。

規則：
- 食材一律使用我提供的「標準名清單」內名稱；若影片出現清單外食材，回報給我，先不要自創。
- core = **不可或缺的主食材（僅蛋白質/蔬菜/主食）**，純標準名、不含份量數字。
  **嚴禁把調味料放 core**：鹽糖油醬油清酒味醂太白粉蒜頭等一律放 seasonings。
- replaceable = 缺件可替代 {original, substitutes:[...]}，original 須為 core 內食材；
  若該主食材可省略，substitutes 加入字串 "不加"。
- seasonings = 所有調味料，物件 {name, optional?, note?}。預設常備不參與比對；
  含酒（給孩子）或不易取得的標 optional:true 並於 note 說明。
- quantities = 食材標準名 → 份量字串的物件，如 {"雞胸肉":"350g","番茄":"3顆"}；core 與 seasonings 都可列。
- sourceUrl 用 YouTube 連結（watch?v=...）；coverImage 一律留空字串（程式自動取 YT 縮圖）。
- steps 分 prep / cook 兩段陣列，每步 {text, timerSec}；需等待/計時的步驟填秒數，否則 timerSec: null。
  prep = 開火前所有洗切醃調醬（避免邊煮邊備料手忙腳亂）；cook = 熱鍋開火後的烹煮。
- tags 只能用：finger-food, heat-stable, no-fresh, freezer-friendly, quick, one-pot, kid-friendly。

標準名清單：<貼上 ingredients.js 的 name 清單>

輸出格式：
{
  "id": "recipe_XXX",
  "title": "",
  "sourceUrl": "https://www.youtube.com/watch?v=XXXX",
  "coverImage": "",
  "servings": "",
  "scenarios": ["breakfast"|"dinner"|"weekend"],
  "tags": [],
  "ingredients": {
    "core": [],
    "replaceable": [{"original":"","substitutes":[""]}],
    "seasonings": [{"name":"","optional":false}]
  },
  "quantities": {},
  "prepGuideRef": [],
  "steps": {
    "prep": [{ "text": "", "timerSec": null }],
    "cook": [{ "text": "", "timerSec": null }]
  }
}
```

---

## 6. 下一步（待 token 就緒後）

- Phase 1–3（使用者）：定 token 調性 → design principles → design-system Section 0
- Phase 4（一起）：Vite 專案初始化 → MVP 頁一（食材勾選 + 燈號 + 食譜詳情 + 計時器）
- 之後：頁二採買、頁三備料指引
