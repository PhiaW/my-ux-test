# CLAUDE.md（my-ux-test）

> 本 repo 為 UI/UX 設計師的 **code ↔ Figma ↔ code** 測試沙盒。各子資料夾為**獨立實驗**，彼此不互通。
>
> **通用偏好（語言、溝通／工作風格、套件管理、命名慣例、Figma↔Code 工作流、Figma MCP 省 token 規範）放在全域 `~/.claude/CLAUDE.md`，每個 session 自動載入——本檔只放「此 repo 專屬」與「設計系統政策（Coding Rules）」，不重複全域內容。**

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

## UI 實作（單一來源）

- 開發 HTML/CSS/Vue 原型時，優先查**該案目錄**下的 `design-system.md` 與 `tokens/`
- **與本檔衝突時，以該案的 `design-system.md`（含 Section 0 token、Section 4 狀態表）為準**
- 新案可從 `ds-template/execution/` 複製模板；開案後將 `design-system.md` Section 5 貼給 AI（僅含該案 token，不含重複 Coding Rules）

## Coding Rules（AI 必須遵守 — 全 repo 唯一完整版）

> 跨專案唯一正本在全域 `~/.claude/rules/coding-rules.md`，下方以 @import 帶入（改一處，my-ux-test／ux-workflow 兩 repo 同步；隨 `~/.claude/rules/` 一起遷移換機）。首次在此 repo 開 Claude Code 會跳一次「外部 import 核准框」，按核准即可。

@~/.claude/rules/coding-rules.md
