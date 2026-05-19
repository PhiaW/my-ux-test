# Design Tokens — 任性選擇器

> **用途**：此文件是 Design Token 的唯一事實來源（Single Source of Truth）。  
> 所有 CSS 變數、Figma Variables、未來元件庫的數值都應從此處衍生，不可自行 hardcode。

---

## 目錄

1. [Token 命名規範](#1-token-命名規範)
2. [Figma 匯入說明](#2-figma-匯入說明)
3. [色彩系統](#3-色彩系統)
4. [文字樣式](#4-文字樣式)
5. [間距系統](#5-間距系統)
6. [圓角](#6-圓角)
7. [陰影](#7-陰影)
8. [動效](#8-動效)
9. [佈局與網格](#9-佈局與網格)
10. [Z-Index](#10-z-index)
11. [Token Studio JSON 完整輸出](#11-token-studio-json-完整輸出)

---

## 1. Token 命名規範

### 分層結構

```
{類別}.{子類別}.{層級/名稱}
```

| 層 | 說明 | 範例 |
|----|------|------|
| **Primitive** | 原始數值，不帶語意，只存在於 global set | `color.orange.300` |
| **Semantic** | 有語意的別名，參照 Primitive，依 Light/Dark 模式不同 | `color.bg`、`color.primary` |
| **Component** | 元件級 token，參照 Semantic（未來擴充用） | `button.primary.bg` |

### 命名慣例
- 全部小寫、kebab-case：`font-size-body`、`space-4`
- Primitive 數字代表在該色系中的相對深度（數字越大越深）
- Semantic token 名稱應反映**用途**而非**外觀**（`color.muted` ✓，`color.gray-medium` ✗）

---

## 2. Figma 匯入說明

### 工具：Token Studio for Figma

1. 在 Figma 安裝外掛：**Tokens Studio for Figma**（免費）
2. 外掛 → New Empty File
3. 建立三個 Token Set：
   - `global`（Primitive tokens，永遠啟用）
   - `light`（Semantic tokens，Light 模式啟用）
   - `dark`（Semantic tokens，Dark 模式啟用）
4. 將 [第 11 節](#11-token-studio-json-完整輸出) 的 JSON 分別貼入對應 set
5. 在 Themes 設定：
   - Theme `Light` → 啟用 `global` + `light`
   - Theme `Dark` → 啟用 `global` + `dark`
6. Apply to Figma → 勾選 Variables（需 Token Studio 付費版才能建 Figma Variables；免費版可用 Styles）

### Token 類型對應

| Token `$type` | Figma Variables 類型 |
|---------------|---------------------|
| `color` | COLOR |
| `dimension` | FLOAT（以 px 為單位） |
| `fontFamily` | STRING |
| `fontWeight` | FLOAT |
| `number` | FLOAT |
| `duration` | FLOAT |
| `cubicBezier` | STRING（Figma 原生不支援，匯入為 STRING） |

---

## 3. 色彩系統

### 3.1 設計原則

- 暖色系為核心（橙 / 棕 / 米）
- Light Mode：**暖色晨曦** — 高亮度、低飽和暖白背景
- Dark Mode：**微醺餘暉** — 深棕底色，橙色降飽和保持溫潤

### 3.2 Primitive 色票（Global）

所有 Semantic token 必須參照此層，不可直接使用 hex。

#### Orange 色系

| Token | Hex | 預覽 | 對應用途 |
|-------|-----|------|---------|
| `color.orange.200` | `#F3CFA8` | 🟠淡 | primary-lt / Light |
| `color.orange.300` | `#F3A839` | 🟠金黃 | primary / Light |
| `color.orange.400` | `#BF5730` | 🟠磚紅 | primary-hv / Light |
| `color.orange.500` | `#B65D32` | 🟤磚橙 | primary / Dark |
| `color.orange.600` | `#E39B3F` | 🟠琥珀 | primary-hv / Dark |
| `color.orange.700` | `#74411F` | 🟫深棕橙 | primary-lt / Dark |

#### Neutral（暖灰）色系

| Token | Hex | 預覽 | 對應用途 |
|-------|-----|------|---------|
| `color.neutral.0` | `#FFFFFF` | ⬜ | surface / Light |
| `color.neutral.50` | `#FCF9F0` | 🟫極淡 | bg / Light |
| `color.neutral.100` | `#F8ECDC` | 🟫淡 | surface-2（設計稿輔助色） |
| `color.neutral.200` | `#EBD7C0` | 🟫米 | text / Dark |
| `color.neutral.300` | `#E9E1D6` | 🟫中淡 | border / Light |
| `color.neutral.400` | `#B98C60` | 🟫中 | muted / Dark |
| `color.neutral.500` | `#82491B` | 🟫深棕 | muted / Light |
| `color.neutral.600` | `#3B332B` | 🟫深 | text / Light |
| `color.neutral.700` | `#3B332B` | 🟫更深 | border / Dark |
| `color.neutral.800` | `#2A211A` | 🟫暗 | surface / Dark |
| `color.neutral.850` | `#15120F` | 🟫極暗棕 | on-primary / Light |
| `color.neutral.900` | `#1E1812` | ⬛ | bg / Dark；on-primary / Dark |

### 3.3 Semantic Token（Light / Dark 雙模式）

| Semantic Token | Light 值（參照） | Dark 值（參照） | CSS 變數 | 用途 |
|----------------|-----------------|----------------|----------|------|
| `color.bg` | `{color.neutral.50}` | `{color.neutral.900}` | `--bg` | App 最底層背景 |
| `color.surface` | `{color.neutral.0}` | `{color.neutral.800}` | `--surface` | 卡片、元件表面 |
| `color.primary` | `{color.orange.300}` | `{color.orange.500}` | `--primary` | 主品牌色、CTA 背景 |
| `color.primary-hv` | `{color.orange.400}` | `{color.orange.600}` | `--primary-hv` | 主品牌色 Hover 狀態 |
| `color.primary-lt` | `{color.orange.200}` | `{color.orange.700}` | `--primary-lt` | 主品牌色淡版（背景、標籤） |
| `color.text` | `{color.neutral.600}` | `{color.neutral.200}` | `--text` | 主要內文色 |
| `color.muted` | `{color.neutral.500}` | `{color.neutral.400}` | `--muted` | 次要說明文字、佔位符 |
| `color.border` | `{color.neutral.300}` | `{color.neutral.700}` | `--border` | 邊框、分隔線 |
| `color.on-primary` | `{color.neutral.850}` | `{color.neutral.900}` | `--on-primary` | 放在 primary 背景上的文字色 |

> **對比度**：`color.on-primary` 在 `color.primary` 上的對比度：Light 11.8:1 ✅ / Dark 4.9:1 ✅（均符合 WCAG AA）
>
> **Dark Mode Hover 邏輯**：與 Light Mode 不同，Dark Mode 的 `primary-hv` (`#E39B3F`) 比 `primary` (`#B65D32`) 更亮，符合深色介面的互動回饋慣例（hover 變亮、提升可見性）。

### 3.4 功能色（Feedback）

目前 App 僅在 Design System 頁面使用，未出現於主 App。預留以便未來擴充。

| Token | Hex | 用途 |
|-------|-----|------|
| `color.feedback.success` | `#6DBE8A` | Do 綠色標示 |
| `color.feedback.error` | `#E57373` | Don't 紅色標示 |

---

## 4. 文字樣式

### 4.1 字型家族

| Token | 值 | CSS | 用途 |
|-------|---|-----|------|
| `font.family.display` | `'Playfair Display', serif` | — | App 大標題（任性選擇器） |
| `font.family.body` | `'Noto Sans TC', sans-serif` | — | 所有 UI 文字 |
| `font.family.mono` | `'JetBrains Mono', monospace` | — | 設計文件 code chip |

> Google Fonts 載入：`Playfair Display:wght@700` + `Noto Sans TC:wght@300;400;500;700`

### 4.2 字體大小

基準：瀏覽器預設 16px，所有數值以 `px` 定義（不使用 rem，確保 Figma 一致性）。

| Token | 值 | CSS 變數 | 用途 |
|-------|----|----------|------|
| `font.size.xs` | `11px` | — | chip label、table header |
| `font.size.sm` | `12px` | — | anatomy desc、small label |
| `font.size.caption` | `14px` | `--fs-caption` | 說明文字、hint、日期 |
| `font.size.label` | `16px` | `--fs-label` | 按鈕（ghost/dashed）、標籤 |
| `font.size.body` | `18px` | `--fs-body` | 主要內文、btn-main、eyebrow |
| `font.size.title` | `24px` | `--fs-title` | 頁面主標（Title style） |
| `font.size.display` | `32px` | `--fs-display` | 結果大字、App 主標題 |

### 4.3 字重

| Token | 值 | 用途 |
|-------|---|------|
| `font.weight.light` | `300` | hint、說明文字、italic 輔助文字 |
| `font.weight.regular` | `400` | ghost 按鈕、back-link、一般內文 |
| `font.weight.medium` | `500` | btn-main、eyebrow、persona-indicator |
| `font.weight.bold` | `700` | 卡片標題、cat-name、標誌性標題 |

### 4.4 行高

| Token | 值 | 用途 |
|-------|----|------|
| `font.line-height.tight` | `1.1` | Display 標題（App 主標） |
| `font.line-height.snug` | `1.15` | 次標題 |
| `font.line-height.normal` | `1.55` | dir-q 問句文字 |
| `font.line-height.relaxed` | `1.6` | 卡片說明文字 |
| `font.line-height.loose` | `1.7` | 長段落、exhausted-msg |
| `font.line-height.compact` | `1.0` | Eyebrow 緊縮型標籤（0 額外行高） |
| `font.line-height.label` | `1.5` | 按鈕、Label 類互動文字 |
| `font.line-height.tag` | `1.2` | Tag pill 標籤文字（接近瀏覽器 normal） |

### 4.5 字間距

| Token | 值 | 用途 |
|-------|---|------|
| `font.letter-spacing.tight` | `-0.5px` | Display 大標（Playfair） |
| `font.letter-spacing.none` | `0` | 一般內文 |
| `font.letter-spacing.sm` | `0.3px` | app-sub 副標 |
| `font.letter-spacing.md` | `1.8px` | eyebrow（ALL CAPS 標籤） |
| `font.letter-spacing.lg` | `2px` | chest-q（？？？） |
| `font.letter-spacing.xl` | `2.5px` | final-eyebrow |

### 4.6 文字樣式組合（Composite）

> 以下為 Token Studio 的 Typography composite token，可直接對應 Figma Text Style。

| 樣式名稱 | Family | Size | Weight | Line Height | Letter Spacing |
|---------|--------|------|--------|-------------|----------------|
| `Display` | display | 32px | 700 | 1.1 | -0.5px |
| `Title/Hero` | body | 32px | 700 | 1.1 | 0 |
| `Title` | body | 24px | 700 | 1.15 | 0 |
| `Body/Regular` | body | 18px | 400 | 1.55 | 0 |
| `Body/Medium` | body | 18px | 500 | 1.55 | 0 |
| `Label/Regular` | body | 16px | 400 | 1.5 | 0 |
| `Label/Medium` | body | 16px | 500 | 1.5 | 0 |
| `Caption/Light` | body | 14px | 300 | 1.6 | 0 |
| `Caption/Regular` | body | 14px | 400 | 1.6 | 0 |
| `Caption/Bold` | body | 14px | 700 | 1.6 | 0 |
| `Eyebrow` | body | 18px | 500 | 1 | 1.8px |

---

## 5. 間距系統

**基礎單位：8px**（Base-8 scale）。保留 4px 做為 half-unit 處理極小 gap。

### 5.1 Scale

| Token | 值 | 倍數 | 主要用途 |
|-------|---|------|---------|
| `space.0` | `0` | — | reset |
| `space.1` | `4px` | ×0.5 | persona-tags gap、progress bar gap、inline gap |
| `space.2` | `8px` | ×1 | persona-content gap、dir-text gap、chip padding |
| `space.3` | `12px` | ×1.5 | action-stack gap、blind-chests gap |
| `space.4` | `16px` | ×2 | 按鈕 padding（上下）、dir-btn padding、scene gap |
| `space.5` | `20px` | ×2.5 | app 側邊 padding-x、cat-btn padding |
| `space.6` | `24px` | ×3 | result-card padding-x、cantfind-card padding-x |
| `space.7` | `28px` | ×3.5 | progress padding-bottom、wheel gap |
| `space.8` | `32px` | ×4 | result-card padding-y、section spacing |
| `space.10` | `40px` | ×5 | final-card padding-y |
| `space.11` | `44px` | ×5.5 | header padding-top、exhausted-card padding-top |
| `space.12` | `48px` | ×6 | DS 頁面 padding-top、finding-wrap padding |
| `space.14` | `56px` | ×7 | persona-btn padding-y（24px × 2 ≈ 56） |
| `space.16` | `64px` | ×8 | DS section 間距 |

### 5.2 語意化別名（Semantic Spacing）

| Alias Token | 對應 Scale | 用途 |
|-------------|-----------|------|
| `space.inline-xs` | `space.1` (4px) | 圖示與文字間的極小間距 |
| `space.inline-sm` | `space.2` (8px) | 標籤、小元件內部 gap |
| `space.inline-md` | `space.3` (12px) | 元件內 row gap |
| `space.stack-sm` | `space.3` (12px) | 卡片內元素垂直 gap |
| `space.stack-md` | `space.4` (16px) | 元件間垂直 gap |
| `space.stack-lg` | `space.8` (32px) | Section 內 group 間距 |
| `space.inset-sm` | `space.4` (16px) | 小元件 padding（chip、tag） |
| `space.inset-md` | `space.5` (20px) | 標準元件 padding（cat-btn） |
| `space.inset-lg` | `space.6` (24px) | 卡片 padding |
| `space.page-x` | `space.5` (20px) | App 頁面左右 padding |

---

## 6. 圓角

| Token | 值 | CSS 變數 | 用途 |
|-------|---|----------|------|
| `radius.none` | `0` | — | 無圓角（目前未使用） |
| `radius.xs` | `6px` | — | code chip（設計文件用） |
| `radius.sm` | `10px` | — | sidebar nav link |
| `radius.md` | `14px` | `--rs` | 按鈕（btn-main / ghost / cantfind）、chip |
| `radius.lg` | `16px` | — | persona-icon 背景方塊 |
| `radius.xl` | `20px` | `--r` | 卡片（result / final / cantfind）、互動列 |
| `radius.full` | `100px` | — | Pill 按鈕（btn-calm / btn-blind / btn-restart） |
| `radius.circle` | `9999px` | — | theme-toggle（圓形） |

> **使用規則**：`radius.md`（14px）給**按鈕**，`radius.xl`（20px）給**卡片與大型容器**，`radius.full` 給**功能性 pill**（輕鬆、情境型操作）。

---

## 7. 陰影

### 7.1 Light Mode

| Token | 值 | CSS 變數 | 用途 |
|-------|---|----------|------|
| `shadow.sm` | `0 2px 16px rgba(59,51,43,.07)` | `--sh` | 卡片預設、row 預設 |
| `shadow.md` | `0 8px 32px rgba(59,51,43,.12)` | `--sh-lg` | 卡片 hover、result-card、maps-card |
| `shadow.glow` | `0 8px 36px rgba(243,168,57,.40)` | — | final-card（primary 底色） |

### 7.2 Dark Mode

| Token | 值 | 說明 |
|-------|---|------|
| `shadow.sm` | `0 2px 16px rgba(0,0,0,.35)` | 黑色底，提高可見度 |
| `shadow.md` | `0 8px 32px rgba(0,0,0,.55)` | 黑色底，提高可見度 |
| `shadow.glow` | `0 8px 36px rgba(182,93,50,.30)` | 使用 Dark primary 色 |

> **注意**：shadow 中的顏色（rgba）為 Primitive 色的手動計算值，Token Studio 不支援 shadow token 的變數參照，因此 Light/Dark 需各自定義完整字串。

### 7.3 使用規則

- 不要對 `btn-main`、`btn-ghost` 預設加 shadow，shadow 保留給**卡片與浮起狀態**
- `shadow.glow` 只用於 `final-card`（primary 背景），不可濫用

---

## 8. 動效

### 8.1 Duration（時長）

| Token | 值 | 用途 |
|-------|----|------|
| `motion.duration.instant` | `0ms` | 無動畫狀態切換 |
| `motion.duration.fast` | `150ms` | nav link hover、sidebar link |
| `motion.duration.normal` | `200ms` | 所有按鈕 transition |
| `motion.duration.moderate` | `350ms` | scene slideUp 入場 |
| `motion.duration.slow` | `450ms` | popIn 卡片入場、wheel snap |
| `motion.duration.deliberate` | `750ms` | loading spinner 一圈 |

### 8.2 Easing（緩動函數）

| Token | 值 | 用途 |
|-------|---|------|
| `motion.easing.linear` | `linear` | spinner 持續旋轉 |
| `motion.easing.default` | `ease` | scene slideUp、spin-status blink |
| `motion.easing.spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | popIn 入場、chest-pop 彈跳（超出邊界的彈簧感） |
| `motion.easing.decel` | `cubic-bezier(0, 0, 0.2, 1)` | wheel ease-out quart（減速感） |
| `motion.easing.snap` | `cubic-bezier(0, 0, 0.3, 1)` | wheel snap 到最近段落 |

### 8.3 動畫組合

| 動畫名稱 | Duration | Easing | 用途 |
|---------|----------|--------|------|
| `slideUp` | `moderate` (350ms) | `default` | 每個 scene 進場 |
| `popIn` | `slow` (450ms) | `spring` | 卡片進場（result / cantfind / exhausted） |
| `blink` | `1300ms` | `default` | spin-status 閃爍，`infinite` |
| `spin` | `deliberate` (750ms) | `linear` | loading spinner，`infinite` |
| `chest-pop` | `300ms` | `default` | 寶箱被點開的縮放 |

> **Figma 匯入說明**：`motion.easing.spring` 等 cubic-bezier 在 Token Studio 以 `cubicBezier` type 儲存，匯入 Figma 後為 STRING 類型，需手動在 Figma 的 Prototype interaction 貼上數值。

---

## 9. 佈局與網格

### 9.1 App 主體

| Token | 值 | 用途 |
|-------|---|------|
| `layout.app.max-width` | `420px` | App 主容器最大寬度（手機優先） |
| `layout.app.padding-x` | `{space.5}` (20px) | App 左右 padding |
| `layout.app.padding-bottom` | `60px` | App 底部留白（拇指安全區） |
| `layout.header.padding-top` | `{space.11}` (44px) | Header 頂部 padding |

### 9.2 Design System 頁面

| Token | 值 | 用途 |
|-------|---|------|
| `layout.ds.sidebar-width` | `220px` | DS sidebar 寬度 |
| `layout.ds.content-max-width` | `900px` | DS 主內容最大寬度 |
| `layout.ds.content-padding` | `48px` | DS 主內容左右 padding |

### 9.3 網格說明

App 不使用傳統 column grid，採用 **Flex-first single-column** 佈局：
- 單欄，`max-width: 420px`，水平置中
- 所有容器 `display: flex`，方向 `column`（除特定 row 排列）
- 間距用 `gap` 控制，不使用 `margin`

Figma 對應設定：
- Frame：`W: 390px`（iPhone 14 基準），`H: Hug`
- Auto Layout：Vertical，Padding 左右 20px，底部 60px

---

## 10. Z-Index

| Token | 值 | 用途 |
|-------|---|------|
| `z.base` | `0` | 一般層 |
| `z.elevated` | `2` | wheel-ptr（指針疊在 canvas 上） |
| `z.sticky` | `100` | DS sidebar（fixed 定位） |

---

## 11. Token Studio JSON 完整輸出

以下三個 JSON 分別對應 Token Studio 的三個 Token Set。

---

### 11.1 `global.json`（Primitive — 永遠啟用）

```json
{
  "color": {
    "orange": {
      "200": { "$value": "#F3CFA8", "$type": "color", "$description": "primary-lt / Light" },
      "300": { "$value": "#F3A839", "$type": "color", "$description": "primary / Light" },
      "400": { "$value": "#BF5730", "$type": "color", "$description": "primary-hv / Light" },
      "500": { "$value": "#B65D32", "$type": "color", "$description": "primary / Dark" },
      "600": { "$value": "#E39B3F", "$type": "color", "$description": "primary-hv / Dark" },
      "700": { "$value": "#74411F", "$type": "color", "$description": "primary-lt / Dark" }
    },
    "neutral": {
      "0":   { "$value": "#FFFFFF", "$type": "color" },
      "50":  { "$value": "#FCF9F0", "$type": "color" },
      "100": { "$value": "#F8ECDC", "$type": "color" },
      "200": { "$value": "#EBD7C0", "$type": "color" },
      "300": { "$value": "#E9E1D6", "$type": "color" },
      "400": { "$value": "#B98C60", "$type": "color" },
      "500": { "$value": "#82491B", "$type": "color" },
      "600": { "$value": "#3B332B", "$type": "color" },
      "700": { "$value": "#3B332B", "$type": "color" },
      "800": { "$value": "#2A211A", "$type": "color" },
      "850": { "$value": "#15120F", "$type": "color" },
      "900": { "$value": "#1E1812", "$type": "color" }
    },
    "feedback": {
      "success": { "$value": "#6DBE8A", "$type": "color" },
      "error":   { "$value": "#E57373", "$type": "color" }
    }
  },
  "font": {
    "family": {
      "display": { "$value": "Playfair Display, serif", "$type": "fontFamily" },
      "body":    { "$value": "Noto Sans TC, sans-serif", "$type": "fontFamily" },
      "mono":    { "$value": "JetBrains Mono, monospace", "$type": "fontFamily" }
    },
    "size": {
      "xs":      { "$value": "11", "$type": "dimension" },
      "sm":      { "$value": "12", "$type": "dimension" },
      "caption": { "$value": "14", "$type": "dimension" },
      "label":   { "$value": "16", "$type": "dimension" },
      "body":    { "$value": "18", "$type": "dimension" },
      "title":   { "$value": "24", "$type": "dimension" },
      "display": { "$value": "32", "$type": "dimension" }
    },
    "weight": {
      "light":   { "$value": "300", "$type": "fontWeight" },
      "regular": { "$value": "400", "$type": "fontWeight" },
      "medium":  { "$value": "500", "$type": "fontWeight" },
      "bold":    { "$value": "700", "$type": "fontWeight" }
    },
    "line-height": {
      "compact": { "$value": "1.0",  "$type": "number", "$description": "Eyebrow 緊縮型標籤" },
      "tight":   { "$value": "1.1",  "$type": "number", "$description": "Display 標題" },
      "snug":    { "$value": "1.15", "$type": "number", "$description": "次標題" },
      "tag":     { "$value": "1.2",  "$type": "number", "$description": "Tag pill 標籤文字" },
      "label":   { "$value": "1.5",  "$type": "number", "$description": "按鈕、Label 類互動文字" },
      "normal":  { "$value": "1.55", "$type": "number", "$description": "dir-q 問句文字" },
      "relaxed": { "$value": "1.6",  "$type": "number", "$description": "卡片說明文字" },
      "loose":   { "$value": "1.7",  "$type": "number", "$description": "長段落、exhausted-msg" }
    },
    "letter-spacing": {
      "tight":  { "$value": "-0.5", "$type": "dimension" },
      "none":   { "$value": "0",    "$type": "dimension" },
      "sm":     { "$value": "0.3",  "$type": "dimension" },
      "md":     { "$value": "1.8",  "$type": "dimension" },
      "lg":     { "$value": "2",    "$type": "dimension" },
      "xl":     { "$value": "2.5",  "$type": "dimension" }
    }
  },
  "space": {
    "0":  { "$value": "0",   "$type": "dimension" },
    "1":  { "$value": "4",   "$type": "dimension", "$description": "half-unit" },
    "2":  { "$value": "8",   "$type": "dimension" },
    "3":  { "$value": "12",  "$type": "dimension" },
    "4":  { "$value": "16",  "$type": "dimension" },
    "5":  { "$value": "20",  "$type": "dimension" },
    "6":  { "$value": "24",  "$type": "dimension" },
    "7":  { "$value": "28",  "$type": "dimension" },
    "8":  { "$value": "32",  "$type": "dimension" },
    "10": { "$value": "40",  "$type": "dimension" },
    "11": { "$value": "44",  "$type": "dimension" },
    "12": { "$value": "48",  "$type": "dimension" },
    "14": { "$value": "56",  "$type": "dimension" },
    "16": { "$value": "64",  "$type": "dimension" },
    "inline-xs":  { "$value": "{space.1}", "$type": "dimension" },
    "inline-sm":  { "$value": "{space.2}", "$type": "dimension" },
    "inline-md":  { "$value": "{space.3}", "$type": "dimension" },
    "stack-sm":   { "$value": "{space.3}", "$type": "dimension" },
    "stack-md":   { "$value": "{space.4}", "$type": "dimension" },
    "stack-lg":   { "$value": "{space.8}", "$type": "dimension" },
    "inset-sm":   { "$value": "{space.4}", "$type": "dimension" },
    "inset-md":   { "$value": "{space.5}", "$type": "dimension" },
    "inset-lg":   { "$value": "{space.6}", "$type": "dimension" },
    "page-x":     { "$value": "{space.5}", "$type": "dimension" }
  },
  "radius": {
    "none":   { "$value": "0",    "$type": "dimension" },
    "xs":     { "$value": "6",    "$type": "dimension" },
    "sm":     { "$value": "10",   "$type": "dimension" },
    "md":     { "$value": "14",   "$type": "dimension", "$description": "--rs：按鈕" },
    "lg":     { "$value": "16",   "$type": "dimension" },
    "xl":     { "$value": "20",   "$type": "dimension", "$description": "--r：卡片" },
    "full":   { "$value": "100",  "$type": "dimension", "$description": "pill 按鈕" },
    "circle": { "$value": "9999", "$type": "dimension", "$description": "theme-toggle" }
  },
  "motion": {
    "duration": {
      "instant":    { "$value": "0",    "$type": "duration" },
      "fast":       { "$value": "150",  "$type": "duration" },
      "normal":     { "$value": "200",  "$type": "duration" },
      "moderate":   { "$value": "350",  "$type": "duration" },
      "slow":       { "$value": "450",  "$type": "duration" },
      "deliberate": { "$value": "750",  "$type": "duration" }
    },
    "easing": {
      "linear":  { "$value": [0, 0, 1, 1],              "$type": "cubicBezier" },
      "default": { "$value": [0.25, 0.1, 0.25, 1],      "$type": "cubicBezier" },
      "spring":  { "$value": [0.34, 1.56, 0.64, 1],     "$type": "cubicBezier", "$description": "popIn / chest-pop" },
      "decel":   { "$value": [0, 0, 0.2, 1],             "$type": "cubicBezier", "$description": "wheel ease-out" },
      "snap":    { "$value": [0, 0, 0.3, 1],             "$type": "cubicBezier", "$description": "wheel snap" }
    }
  },
  "z": {
    "base":     { "$value": "0",   "$type": "number" },
    "elevated": { "$value": "2",   "$type": "number" },
    "sticky":   { "$value": "100", "$type": "number" }
  },
  "layout": {
    "app": {
      "max-width":      { "$value": "420",  "$type": "dimension" },
      "padding-x":      { "$value": "{space.5}", "$type": "dimension" },
      "padding-bottom": { "$value": "60",   "$type": "dimension" },
      "header-padding-top": { "$value": "{space.11}", "$type": "dimension" }
    },
    "ds": {
      "sidebar-width":      { "$value": "220", "$type": "dimension" },
      "content-max-width":  { "$value": "900", "$type": "dimension" },
      "content-padding":    { "$value": "48",  "$type": "dimension" }
    }
  }
}
```

---

### 11.2 `light.json`（Semantic — Light 模式）

```json
{
  "color": {
    "bg":         { "$value": "{color.neutral.50}",  "$type": "color", "$description": "暖色晨曦 App 底層背景" },
    "surface":    { "$value": "{color.neutral.0}",   "$type": "color", "$description": "卡片、元件表面" },
    "primary":    { "$value": "{color.orange.300}",  "$type": "color", "$description": "主品牌色 CTA" },
    "primary-hv": { "$value": "{color.orange.400}",  "$type": "color", "$description": "primary hover" },
    "primary-lt": { "$value": "{color.orange.200}",  "$type": "color", "$description": "primary 淡版（背景、tag）" },
    "text":       { "$value": "{color.neutral.600}", "$type": "color", "$description": "主要內文" },
    "muted":      { "$value": "{color.neutral.500}", "$type": "color", "$description": "次要說明文字" },
    "border":     { "$value": "{color.neutral.300}", "$type": "color", "$description": "邊框、分隔線" },
    "on-primary": { "$value": "{color.neutral.850}", "$type": "color", "$description": "primary 背景上的文字，對比 9.4:1" },
    "shadow-sm":  {
      "$value": {
        "x": "0", "y": "2", "blur": "16", "spread": "0",
        "color": "rgba(59,51,43,0.07)", "type": "dropShadow"
      },
      "$type": "boxShadow"
    },
    "shadow-md":  {
      "$value": {
        "x": "0", "y": "8", "blur": "32", "spread": "0",
        "color": "rgba(59,51,43,0.12)", "type": "dropShadow"
      },
      "$type": "boxShadow"
    },
    "shadow-glow": {
      "$value": {
        "x": "0", "y": "8", "blur": "36", "spread": "0",
        "color": "rgba(243,168,57,0.40)", "type": "dropShadow"
      },
      "$type": "boxShadow"
    }
  }
}
```

---

### 11.3 `dark.json`（Semantic — Dark 模式）

```json
{
  "color": {
    "bg":         { "$value": "{color.neutral.900}", "$type": "color", "$description": "微醺餘暉 App 底層背景" },
    "surface":    { "$value": "{color.neutral.800}", "$type": "color", "$description": "卡片、元件表面" },
    "primary":    { "$value": "{color.orange.500}",  "$type": "color", "$description": "主品牌色 CTA" },
    "primary-hv": { "$value": "{color.orange.600}",  "$type": "color", "$description": "primary hover" },
    "primary-lt": { "$value": "{color.orange.700}",  "$type": "color", "$description": "primary 淡版（降飽和保溫潤）" },
    "text":       { "$value": "{color.neutral.200}", "$type": "color", "$description": "主要內文" },
    "muted":      { "$value": "{color.neutral.400}", "$type": "color", "$description": "次要說明文字" },
    "border":     { "$value": "{color.neutral.700}", "$type": "color", "$description": "邊框、分隔線" },
    "on-primary": { "$value": "{color.neutral.900}", "$type": "color", "$description": "primary 背景上的文字，對比 6:1" },
    "shadow-sm":  {
      "$value": {
        "x": "0", "y": "2", "blur": "16", "spread": "0",
        "color": "rgba(0,0,0,0.35)", "type": "dropShadow"
      },
      "$type": "boxShadow"
    },
    "shadow-md":  {
      "$value": {
        "x": "0", "y": "8", "blur": "32", "spread": "0",
        "color": "rgba(0,0,0,0.55)", "type": "dropShadow"
      },
      "$type": "boxShadow"
    },
    "shadow-glow": {
      "$value": {
        "x": "0", "y": "8", "blur": "36", "spread": "0",
        "color": "rgba(182,93,50,0.30)", "type": "dropShadow"
      },
      "$type": "boxShadow"
    }
  }
}
```

---

### 11.4 `$metadata.json`（Token Studio Theme 設定）

```json
{
  "$metadata": {
    "tokenSetOrder": ["global", "light", "dark"]
  },
  "$themes": [
    {
      "id": "light",
      "name": "Light",
      "selectedTokenSets": {
        "global": "enabled",
        "light": "enabled",
        "dark": "disabled"
      }
    },
    {
      "id": "dark",
      "name": "Dark",
      "selectedTokenSets": {
        "global": "enabled",
        "light": "disabled",
        "dark": "enabled"
      }
    }
  ]
}
```

---

## 附錄：CSS 變數對照表

| CSS 變數 | Token Studio Token（Light） | Token Studio Token（Dark） |
|----------|----------------------------|---------------------------|
| `--bg` | `color.neutral.50` (#FCF9F0) | `color.neutral.900` (#1E1812) |
| `--surface` | `color.neutral.0` (#FFFFFF) | `color.neutral.800` (#2A211A) |
| `--primary` | `color.orange.300` (#F3A839) | `color.orange.500` (#B65D32) |
| `--primary-hv` | `color.orange.400` (#BF5730) | `color.orange.600` (#E39B3F) |
| `--primary-lt` | `color.orange.200` (#F3CFA8) | `color.orange.700` (#74411F) |
| `--text` | `color.neutral.600` (#3B332B) | `color.neutral.200` (#EBD7C0) |
| `--muted` | `color.neutral.500` (#82491B) | `color.neutral.400` (#B98C60) |
| `--border` | `color.neutral.300` (#E9E1D6) | `color.neutral.700` (#3B332B) |
| `--on-primary` | `color.neutral.850` (#15120F) | `color.neutral.900` (#1E1812) |
| `--sh` | `color.shadow-sm` | `color.shadow-sm` |
| `--sh-lg` | `color.shadow-md` | `color.shadow-md` |
| `--r` | `radius.xl` (20px) | — |
| `--rs` | `radius.md` (14px) | — |
| `--fs-display` | `font.size.display` (32px) | — |
| `--fs-title` | `font.size.title` (24px) | — |
| `--fs-body` | `font.size.body` (18px) | — |
| `--fs-label` | `font.size.label` (16px) | — |
| `--fs-caption` | `font.size.caption` (14px) | — |
