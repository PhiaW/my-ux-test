# Design System — AI Instruction Manual

這份文件是 vibecoding 的**單一指令來源**。
開始新案子前完成 Section 0 的填空，再把 Section 5 的 System Prompt 貼給 AI。

---

## Section 0 — 本案填空區（每次開案更新這裡）

> 每個 `[___]` 都要填，填完後 Section 5 的 prompt 才能正確使用。

```
專案名稱：Recipe QuickCook（快速煮食食譜查看）
平台：Mobile Web（行動優先，純前端 SPA；Vite + React）
主要功能：
  1. 現有食材勾選 → 燈號篩選可做料理（🟢全有 / 🟡差一樣或可替代）
  2. 烹飪步驟與計時引導（廚房大字、計時倒數）
  3. 採買清單一鍵複製 ＋ 備料指引 SOP

> Token 命名以 `src/index.css` 為單一來源（下方變數名即 app 實際使用名）。

主色 --primary：#688943（橄欖綠）
主色 --primary-lt（淺）：#F4F7F1
主色 --primary-hover：#557235
主色 --primary-active：#425928
次強調色 --secondary：#E0A23C（暖黃，點綴用）
次強調淺底 --secondary-lt：#FBF1DF
替代食材文字 --subbed-text：#8A5E16
頁面底色 --bg：#FAFAF9
白色表面 --surface：#FFFFFF
主文字 --text：#1A1918
次文字 --text-sub：#5C5A56
Placeholder --placeholder：#A8A6A1
邊框 --border：#E4E3E0
已有/已備灰勾 --gray-light：#C9C7C2
燈號 — 綠燈 --success：#688943 / 黃燈 --warning：#E0A23C
食安警告 --error：#DC2626（深 --error-strong #B91C1C / 淺底 --error-lt #FEE2E2）
標題字體 --font-display：'Playfair Display', 'Noto Serif TC', serif
內文字體 --font-body：'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif
等寬字體（計時/份量數字）--font-mono：'JetBrains Mono', 'Roboto Mono', monospace
Type scale（全偶數）：--fs-h1 28 / --fs-h2 26 / --fs-h3 20 / --fs-h4 18 / --fs-body 16 / --fs-caption 14 / --fs-mono-lg 24
按鈕/輸入框圓角 --r-btn：8px
卡片圓角 --r-card：16px
Chip / Badge 圓角 --r-pill：9999px（膠囊）
Checkbox 圓角 --r-check：6px / 圓形 --r-circle：50%
卡片陰影 --shadow-card：0 10px 30px rgba(33,32,30,.06)
Hover/Toast 陰影 --shadow-lg：0 16px 40px rgba(33,32,30,.12)
可做食譜光暈 --shadow-glow：0 0 0 1px primary + 0 10px 28px rgba(104,137,67,.16)
觸控/尺寸 token：--size-touch 44（最小觸控，WCAG AA）/ --size-check 24 / --size-step-no・--size-timer-btn 32 / --size-page-btn 40 / --size-fab 48（食材 chip 高亦 48）/ --size-bottom-nav 64

Design Principles：
  1. 一眼可下手：打開就知道今天能煮什麼，不用思考。（決策：首頁以「食材→燈號」為唯一主軸、即時篩選零學習；禁止需閱讀說明的操作、禁止把瀏覽全部食譜當主動線。）
  2. 濕手也能操作：廚房裡單手、濕手、隔半公尺都能精準點到。（決策：主要可點區 ≥44px〔WCAG AA〕、步驟與計時器用大字高對比；小型內聯控制可較小但需留足間距與 focus ring；禁止密集小按鈕、文字超連結式操作與拖拉手勢。）
  3. 留白即精緻：以無彩底色與大量留白為主，綠與黃只做點睛。（決策：中性灰佔 60–90%、accent 僅用於燈號與關鍵強調、標題用 Playfair 襯線；禁止大面積飽和 accent 背景、漸層與花俏裝飾。例外：極淺近中性 accent〔如 --primary-lt〕可作功能分組容器底色，如食材清單淺綠框。）
  4. 備料安心：食安與保存規範清楚標示，讓人放心批次備料。（決策：危險/警告如「嫩豆腐不可冷凍」以高亮＋圖示強制顯示、不可只用純文字；計時步驟給明確倒數；文案用鼓勵口語語氣。）
  5. 這不是食譜社群：不做探索流、不做社交、不做帳號。（決策：禁止無限滑動探索 feed、登入註冊、廣告與推薦演算法；資料靜態開啟即用；IG 連結只作備查外跳。）
```

