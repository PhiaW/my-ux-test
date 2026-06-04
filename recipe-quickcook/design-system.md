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

主色 primary.500：#688943（橄欖綠）
主色 primary.50（淺）：#F4F7F1
主色 primary.600（Hover）：#557235
主色 primary.700（Active）：#425928
次強調色 secondary.500：#E0A23C（暖黃，點綴用）
頁面底色 neutral.50：#FAFAF9
白色表面 neutral.0：#FFFFFF
主文字 neutral.900：#1A1918
次文字 neutral.600：#5C5A56
Placeholder neutral.400：#A8A6A1
邊框 neutral.200：#E4E3E0
燈號 — 綠燈 success.base：#688943 / 黃燈 warning.base：#E0A23C
食安警告 error.base：#DC2626（淺底 #FEE2E2）
標題字體：'Playfair Display', 'Noto Serif TC', serif
內文字體：'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', 'Helvetica Neue', Arial, sans-serif
等寬字體（計時/份量數字）：'JetBrains Mono', 'Roboto Mono', monospace
按鈕/輸入框圓角：8px（base.lg）
卡片圓角：16px（base.2xl）
Badge / Tag 圓角：9999px（膠囊，base.full）
卡片陰影（含蓄）：0 10px 30px rgba(33,32,30,.06)

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

**Spacing（固定，4px base）**

| 名稱 | 值 | 常用於 |
|------|----|--------|
| XS   | 4px  | icon 內距、標籤內距 |
| SM   | 8px  | 緊湊元件內距 |
| MD   | 16px | 一般內距、欄位間距 |
| LG   | 24px | 卡片 padding、區塊間距 |
| XL   | 32px | 大區塊間距 |
| 2XL  | 48px | Section 間距 |
| 3XL  | 64px | 頁面頂部留白 |

**Border Radius（依案子調性選一組）**

| 調性 | 按鈕/Input | 卡片 | Badge |
|------|-----------|------|-------|
| 方正（政府/企業） | 4px | 8px | 4px |
| 中性（通用） | 8px | 12px | 6px |
| 圓潤（消費/年輕） | 12px | 16px | 9999px |

---

## Section 2 — 元件規格

### Button

**變體 × 尺寸**

| | SM 36px | MD 44px | LG 52px |
|---|:---:|:---:|:---:|
| Primary | ○ | ✓ | ○ |
| Secondary | ○ | ✓ | ○ |
| Ghost | ○ | ✓ | ○ |
| Danger | — | ✓ | — |
| Icon-only | ✓ | ✓ | ✓ |

✓ 必做 ○ 視需求 — 不需要

**Padding**：SM=12px / MD=16px / LG=24px（水平）

**Primary 狀態對照**

| 狀態 | 背景 | 文字 | 備註 |
|------|------|------|------|
| Default | primary.500 | #fff | — |
| Hover | primary.600 | #fff | cursor: pointer |
| Focus | primary.500 | #fff | 2px outline, 2px offset |
| Active | primary.700 | #fff | scale: 0.98 |
| Disabled | neutral.200 | neutral.400 | cursor: not-allowed, opacity: 0.6 |
| Loading | primary.500 | — | spinner 取代文字, pointer-events: none |

Secondary = transparent 底 + primary 色邊框文字 / Ghost = 無邊框 neutral 文字 / Danger = error.base 底

---

### Input / Text Field

**解剖（由上至下）**：`Label` → `Input Field` → `Helper / Error Text`

| 狀態 | 邊框 | 背景 | Helper 文字 |
|------|------|------|------------|
| Default | neutral.300 1px | #fff | neutral.500 |
| Focus | primary.500 2px | #fff | — |
| Error | error.base 2px | error.light | error.dark + ⚠ |
| Disabled | neutral.200 1px | neutral.100 | neutral.400 |
| ReadOnly | neutral.200 1px dashed | neutral.50 | — |

**高度**：SM=36px / MD=44px / LG=52px

**規則**
- 必填 `*` 用 error 色，緊接 label 右側
- Placeholder 不可取代 label
- Textarea：`resize: vertical`；字數計數器右下角 `{n}/{max}`
- Select：右側 chevron icon，展開時旋轉 180°

---

### Card

| 變體 | 邊框 | 陰影 | 適用 |
|------|------|------|------|
| Flat | neutral.200 1px | none | 次要內容 |
| Elevated | none | shadow.md | 主要卡片 |
| Interactive | neutral.200 1px | shadow.sm | 可點擊 |

