# CLAUDE.md（全域）

> 本 repo 為 UI/UX 設計師的 **code ↔ Figma ↔ code** 測試沙盒。各子資料夾為**獨立實驗**，彼此不互通；僅本檔為跨專案通用規則。

## 此資料夾是什麼

- **角色**：設計師主導原型，AI 協助產碼；不追求 production 品質
- **內容**：提案稿、單案原型、作品集、設計系統模板等並存
- **工作方式**：開啟對話時**只處理使用者指定的子資料夾**；勿假設要讀其他專案
- **專案專屬規則**：若該資料夾有 `CLAUDE.md`、`design-system.md`、`PROJECT.md`，以**該資料夾**為準（優先於本檔的通用描述）

## 按需閱讀（勿一次載入全 repo）

| 情境 | 先讀 |
|------|------|
| 新案 HTML/Vue 原型 | 該案 `design-system.md` + `tokens/` |
| 開新案 / 複製模板 | `ds-template/README.md` → `ds-template/execution/` |
| 提案三主題 | `ds-template/proposal/proposal-guide.md` |
| capricious-picker | `capricious-picker/CLAUDE.md` |
| portfolio | `portfolio/PROJECT.md` |

## 語言

一律用**繁體中文**回覆。程式碼、變數名、註解維持英文。

## 溝通風格

- 回覆保持結構清楚、條列化，優先提供可實現的建議
- UI/UX、SA 相關問題提供深度解析；雜項保持精簡

## 工作風格

- 大幅修改（架構、邏輯、多檔案）前先列出計畫，等確認再動手
- 小範圍修改（typo、樣式微調、單一 function）直接做
- 複雜互動實作前，先以條列式 pseudo-code 確認流程
- 連續除錯失敗 2 次，自動啟動 WebSearch 尋找最新解法
- 卡住無法解決時，立即中斷並說明問題，不要硬撐

## 套件管理

- 統一使用 `npm`，不用 pnpm / yarn / bun

## 命名慣例

- 語義化命名，嚴禁隨意命名
- Vue 元件：PascalCase（`UserCard.vue`）
- CSS 自訂 class：kebab-case
- 變數 / 函式：camelCase

## UI/UX 設計思維

- 開發前優先考慮元件的各種狀態（Hover、Active、Disabled、Empty、Error）
- 程式碼結構高度模組化，命名須反映語義與層級

## UI 實作（單一來源）

- 開發 HTML/CSS/Vue 原型時，優先查**該案目錄**下的 `design-system.md` 與 `tokens/`
- **與本檔衝突時，以該案的 `design-system.md`（含 Section 0 token、Section 4 狀態表）為準**
- 新案可從 `ds-template/execution/` 複製模板；開案後將 `design-system.md` Section 5 貼給 AI（僅含該案 token，不含重複 Coding Rules）

## Coding Rules（AI 必須遵守 — 全 repo 唯一完整版）

> 以下為跨專案底線；`ds-template/execution/design-system.md` Section 3 僅指向本節。響應式補充：`flex-wrap`、`min-width: 0` 搭配 flex 使用。

1. **CSS 變數**：所有 token 值一律用 CSS 變數，**禁止寫死任何數字**
   - ❌ `background: #FF4D1C` / `padding: 16px` / `border: 1px solid #D8D6D3`
   - ❌ `rgba(255,77,28,.1)` — 禁止對 token 色自行換算透明度；改用預定義淺色 token（如 `var(--primary-lt)`）
   - ✅ `background: var(--primary)` / `padding: var(--spacing-md)` / `border: 1px solid var(--neutral-200)`

2. **Flex-first**：所有容器預設 `display: flex`，**`gap` 取代 `margin`**
   - ❌ 子元素加 `margin-bottom: 16px` 或 `margin-right: 8px`
   - ✅ 父容器加 `gap: var(--spacing-md)`；子元素不寫 margin

3. **單向容器**：每個 flex 容器只有一個方向（row 或 column），不混用

