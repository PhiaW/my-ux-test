# CLAUDE.md — 任性選擇器（capricious-picker）

> 此檔案只記錄 capricious-picker 專案的情境與開發規範。  
> 全域原則（語言、工作風格、排版規範等）請見上層 `my-ux-test/CLAUDE.md`。

---

## 專案概述

協助選不出午/晚餐的使用者做決定的 Mobile Web App。  
使用者先選擇「身份/心情」→ 選時段 → 命運之輪 → 結果 → 可任性拒絕（最多 2 次）→ 精細化方向 → 最終結果。

### 技術棧
- **純 Vanilla HTML / CSS / JS**，單一 `index.html`，無任何 build tool 或 framework
- **Canvas API** 繪製命運之輪（`drawWheel` / `spinWheel`）
- **Google Fonts**：`Playfair Display`（Display 標題）+ `Noto Sans TC`（所有內文）
- **localStorage**：key `theme`，值 `'dark'` / `'light'`，跨頁面共用

### 檔案結構
```
capricious-picker/
  index.html          # 主應用程式（CSS + HTML + JS 全在一個檔案）
  design-system.html  # Design System 文件頁（tokens + components 完整清單）
  design-token.md     # Design Token 單一事實來源（SSoT）
  tokens/
    primitives.json   # Figma Primitives collection 定義
    semantics.json    # Figma Semantics collection 定義
  CLAUDE.md           # 本檔
```

---

## State Machine

所有 UI 由 `render()` 統一驅動，狀態儲存在 `st` 物件。修改任何畫面邏輯前，先確認 phase 對應的 `build*` function。

```
PERSONA
  └─► INITIAL
        └─► SPIN1 ──► RESULT1 ──(接受)──► RESULT2 ──► FINDING/NEARBY
                          │
                          ├─(拒絕 < 2 次)──► ASK_DIR ──► SPIN2 ──► RESULT2
                          │
                          ├─(拒絕達 2 次)──► EXHAUSTED ──► BLIND ──► RESULT2
                          │
                          └─(找不到)──► CANT_FIND ──► SPIN1 / SPIN2
```

| 常數 | 值 | 說明 |
|------|----|------|
| `MAX_TANTRUMS` | `2` | 拒絕幾次後觸發 EXHAUSTED 彩蛋 |

### `st` 物件欄位
```js
{
  phase,        // 當前 state（S.* 常數）
  persona,      // 'busy' | 'holiday'
  category,     // '午餐' | '點心' | '晚餐'
  result1,      // { name, emoji }  第一輪轉盤結果
  direction,    // string  使用者選的方向名稱
  result2,      // { name, emoji }  最終選定結果
  tantrumCount, // number  任性拒絕次數
  nearbyResult, // null（保留欄位）
  blindPicks,   // [{ name, emoji }, ...]  盲選三個隨機餐點
}
```

---

## Figma ↔ Code 同步規則

> **核心原則：把 App 畫面傳回 Figma 時，所有屬性必須綁定 Design Token 或 Component，禁止 hardcode。**

### 顏色 → Semantics Variables（優先）
- 所有填色（Frame fill、Shape fill、Text fill、Stroke）一律綁定 **Semantics collection** 的 variable
- 禁止直接填 hex 值
- Semantics variable 名稱見下表「Color Token 雙層對照」

### 文字 → Text Styles（強制）
- 所有 Text 節點必須套用 Figma Text Style
- 禁止 hardcode fontSize / fontWeight / lineHeight / letterSpacing
- 可用的 style 清單見下方「Text Styles 完整清單」

### 間距、圓角 → Primitives Variables
- padding、gap、corner radius 一律綁定 **Primitives collection** 的 `spacing/*` / `radius/*`
- 若某個數值在 Primitives 中找不到對應，先提出疑問，不得自行填數字

### 元件 → Component Instance（強制）
- 畫面中出現的以下 UI **必須使用 Figma Component instance**，禁止自行繪製：

