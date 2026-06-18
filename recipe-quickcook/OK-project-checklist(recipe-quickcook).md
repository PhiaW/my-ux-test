# New Project Checklist
2026.6.12 檢視已跑完phase1~phase6，這份檔案可做為備份不更新。

新案子開工時照這份走。每個步驟完成後打勾。
完整 token 結構在 `tokens/`；AI 指令書在 `design-system.md`。

---

## Phase 1 — 品牌設定（開工前，約 30 分鐘）

### 1. 複製 Brand Token 檔
```
tokens/brand-template.json → 複製並重新命名為 tokens/brand-[案名].json
```

### 2. 填入色彩
- [ ] `color.primary.500`（主色基準）
- [ ] `color.primary.50 / 100 / 600 / 700`（淺色背景、Hover、Active）
- [ ] `color.primary.200 / 300 / 400 / 800 / 900`（完整色階，可用工具生成）
- [ ] `color.neutral`（完整灰階，50–950）
- [ ] `color.secondary`（若有輔色）
- [ ] `color.semantic`（成功/警告/錯誤/資訊 — 可沿用預設值）

> 工具推薦：[Tailwind Shades](https://www.tailwindshades.com/)、[Radix Colors](https://www.radix-ui.com/colors)

### 3. 填入字體
- [ ] `typography.fontFamily.display`（標題字體，避免 Inter/Roboto/Arial）
- [ ] `typography.fontFamily.body`（內文字體，中文用 Noto Sans TC 或  "Microsoft JhengHei", "蘋方體"；英文用"Helvetica Neue", Arial, sans-serif;）

--備註:
--現代主流：思源黑體 (Noto Sans) 優先
font-family: "Noto Sans TC", "Microsoft JhengHei", "蘋方體", "PingFang TC", "Helvetica Neue", Arial, sans-serif;
--Apple 裝置愛用：蘋方 (PingFang) 優先
font-family: "PingFang TC", "蘋方體", "Microsoft JhengHei", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif;
--Windows 電腦通用：微軟正黑體 (Microsoft JhengHei)
font-family: "Microsoft JhengHei", "Noto Sans TC", "PingFang TC", "蘋方體", "Helvetica Neue", Arial, sans-serif;




### 4. 確認語義對映
- [ ] 打開 `tokens/semantics-template.json`
- [ ] 確認 `interactive.primary.*` 對映到正確的 primary 色階
- [ ] 如有特殊品牌要求（如政府案主色改用 navy），調整對映

---

## Phase 2 — Design Principles（開工前，約 20 分鐘）

- [ ] 打開 `design-principles-template.md`
- [ ] 把客戶資料填入「Prompt 模板」區塊
- [ ] 把 prompt 貼給 AI，取得 5 條 Principles 初稿
- [ ] 根據你對客戶的判斷調整初稿
- [ ] 把最終 5 條填入 `design-system.md` → Section 0

---

## Phase 3 — Design System 設定（開工前，約 10 分鐘）

- [ ] 打開 `design-system.md` → Section 0
- [ ] 填入專案名稱、平台、主要功能
- [ ] 把 Phase 1 的 token 值填入 Section 0 的色彩欄位
- [ ] 把 Phase 2 的 Principles 填入 Section 0
- [ ] 依案子調性選圓角方案（Section 1 有三組可選）

---

## Phase 4 — Vibecoding（原型生成）

- [ ] 打開 `design-system.md` → Section 5
- [ ] 把 Section 0 的值全部填入 prompt
- [ ] 把整段 prompt 貼為 vibecoding 工具的 system prompt
- [ ] 第一則訊息：「請先列出此專案的頁面清單，每頁說明主要功能」
- [ ] 每完成一個區塊，就對照 `design-system.md` Section 2 的元件規格，檢查 token 是否正確套用（顏色、間距、圓角不得 hardcode）

---

## Phase 5 — Figma 美化（分 5A 建系統 / 5B 美化畫面）

> **重點**：元件 ≠ 畫面。5A 只建出零散元件庫；真正的「美化」發生在 5B 的**完整畫面**上
> （間距節奏、區塊層次、留白、視覺重心、跨元件對齊），且必須**回灌原型**，
> 否則 Phase 6 沒有「真正的成品」可對照。只做 5A 等於 Phase 5 只完成一半。

### 5A. 設計系統建置（元件庫）

- [ ] 在 Figma 建立 Local Variables（對應 brand token 的色彩值）
- [ ] 建立核心元件（依本案實際元件，如 Button / Chip / Card…），綁定 Variables
- [ ] 以 `design-system.md` Section 2 的規格為準逐一校對元件狀態
- [ ] 稽核：token 綁定完整 / 無障礙（對比·觸控≥44·focus）/ 命名無重複與預設名

### 5B. 畫面組裝與美感調整（成品頁 — 「美化」核心）

- [ ] 從 vibecoding 原型挑定關鍵畫面（如首頁、詳情頁）匯入 Figma
- [ ] 在 Figma **只用 5A 的元件與 token** 拼出完整畫面（不脫離設計系統）
- [ ] 做畫面級美感調整：間距節奏、區塊層次、留白、視覺重心、跨元件對齊
- [ ] 確認未破壞系統（無脫離 token 的硬值、無一次性元件）
- [ ] **以 Figma 美化後的畫面為基底，將視覺調整倒回 vibecoding 原型**（程式碼對齊）
- [ ] Figma 畫面 vs 原型並列截圖，確認一致後才進 Phase 6

---

## Phase 6 — 文件定稿

> **初稿在前、定稿在後**：Phase 2 完成的是 Principles 初稿，Phase 6 才是正式定稿。
> 此時畫面與元件已成形，回頭用實際產出來檢驗原則的合理性。
> **對照對象＝ Phase 5B 美化並回灌後的成品，而非粗胚原型。**

- [x] 重新閱讀 Phase 2 訂下的 5 條 Design Principles
- [x] 逐條對照已完成的畫面與元件，確認每條原則在視覺上確實有所體現（5 條全體現，見下方定稿結論）
- [x] 若某條原則在實作中從未被引用，評估是否刪除或合併（無冗餘，5 條全保留）
- [x] 若實作中出現未被 Principles 涵蓋的重要決策，補充為新原則（修正 P2 觸控 48→44、P3 補淺綠框分組容器例外）
- [x] 定稿後更新 `design-system.md` Section 0 的 Principles 欄位
- [x] 撰寫一份 1–2 頁的簡短設計摘要（見 `design-summary.md`）

### Phase 6 定稿結論（2026-06-04）

| 原則 | 成品體現 | 定稿動作 |
|------|----------|----------|
| 1 一眼可下手 | 首頁雙模式、食材勾選→燈號排序（可做優先） | 保留 |
| 2 濕手也能操作 | Filter Tab/Button ≥44、計時數字 24px | **改 48→44**（對齊 WCAG AA 與 a11y 稽核）|
| 3 留白即精緻 | 無彩暖灰主體、accent 點睛、Playfair 標題 | **補例外**：極淺 primary-lt 可作分組容器底色（食材清單淺綠框）|
| 4 備料安心 | safetyNotes 紅框 role=alert、error-strong 對比、計時倒數 | 保留 |
| 5 這不是食譜社群 | 無帳號/探索流/廣告、靜態資料、YT 外跳 | 保留 |

---

## 哪些檔案不能動

| 檔案 | 說明 |
|------|------|
| `tokens/base.json` | spacing / radius / shadow — 各案通用，不動 |
| `design-system.md` Section 2–4 | 元件規格和 Coding Rules — 只在有意圖更新規格時改動 |