4. **禁 inline style**：靜態樣式一律用 CSS class；僅動態帶入 token 值時允許 inline
   - ❌ `<div style="color: #FF4D1C; font-weight: 700">`
   - ✅ `<div class="card-title">`

5. **禁 absolute（在 flex 父層內）**：確保結構能倒回 Figma Auto Layout
   - ❌ card 內用 `position: absolute; right: 8px` 放關閉按鈕或 badge
   - ✅ 將其作為 flex 子元素排版，或移到正確的 HTML 層級

6. **狀態完整**：**不得只生成 Default 狀態**
   - 有 `design-system.md` 時：對照該檔 **Section 4** Checklist 輸出所需狀態
   - 無該檔時：互動元件至少含 `:hover` / `:focus` / `:active` / `:disabled`；按鈕另含 loading（若適用）
   - ❌ 只寫 `.btn { background: var(--primary); }` 就交差

7. **無障礙基本**：`<label>` 綁 `for`、錯誤用 `role="alert"`
   - ❌ `outline: none` 或 `outline: 0` — **絕對禁止，無論任何理由**
   - ✅ focus ring 可自訂樣式（color、offset），但不可消除

8. **禁自行發明 token**：以專案 `tokens/` 或 `design-system.md` Section 0 為準；未定義值**先發問**，不自行補值
   - ❌ 自行新增 `--gray-light: #f5f5f5`、寫死 `color: rgba(0,0,0,.5)`
   - ✅ 發問：「次要背景色需要 neutral.100，目前專案 token 未定義，請確認值」

9. **逐段輸出**（僅限新元件、新頁面區塊、從 Figma 整段還原）：每次只輸出一個完整單元，完成後等確認再繼續；修 bug、改 class、單檔小改不受限

10. **圖示用 Font Awesome v6**：HTML 產出的圖示一律用 FA v6（`<i class="fa-solid fa-xxx"></i>`），**禁止 emoji**
    - ❌ `<span>🛒</span>` 直接放 emoji
    - ✅ `<i class="fa-solid fa-cart-shopping"></i>`，並在 `<head>` 載入 CDN：`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">`
    - 圖示大小/顏色由父層 `font-size`／`color`（或 CSS 變數）控制，不寫死；找不到對應圖示先發問
    - **例外**：Markdown 文件可保留 emoji（純 md 不載 FA，emoji 較直覺）

## Figma ↔ Code 工作流

- 忠實還原間距、字體、顏色；數值不確定先發問，嚴禁自行通融
- 輸出 HTML 結構必須保證能倒回 Figma 並維持 Auto Layout 屬性（結構規則見 Coding Rules 2–5）
- Figma 同步任務優先用 MCP 查節點，勿把整份 token 文件貼進對話

## Figma MCP 讀取規範（省 token）

> 目的：用 `use_figma` 讀取時只取必要資料，避免 token 暴增。

1. **只 return 必要欄位**：用 `use_figma` 寫讀取腳本時，只回傳當前任務需要的欄位（如圖層階層、文字內容、Auto Layout/間距變數名），不要整包傾倒。
2. **略過隱藏圖層與向量路徑**：discovery 時設 `figma.skipInvisibleInstanceChildren = true`；永不讀取 `vectorPaths`、`booleanOperation` 等幾何路徑資料。
3. **Icon 以命名代稱**：遇到 icon 元件/實例只讀其名稱（如 `Icon/Search`），程式碼以佔位符（FA class 或 `<IconX />`）表示，不深入內部節點。
4. **依任務切換讀取深度**：
   - 萃取**邏輯/規格/SA**時 → 忽略 fills/effects/strokes/座標/間距，只看階層、欄位名、文字。
   - 做**視覺回灌/還原**時 → 才讀樣式與間距（此時需要精確值）。
5. **批次讀取、減少來回**：一個腳本一次回傳所有需要的值，少做多次 round-trip。
6. **截圖節制**：只在關鍵節點截、用較小 `maxDimension`、可多元件併一張；非必要不截。
7. **能讀程式碼就不讀 Figma**：回灌時先用 `Grep`/`Read` 看 `src/` 推測，只用 Figma 補不確定的值。