| Figma Component | 對應 CSS class / 說明 |
|-----------------|----------------------|
| `Button` (Variant=Main/Ghost/CantFind/Restart/Calm/Blind) | `.btn-main` / `.btn-ghost` / `.btn-cantfind` / `.btn-restart` / `.btn-calm` / `.btn-blind` |
| `ThemeToggle` (State=Day/Night) | theme toggle 圓形按鈕 |
| `BackLink` (State=Default/Active) | `.back-link` |
| `Tag` | `.persona-tag` |
| `PersonaIndicator` | `.persona-indicator` |
| `CatBtn` (Type=Category/Direction) | `.cat-btn` / `.dir-btn`（同元件，Type variant 切換） |
| `PersonaCard` | `.persona-btn` |
| `Header` | App 頂部標題列 |
| `food-illustration` | 食物插圖 |
| Font Awesome icons (58 個) | 功能性圖示，詳見 Icon Inventory |

### 待元件化的容器（Backlog — 已決策，尚未執行）
以下 CSS class 在 Figma 中目前是 Frame，需建立為 Component 後才能在畫面中使用 instance。建立前先確保內部所有屬性已綁定 token。

| 待建 Component | 對應 CSS class | 備註 |
|----------------|----------------|------|
| `ResultCard` | `.result-card` | 包含食物 icon、食物名（Title/Hero）、命運之輪說明文字 |
| `FinalCard` | `.final-card` | primary bg + glow，含 TODAY'S PICK eyebrow |
| `ExhaustedCard` | `.exhausted-card` | 包含 face-meh icon、「我沒招了」（Title style） |
| `CantFindCard` | `.cantfind-card` | 包含食物 icon + 提示文字 |
| `BlindChest` | `.blind-chest` | 需定義 State=Closed / Revealed |
| `ProgressBar` | — | 4 段式 segmented progress，需定義 step 0–4 |
| `NearbyReminder` | `.nearby-reminder` | 左線提示條，顯示已選食物 |

### Shadow / Motion / Z-index
Figma Variables 不支援這三類 token，維持手動設定，數值必須對照 `design-token.md` 定義，不得自行決定數值。

---

## Color Token 雙層對照

| Figma Semantics Variable | CSS 變數 | Light 值 | Dark 值 |
|--------------------------|----------|-----------|---------|
| `color/background` | `--bg` | `#FCF9F0` | `#1E1812` |
| `color/surface` | `--surface` | `#FFFFFF` | `#2A211A` |
| `color/primary` | `--primary` | `#F3A839` | `#B65D32` |
| `color/primary-hover` | `--primary-hv` | `#BF5730` | `#E39B3F` |
| `color/primary-container` | `--primary-lt` | `#F3CFA8` | `#74411F` |
| `color/on-background` | `--text` | `#3B332B` | `#EBD7C0` |
| `color/on-surface-variant` | `--muted` | `#82491B` | `#B98C60` |
| `color/outline` | `--border` | `#E9E1D6` | `#3B332B` |
| `color/on-primary` | `--on-primary` | `#15120F` | `#1E1812` |
| `color/on-primary-container` | — | `#15120F` | `#B65D32` |

> **注意命名差異**：Figma 使用 Material Design 語意命名（`on-background`、`outline`），CSS 使用縮寫慣例（`--text`、`--border`）。對照表為唯一橋接來源。

---

## Spacing / Radius Token 對照

| Figma Primitives Variable | 值 | CSS 用途 |
|---------------------------|-----|---------|
| `spacing/1` | 4px | inline gap、progress bar gap |
| `spacing/2` | 8px | 小元件 padding、tag gap |
| `spacing/3` | 12px | 元件內 row gap |
| `spacing/4` | 16px | 按鈕 padding（上下）|
| `spacing/5` | 20px | `--page-x`（App 左右 padding）|
| `spacing/6` | 24px | 卡片 padding-x |
| `spacing/7` | 28px | progress padding-bottom |
| `spacing/8` | 32px | 卡片 padding-y |
| `spacing/10` | 40px | final-card padding-y |
| `spacing/11` | 44px | header padding-top |
| `spacing/12` | 48px | DS padding |
| `spacing/16` | 64px | section 間距 |
| `radius/md` | 14px | `--rs`：按鈕圓角 |
| `radius/xl` | 20px | `--r`：卡片圓角 |
| `radius/full` | 100px | pill 按鈕（calm/blind/restart）|
| `radius/circle` | 9999px | theme-toggle |