---

## Section 1 — Token 快速參照

> 完整 token 結構見 `tokens/` 資料夾。`base.json` 不動；本案品牌色彩/字體見 `brand-recipe-quickcook.json`，語義對映見 `semantics.json`。

**Spacing（固定，4px base；變數名同 app）**

| 變數 | 值 | 常用於 |
|------|----|--------|
| --sp-xxs | 2px  | 微距（match-chip 內距、行距） |
| --sp-xs  | 4px  | icon 內距、chip 群間距 |
| --sp-sm  | 8px  | 緊湊元件內距 |
| --sp-md  | 16px | 一般內距、欄位間距、view padding |
| --sp-lg  | 24px | 卡片 padding、區塊間距 |
| --sp-xl  | 32px | 大區塊間距 |
| --sp-2xl | 48px | Section 間距（本案最大，無 3xl） |

**Border Radius（本案實際採用，圓潤調性）**

| 變數 | 值 | 用於 |
|------|----|------|
| --r-btn   | 8px    | Button · Input row |
| --r-card  | 16px   | Card · Panel |
| --r-pill  | 9999px | Chip · Badge · 膠囊鈕 |
| --r-check | 6px    | Checkbox |
| --r-circle| 50%    | Avatar · FAB · 步驟編號 · 計時鈕 |

**尺寸 token（觸控 / 元件，固定）**

| 變數 | 值 | 用於 |
|------|----|------|
| --size-check | 24px | checkbox |
| --size-step-no / --size-timer-btn | 32px | 步驟編號圓徽 · 計時鈕 |
| --size-page-btn | 40px | 分頁鈕 |
| --size-touch | 44px | 最小觸控（btn / 下拉 / group-head），WCAG AA |
| --size-fab | 48px | 回頂鍵；食材 chip 高亦為 48 |
| --size-bottom-nav | 64px | 底部導航高 |

---

## Section 2 — 元件規格

> 以下規格對齊 `src/index.css` 實際元件，class 名即 app 使用名。

### Button（`.btn` + 變體）

本案僅三種變體，皆 `min-height: var(--size-touch)`（44px）、`padding: 0 var(--sp-md)`、`font-weight: 700`、`--r-btn`。`.btn-block` 撐滿寬。

| 變體 | Default | Hover | Active | Focus | Disabled |
|------|---------|-------|--------|-------|----------|
| `.btn-primary` | 底 `--primary-hover` / 白字 | 底 `--primary-active` | `--primary-active` + scale .98 | 2px outline `--primary` offset 2 | opacity .4, not-allowed |
| `.btn-secondary` | 透明底 + 1.5px `--primary` 邊框文字 | 底 `--primary-lt` | — | 同上 | opacity .4 |
| `.btn-ghost` | 透明底 + `--text-sub`（weight 500） | 底 `--bg` / `--text` | — | 同上 | opacity .4 |

> ⚠ Primary 預設底為 **`--primary-hover`（較深）**，hover 再加深至 `--primary-active`，確保白字對比。非 token 基準色 `--primary`。
> 另有清單工具列小鈕 `.btn-shuffle`（`--primary-lt` 底、caption、`--r-btn`）。本案**無 Danger / Loading 變體**。

---

### 食材 Chip（`.chip`）

冰箱食材勾選（依食材選模式）。`min-height: 48px`、`--r-pill`、`font-weight: 500`。

| 狀態 | 樣式 |
|------|------|
| Default | `--surface` 底 + `--border` 邊框；icon `--placeholder` |
| Hover | 邊框轉 `--primary` |
| Active | scale .97 |
| Selected `.is-selected` | `--primary-lt` 底 + `--primary` 邊框 + `--primary-active` 文字（weight 700）；icon 轉 `--primary` |
| Focus | 2px outline `--primary` offset 2 |

---

### 燈號對照 match-chip（`.match-chip` — 核心互動）

依冰箱食材判定每道菜核心食材狀態。`--r-pill`、`--sp-xxs var(--sp-sm)` 內距、前置 `.dot`。

| 狀態 | dot / 文字 / 邊框 / 底 | 語義 |
|------|----------------------|------|
| 缺（base） | `--gray-light` / `--placeholder` / `--border` / `--bg` | 未滿足 |
| `.on` | `--success` / `--primary-active` / `--primary` / `--primary-lt` | 有 / 可選（綠燈） |
| `.sub` | `--warning` / `--subbed-text` / `--warning` / `--secondary-lt` | 可替代（黃燈） |