**Interactive 狀態**

| 狀態 | 陰影 | 邊框 | Transform |
|------|------|------|-----------|
| Default | shadow.sm | neutral.200 | — |
| Hover | shadow.lg | primary.500 | translateY(-2px) |
| Active | shadow.sm | primary.500 | translateY(0) |

**Padding**：標準=24px / 緊湊=16px

**Loading Skeleton**：neutral.200 背景 + shimmer 動畫（左→右光澤）

**Empty State 結構**：icon 48px → 標題 → 說明 → 選配 CTA，全部置中，最小高度 240px

---

### Form Layout

| 模式 | 場景 | 欄寬上限 | 欄位間距 |
|------|------|---------|---------|
| 單欄 | 登入、簡易查詢 | 480px | 24px |
| 雙欄 | 個資、聯絡資訊 | — | 24px |
| 分組 | 長表單、設定頁 | — | 分組間 48px |

**Action 區域**：右對齊；次要按鈕在左，主要按鈕在右，間距 12px

**驗證觸發**：`onBlur`（即時）+ Submit（全域）

**錯誤訊息原則**
- ✓ 「請輸入有效的電子郵件（例：name@company.com）」
- ✗ 「格式錯誤」（禁用）

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

| 元件 | Default | Hover | Focus | Active | Disabled | Error | Loading | Empty |
|------|:-------:|:-----:|:-----:|:------:|:--------:|:-----:|:-------:|:-----:|
| Button (Primary)   | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| Button (Secondary) | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| Button (Ghost)     | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| Button (Danger)    | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| Input              | ✓ | — | ✓ | — | ✓ | ✓ | — | ✓ |
| Select             | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Card (Interactive) | ✓ | ✓ | — | ✓ | — | — | ✓ | ✓ |
| Badge              | ✓ | — | — | — | ✓ | — | — | — |

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
濕手也能操作：廚房裡單手、濕手、隔半公尺都能精準點到。（決策：可點區 ≥48px、步驟與計時器用大字高對比；禁止密集小按鈕、文字超連結式操作與拖拉手勢。）
留白即精緻：以無彩底色與大量留白為主，綠與黃只做點睛。（決策：中性灰佔 60–90%、accent 僅用於燈號與關鍵強調、標題用 Playfair 襯線；禁止大面積彩色背景、漸層與花俏裝飾。）
備料安心：食安與保存規範清楚標示，讓人放心批次備料。（決策：危險/警告如「嫩豆腐不可冷凍」以高亮＋圖示強制顯示、不可只用純文字；計時步驟給明確倒數；文案用鼓勵口語語氣。）
這不是食譜社群：不做探索流、不做社交、不做帳號。（決策：禁止無限滑動探索 feed、登入註冊、廣告與推薦演算法；資料靜態開啟即用；IG 連結只作備查外跳。）

Token 值
主色：#688943 / Hover：#557235 / Active：#425928 / 淺色背景：#F4F7F1
次強調色：#E0A23C（暖黃，點綴用）
頁面底色：#FAFAF9 / 白色表面：#FFFFFF
主文字：#1A1918 / 次文字：#5C5A56 / Placeholder：#A8A6A1 / 邊框：#E4E3E0
燈號 — 綠燈：#688943 / 黃燈：#E0A23C
食安警告：#DC2626（淺底 #FEE2E2）
標題字體：'Playfair Display', 'Noto Serif TC', serif
內文字體：'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', 'Helvetica Neue', Arial, sans-serif
等寬字體（計時/份量數字）：'JetBrains Mono', 'Roboto Mono', monospace
圓角 — 按鈕/輸入框：8px / 卡片：16px / Badge：9999px
卡片陰影：0 10px 30px rgba(33,32,30,.06)
Spacing（固定）
XS=4px, SM=8px, MD=16px, LG=24px, XL=32px, 2XL=48px, 3XL=64px
元件狀態規則

Button：Default / Hover / Focus / Active / Disabled / Loading（見本檔 Section 4）
Input：Default / Focus / Error / Disabled
可點擊 Card：Default / Hover / Loading skeleton / Empty state

Coding Rules

遵守 repo 根目錄 CLAUDE.md § Coding Rules（完整版不在此重複）
圖示一律用 Font Awesome v6（<i class="fa-solid fa-xxx">），禁止 emoji；務必在 <head> 載入 FA CDN。圖示大小/顏色用父層 font-size／color 控制。

— END —