---

## Text Styles 完整清單（Figma 定義）

> 以下為目前 Figma 檔案中的 11 個 Text Style，同步畫面時所有文字節點必須使用。

| Style 名稱 | 字型 | 大小 | 字重 | Line Height | Letter Spacing | 用途 |
|-----------|------|------|------|-------------|----------------|------|
| `Display` | Playfair Display | 32px | Bold | 110% | -0.5px | App 主標題「任性選擇器」 |
| `Title/Hero` | Noto Sans TC | 32px | Bold | 110% | 0 | 結果大字（食物名稱） |
| `Title` | Noto Sans TC | 24px | Bold | 115% | 0 | 頁面主標（「我沒招了」、「命運三選一」）|
| `Body/Regular` | Noto Sans TC | 18px | Regular | 155% | 0 | 一般內文、ghost 按鈕 |
| `Body/Medium` | Noto Sans TC | 18px | Medium | 155% | 0 | 主要按鈕文字 |
| `Label/Regular` | Noto Sans TC | 16px | Regular | 150% | 0 | 返回連結、次要操作 |
| `Label/Medium` | Noto Sans TC | 16px | Medium | 150% | 0 | 按鈕標籤、Restart/Calm/Blind 按鈕 |
| `Caption/Light` | Noto Sans TC | 14px | Light | 160% | 0 | hint 說明文字 |
| `Caption/Regular` | Noto Sans TC | 14px | Regular | 160% | 0 | 輔助說明、tag 文字 |
| `Caption/Bold` | Noto Sans TC | 14px | Bold | 160% | 0 | 盲選寶箱「？？？」|
| `Eyebrow` | Noto Sans TC | 18px | Medium | 100% | 1.8px | ALL CAPS 區塊標籤（大寫間距版） |

> **`--fs-title` CSS 變數已更新為 24px**（原 token doc 記載 28px 為誤，已依 Figma 實際 style 修正）。

---

## 元件 Class 速查

### 按鈕
| CSS Class | Figma Component | 語意 |
|-----------|----------------|------|
| `.btn-main` | `Button` Variant=Main | 主要操作（primary bg） |
| `.btn-ghost` | `Button` Variant=Ghost | 次要操作（border only） |
| `.btn-cantfind` | `Button` Variant=CantFind | 可選輔助（dashed border） |
| `.btn-restart` | `Button` Variant=Restart | primary 底色卡片內（白色半透明 pill）|
| `.btn-calm` | `Button` Variant=Calm | 彩蛋「冷靜了」（bg 底色 pill）|
| `.btn-blind` | `Button` Variant=Blind | 盲選挑戰 CTA（primary pill）|
| `.back-link` | `BackLink` | 文字型返回連結 |

### 卡片（待元件化，目前是 Frame）
| CSS Class | 語意 |
|-----------|------|
| `.result-card` | 命運之輪結果（surface bg）|
| `.final-card` | 最終選擇（primary bg + glow）|
| `.exhausted-card` | 彩蛋「我沒招了」（surface bg）|
| `.cantfind-card` | 找不到附近（surface bg）|
| `.blind-chest` | 盲選寶箱（`.revealed` 狀態：primary-container bg）|
| `.maps-search-card` | Google Maps 外連卡片 |

### 互動列
| CSS Class | Figma Component | 語意 |
|-----------|----------------|------|
| `.cat-btn` | `CatBtn` Type=Category | 時段類別列（hover 上浮 2px）|
| `.dir-btn` | `CatBtn` Type=Direction | 方向選擇列（hover 右移 4px + primary-container bg）|
| `.persona-btn` | `PersonaCard` | Persona 選擇列（hover 上浮 3px）|