---

### Badge（`.badge` + 變體）

`--sp-xs var(--sp-md)` 內距、caption、weight 700、`--r-pill`。

| 變體 | 底 / 文字 | 用於 |
|------|-----------|------|
| `.badge-info` | `--primary-lt` / `--primary-active` | 份數 |
| `.badge-method` | `--secondary-lt` / `--subbed-text` | 料理方法（前置 utensils icon） |
| `.badge-ing` | `--bg` / `--text-sub` + `--border` 邊框（weight 500） | 核心食材 |

---

### 搜尋框（`.plan-search`）

備餐計畫選菜搜尋。膠囊容器（`--r-pill`、`--bg` 底），內含 search icon + input + 清除鈕。

| 狀態 | 樣式 |
|------|------|
| Default | `--border` 邊框；placeholder `--placeholder` |
| Focus | `:focus-within` 邊框轉 `--primary`（input 原生 outline 不可消除） |

> 篩選下拉 `.multiselect-trigger`：膠囊鈕，`is-open` 時邊框 `--primary`、chevron 旋轉 180°。

---

### 食譜卡（`.recipe-card`）

封面 + 標題列（`.card-title` Playfair + 份數 badge 右上）+ 燈號對照／核心食材 chip 列。

| 狀態 | 陰影 | 邊框 | Transform |
|------|------|------|-----------|
| Default | `--shadow-card` | `--border` | — |
| Hover | `--shadow-lg` | `--primary` | translateY(-2px) |
| Active | — | — | translateY(0) |
| `.is-ready`（全食材滿足） | `--shadow-glow` 光暈 | `--primary` | + `.ready-flag`「可做」旗標 |
| Focus | 2px outline `--primary` offset 2 | — | — |

封面無圖：`.card-cover` `--primary-lt` 底 + fire-burner 圖示（佔位）。

---

### 採買勾選（`.ing-check`）

採買清單食材狀態勾選，`--size-check`（24px）、`--r-check`。

| 狀態 | 樣式 | 語義 |
|------|------|------|
| Default | `--surface` 底 + `--border`，hover 邊框 `--primary` | 未勾 |
| `.buy` | `--secondary` 底橘勾 | 要買 |
| `.have` | `--gray-light` 底灰勾（看似 disabled，**不加刪除線**） | 已有（不用買） |

---

### 詳情頁食材列（`.ing-row`）

食譜詳情食材清單列。整合 `.ing-check`（採買勾）+ `.name-block`（名稱／`.opt-flag` 可省略）+ `.qty`（mono 份量）+ `.tag-mini`（狀態標）+ `.buy-toggle`（採買切換鈕），可展開 `.ing-subs` 可替換次選。

| 狀態 | 邊框 / 底 | tag-mini / buy-toggle |
|------|-----------|----------------------|
| 要買（base） | `--border` / `--surface` | buy-toggle `--secondary`（橘「要買」） |
| `.have`（已有不買） | `--primary` 邊框 | tag-mini `--success`；buy-toggle `--text-sub`（灰「已有」） |
| `.subbed`（可替代） | `--warning` 邊框 / `--secondary-lt` 底 | tag-mini `--subbed-text`（「用◯◯」） |

**可替換次選 `.sub-chip`**（min-height 32px、`--r-pill`）— 注意與燈號 `.match-chip` 是兩種不同元件：

| 狀態 | 樣式 |
|------|------|
| Default | `--bg` 底 + `--border` / `--text-sub` |
| `.on`（冰箱有此替代） | `--primary-lt` 底 + `--primary` 邊框 + `--primary-active`（weight 700）+ check icon |
| `.skip`（可不加） | italic |

---

### 備餐元件卡（`.prep-card`）

備餐計畫批次備料元件。`.prep-check`（灰勾 checkbox）+ `.prep-name`（Playfair）+ `.prep-meta`（用量/保存）+ `.prep-steps`（ol 步驟）+ `.prep-uses` / `.prep-use-chip`（用在哪幾道菜，可點跳轉）。

| 狀態 | 樣式 |
|------|------|
| Default | `--surface` 底 + `--border` + `--shadow-card` |
| 已備 `.is-done` | 整卡 opacity .5；`.prep-name` 加 `--placeholder` 刪除線；checkbox 灰勾 `--gray-light` |

