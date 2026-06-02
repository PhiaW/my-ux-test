# CLAUDE.md — 任性選擇器（capricious-picker）

> 此檔只記錄本專案情境與流程。全域規則見 `my-ux-test/CLAUDE.md`。  
> **Token / 色彩 / 字級 / 間距完整表** → `design-token.md`（SSoT，勿在本檔重複）。

---

## 專案概述

協助選不出午/晚餐的使用者做決定的 Mobile Web App。  
流程：身份/心情 → 時段 → 命運之輪 → 結果 → 可任性拒絕（最多 2 次）→ 精細化方向 → 最終結果。

### 技術棧

- 純 Vanilla HTML / CSS / JS，單一 `index.html`
- Canvas API：`drawWheel` / `spinWheel`
- 字體：`Playfair Display` + `Noto Sans TC`
- `localStorage` key `theme`：`'dark'` / `'light'`

### 入口檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | 主 App |
| `design-system.html` | DS 展示頁 |
| `design-token.md` | Token SSoT |
| `tokens/primitives.json` · `tokens/semantics.json` | Figma 匯出 |

---

## State Machine

所有 UI 由 `render()` 驅動，狀態在 `st`。改畫面前先確認 phase 對應的 `build*` function。

```
PERSONA → INITIAL → SPIN1 → RESULT1 ──(接受)──► RESULT2 → FINDING/NEARBY
                      │              ├─(拒絕<2)──► ASK_DIR → SPIN2 → RESULT2
                      │              ├─(拒絕≥2)──► EXHAUSTED → BLIND → RESULT2
                      │              └─(找不到)──► CANT_FIND → SPIN1/SPIN2
```

| 常數 | 值 | 說明 |
|------|-----|------|
| `MAX_TANTRUMS` | `2` | 拒絕達此次數觸發 EXHAUSTED |

### `st` 欄位

`phase`, `persona` (`busy`|`holiday`), `category`, `result1`, `direction`, `result2`, `tantrumCount`, `nearbyResult`, `blindPicks`

---

## Figma ↔ Code（摘要）

> 傳回 Figma 時：填色綁 Semantics variable、文字綁 Text Style、間距/圓角綁 Primitives；禁止 hardcode。  
> 詳細對照與 hex → 見 **`design-token.md`** §3–§6。

### 必須用 Component Instance

`Button`（Main/Ghost/CantFind/Restart/Calm/Blind）→ `.btn-*` · `ThemeToggle` · `BackLink` · `Tag` · `PersonaIndicator` · `CatBtn`（Category/Direction）→ `.cat-btn`/`.dir-btn` · `PersonaCard` · `Header` · `food-illustration`

### 待元件化（Figma Backlog）

| Component | CSS class |
|-----------|-----------|
| `ResultCard` | `.result-card` |
| `FinalCard` | `.final-card` |
| `ExhaustedCard` | `.exhausted-card` |
| `CantFindCard` | `.cantfind-card` |
| `BlindChest` | `.blind-chest`（Closed/Revealed）|
| `ProgressBar` | step 0–4 |
| `NearbyReminder` | `.nearby-reminder` |

Shadow / Motion / Z-index：Figma Variables 不支援，數值見 `design-token.md` §7–§8。

---

## 開發慣例

### 新增畫面

1. `S` 新增 phase 常數 → 2. `stepMap` → 3. `switch(st.phase)` case → 4. `build{Phase}(w)` → 5. 用 `mk` / `append`

### 新增 CSS

- 寫在 `index.html` `<style>`，分區註解；`kebab-case`；顏色用 CSS 變數（輪盤色陣列除外）
- Dark mode 集中在 `[data-theme="dark"]`

### 新增 Token / Figma

1. `design-token.md` → 2. `tokens/*.json` → 3. Figma 變數／樣式（**不必**回寫本 CLAUDE.md 表格）

### Canvas 輪盤

- `drawWheel` 可隨時重繪；`spinWheel` 結束 callback
- 切 theme 後需重呼叫 `drawWheel`；換 scene 前 `wheelRot = 0`
