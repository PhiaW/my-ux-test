# 食譜批次匯入工具

YouTube 影片 → 文字 → AI 結構化 → 驗證 → 貼進 `data/recipes.sample.js`。

## 一次性安裝 yt-dlp（Windows）

擇一：

```powershell
winget install yt-dlp.yt-dlp
# 或
scoop install yt-dlp
```

裝完開新終端機，確認 `yt-dlp --version` 有版本號。

## 流程

### ① 填連結

把要抓的 YouTube 連結貼進 `scripts/urls.txt`（一行一個，`#` 開頭為註解）。

### ② 抓字幕 + 描述

在 `recipe-quickcook` 目錄執行：

```bash
node scripts/fetch-recipes.mjs
```

產出：
- `scripts/raw/<videoId>.txt` — 每支影片的標題 / 描述 / 逐字稿
- `scripts/prompt-batch.txt` — 直接貼給 AI 的完整 prompt（已內嵌標準名清單 + schema）

### ③ AI 結構化

把 `scripts/prompt-batch.txt` 全文貼進這個對話，AI 會回傳符合 schema 的 JS 物件，
並在最後列出「需新增到 ingredients.js 的食材」。

### ④ 驗證

先把 AI 產出的 `RECIPES` 暫存成 `scripts/recipes.new.js`（`export const RECIPES = [...]`），再跑：

```bash
node scripts/validate-recipes.mjs ./scripts/recipes.new.js
```

會檢查：欄位齊全、core 不含調味料、食材皆在主檔、replaceable/seasonings/quantities 正確、
steps 有 prep/cook。並列出要補進 `ingredients.js` 的食材。

### ⑤ 校對 → 併入

- 依驗證結果補 `data/ingredients.js`（新食材的標準名 + 別名 + 分類）。
- **人工校對份量與步驟**（自動字幕最常漏份量），再把物件貼進 `data/recipes.sample.js` 的 `RECIPES`。

## 注意

- 自動字幕會有錯字、漏份量 → 描述欄通常更可靠，份量務必人工確認。
- 個人小量使用；勿大規模抓取或公開散布字幕（YT ToS + 字幕著作權）。`sourceUrl` 連回原片尊重原作者。
- `scripts/raw/` 與 `prompt-batch.txt` 為中間產物，可不進版控（見 .gitignore）。