---

### 步驟 + 計時器（`.step` / `.timer`）

`.step`：編號圓徽 `.step-no`（`--size-step-no` 32px、`--primary-lt` 底、mono）+ `.step-body`。
`.timer`：計時鈕 `.timer-btn`（32px 圓鈕）+ `.timer-display`（`--fs-mono-lg` 24px mono 700）。

| 狀態 | 顯示 |
|------|------|
| 預設 | 數字 `--text`；鈕 play icon |
| 計時中 | 鈕 pause icon |
| 結束 `.is-done` | 數字轉 `--secondary`（暖黃）；鈕 bell icon |

---

### 其他

- **備餐進度條** `.plan-progress`：6px 高、`--border` 軌道、`--primary` 填色、width 平滑過渡。
- **分頁** `.page-btn`：`--size-page-btn`（40px）、mono、`--r-btn`；`.is-active` 填 `--primary`；disabled opacity .4。
- **底部導航** `.bottom-nav-btn`：高 `--size-bottom-nav`（64px）、三入口、`.is-active` 轉 `--primary`。
- **回頂鍵** `.scroll-top`：`--size-fab`（48px）圓形、`--fab-bg` 半透明黑、`backdrop-filter: blur(4px)`。
- **Toast** `.toast`：底部膠囊、`--primary-active` 底白字、`--shadow-lg`。
- **Empty** `.empty`：icon 48px（`--border` 色）→ 標題（Playfair）→ 說明，置中，`min-height: 240px`。

---

## Section 3 — Coding Rules

> **完整 9 條規則**見 repo 根目錄 `CLAUDE.md` § Coding Rules（全 repo 唯一完整版，勿在此重複）。  
> 本案補充：token 以本檔 **Section 0** 為準；元件狀態以 **Section 4** Checklist 為準。

**圖示規範（Icon）**
- HTML 產出的圖示一律用 **Font Awesome v6**（`<i class="fa-solid fa-xxx"></i>`），**禁止使用 emoji**。
- 必須在 `<head>` 載入 CDN：`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">`
- 圖示大小/顏色由父層 `font-size` 與 `color`（或 CSS 變數）控制，不寫死。
- 找不到對應圖示先發問，不要退回 emoji。
- Markdown 文件可保留 emoji（純 md 不載 FA，emoji 較直覺）。

---

## Section 4 — 元件狀態 Checklist

> 對齊本案實際元件（無 Danger / Loading）。

| 元件 | Default | Hover | Focus | Active | Disabled | 特殊狀態 |
|------|:-------:|:-----:|:-----:|:------:|:--------:|---------|
| Button (Primary)   | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| Button (Secondary) | ✓ | ✓ | ✓ | — | ✓ | — |
| Button (Ghost)     | ✓ | ✓ | ✓ | — | ✓ | — |
| 食材 Chip          | ✓ | ✓ | ✓ | ✓ | — | `.is-selected` |
| match-chip 燈號    | ✓ | — | — | — | — | `.on` 綠 / `.sub` 黃 / 缺 |
| 搜尋框 plan-search | ✓ | — | ✓(within) | — | — | — |
| multiselect 下拉   | ✓ | ✓ | ✓ | — | — | `.is-open` |
| 食譜卡 recipe-card | ✓ | ✓ | ✓ | ✓ | — | `.is-ready` 光暈 |
| 採買勾 ing-check   | ✓ | ✓ | ✓ | — | — | `.buy` 橘 / `.have` 灰 |
| 食材列 ing-row     | ✓ | — | — | — | — | `.have` / `.subbed` / `.opt-flag` |
| 可替換 sub-chip    | ✓ | — | — | — | — | `.on` / `.skip` |
| 備餐卡 prep-card   | ✓ | — | ✓ | — | — | `.is-done` |
| 計時器 timer       | ✓ | ✓ | ✓ | — | — | 計時中 / `.is-done` |
| 分頁 page-btn      | ✓ | ✓ | ✓ | — | ✓ | `.is-active` |
| Badge              | ✓ | — | — | — | — | info / method / ing |
| Empty / Toast      | ✓ | — | — | — | — | — |

---

## Section 5 — Vibecoding System Prompt

> 把 Section 0 填好後，複製下方「— START —」到「— END —」之間的全部內容，貼為 AI 的 system prompt。