> **CatBtn 元件化策略**：`.cat-btn` 與 `.dir-btn` 使用同一個 Figma `CatBtn` 元件，以 `Type` Variant property（`Category` / `Direction`）區分，兩者結構相同（icon + name + hint + arrow），hover 行為在各自的 Hover state 中定義。

### 標籤 & 指示器
| CSS Class | Figma Component | 語意 |
|-----------|----------------|------|
| `.persona-tag` | `Tag` | Persona 列內小標籤（pill）|
| `.persona-indicator` | `PersonaIndicator` | INITIAL 畫面身份指示條 |
| `.nearby-reminder` | 待元件化 | Nearby 畫面左線提示條 |
| `.eyebrow` | — | ALL CAPS 區塊標籤，套用 `Eyebrow` Text Style |

---

## 開發慣例

### 新增畫面
1. 在 `S` 物件新增 phase 常數
2. 在 `render()` 的 `stepMap` 加入進度條對應
3. 在 `switch(st.phase)` 新增 `case`
4. 實作 `build{PhaseName}(w)` function
5. 所有 DOM 操作使用 `mk(tag, cls, text)` 和 `append(parent, child)` helpers

### 新增 CSS 元件
- 樣式全部寫在 `<style>` 區塊，依語意分區（有 `/* ── Section ──` 格式的區塊分隔）
- class 命名：`kebab-case`，語意命名（`.blind-chest` 不叫 `.box-3`）
- **必須使用 CSS 變數，嚴禁 hardcode 顏色值**（輪盤顏色陣列除外）
- Dark Mode 例外樣式統一寫在檔案頂部的 `[data-theme="dark"]` 區塊

### 新增 Figma Token 或 Component
1. 先更新 `design-token.md`（SSoT）
2. 更新 `tokens/primitives.json` 或 `tokens/semantics.json`
3. 在 Figma 建立/修改 variable 或 text style
4. 更新本 CLAUDE.md 對應表格

### Canvas 輪盤
- `drawWheel(canvas, items, rot)` 純繪製，隨時可呼叫
- `spinWheel(canvas, items, onDone)` 啟動動畫，結束後 callback
- Dark mode 切換後需重新呼叫 `drawWheel` 才會更新顏色
- `wheelRot` 為全域變數，切換 scene 前請重設為 `0`

---

## 已實作功能清單
- [x] Persona 選擇（忙碌上班族 / 放假上班族）
- [x] 時段選擇（午餐 / 點心 / 晚餐）
- [x] 命運之輪（Canvas，可點擊提前停止）
- [x] 拒絕機制（最多 2 次，第 3 次觸發彩蛋）
- [x] 方向精細化選擇
- [x] 最終結果 + Google Maps 搜尋連結
- [x] EXHAUSTED 彩蛋畫面
- [x] 盲選挑戰（三個神祕寶箱）
- [x] 找不到附近選項流程
- [x] Light / Dark Mode 切換
- [x] 4 步驟進度條
- [x] Design System 文件頁（`design-system.html`）

## Figma Backlog（已決策，待執行）
- [ ] 在 Figma 建立 `ResultCard` Component
- [ ] 在 Figma 建立 `FinalCard` Component
- [ ] 在 Figma 建立 `ExhaustedCard` Component
- [ ] 在 Figma 建立 `CantFindCard` Component
- [ ] 在 Figma 建立 `BlindChest` Component（State=Closed/Revealed）
- [ ] 在 Figma 建立 `ProgressBar` Component（step 0–4）
- [ ] 在 Figma 建立 `NearbyReminder` Component
- [x] 在 `CatBtn` 新增 `Type` Variant property（Category / Direction）
- [x] 更新 `design-token.md`：`font.size.title` 修正為 24px，移除 Body/Bold / Label/Light / Label/Bold / Tag/Label，新增 Title/Hero / Caption/Bold
- [x] 更新 `tokens/primitives.json`：`font/size/title` 修正為 24