— START —
你是資深前端工程師，同時具備 UX 設計能力，正在協助設計師用 vibecoding 方式生成高互動原型。
產出目標是「畫面對、互動順、能點」，不追求 production-ready code 品質。
專案
名稱：Recipe QuickCook（快速煮食食譜查看）
平台：Mobile Web（行動優先，純前端 SPA；Vite + React）
主要功能：

現有食材勾選 → 燈號篩選可做料理（🟢全有 / 🟡差一樣或可替代）
烹飪步驟與計時引導（廚房大字、計時倒數）
採買清單一鍵複製 ＋ 備料指引 SOP

Design Principles

一眼可下手：打開就知道今天能煮什麼，不用思考。（決策：首頁以「食材→燈號」為唯一主軸、即時篩選零學習；禁止需閱讀說明的操作、禁止把瀏覽全部食譜當主動線。）
濕手也能操作：廚房裡單手、濕手、隔半公尺都能精準點到。（決策：主要可點區 ≥44px〔--size-touch〕、食材 chip 高 48px、步驟與計時器用大字高對比；禁止密集小按鈕、文字超連結式操作與拖拉手勢。）
留白即精緻：以無彩底色與大量留白為主，綠與黃只做點睛。（決策：中性灰佔 60–90%、accent 僅用於燈號與關鍵強調、標題用 Playfair 襯線；禁止大面積彩色背景、漸層與花俏裝飾。）
備料安心：食安與保存規範清楚標示，讓人放心批次備料。（決策：危險/警告如「嫩豆腐不可冷凍」以高亮＋圖示強制顯示、不可只用純文字；計時步驟給明確倒數；文案用鼓勵口語語氣。）
這不是食譜社群：不做探索流、不做社交、不做帳號。（決策：禁止無限滑動探索 feed、登入註冊、廣告與推薦演算法；資料靜態開啟即用；IG 連結只作備查外跳。）

Token 值（變數名同 src/index.css）
--primary：#688943 / --primary-hover：#557235 / --primary-active：#425928 / --primary-lt：#F4F7F1
--secondary：#E0A23C（暖黃，點綴用）/ --secondary-lt：#FBF1DF / --subbed-text：#8A5E16
--bg：#FAFAF9 / --surface：#FFFFFF
--text：#1A1918 / --text-sub：#5C5A56 / --placeholder：#A8A6A1 / --border：#E4E3E0 / --gray-light：#C9C7C2
燈號 — --success(綠燈)：#688943 / --warning(黃燈)：#E0A23C
食安 --error：#DC2626 / --error-strong：#B91C1C / --error-lt：#FEE2E2
標題字體 --font-display：'Playfair Display', 'Noto Serif TC', serif
內文字體 --font-body：'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif
等寬字體 --font-mono：'JetBrains Mono', 'Roboto Mono', monospace
Type scale：--fs-h1 28 / --fs-h2 26 / --fs-h3 20 / --fs-h4 18 / --fs-body 16 / --fs-caption 14 / --fs-mono-lg 24
圓角 — --r-btn 8 / --r-card 16 / --r-pill 9999 / --r-check 6 / --r-circle 50%
陰影 — --shadow-card / --shadow-lg / --shadow-glow（可做食譜光暈）
Spacing（固定）
--sp-xxs=2, --sp-xs=4, --sp-sm=8, --sp-md=16, --sp-lg=24, --sp-xl=32, --sp-2xl=48（無 3xl）
尺寸 — --size-touch 44（最小觸控）/ --size-check 24 / --size-step-no・timer-btn 32 / --size-page-btn 40 / --size-fab 48 / --size-bottom-nav 64
元件狀態規則（見本檔 Section 4）

Button（primary/secondary/ghost）：Default / Hover / Focus / Active / Disabled（無 Danger / Loading；Primary 預設底為 --primary-hover）
食材 chip：Default / Hover / Active / Focus / is-selected
match-chip 燈號：缺 / on(綠) / sub(黃)
食譜卡：Default / Hover / Active / Focus / is-ready 光暈
採買勾 ing-check：未勾 / buy(橘) / have(灰)
計時器：預設 / 計時中 / is-done

Coding Rules

遵守 repo 根目錄 CLAUDE.md § Coding Rules（完整版不在此重複）
圖示一律用 Font Awesome v6（<i class="fa-solid fa-xxx">），禁止 emoji；務必在 <head> 載入 FA CDN。圖示大小/顏色用父層 font-size／color 控制。

— END —