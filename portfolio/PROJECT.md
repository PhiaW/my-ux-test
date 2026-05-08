# Portfolio — 個人作品集網站

UI Designer × UX Research × System Analysis  
以極簡架構為基礎，視覺美感與邏輯思維並重。

---

## 專案概覽

| 項目 | 內容 |
|------|------|
| **定位** | 個人作品集，展示 UI 設計、UX 研究與系統分析能力 |
| **技術棧** | React 19 · Vite 8 · Tailwind CSS 3 |
| **字體** | DM Sans（英文 Display/Heading）· Noto Sans TC（中英 Body）|
| **強調色** | Apple Green — Accent-500 `#6BBF59` / Accent-700 `#2D7A28` |
| **無障礙標準** | WCAG 2.1 AA（所有互動元素對比度 ≥ 4.5:1）|

---

## 快速啟動

```bash
cd design
npm install
npm run dev      # http://localhost:5173
npm run build    # 輸出至 dist/
npm run preview  # 預覽 production build
```

---

## 目錄結構

```
design/
├── src/
│   ├── design-system/
│   │   └── DesignSystem.jsx      # Token + 基礎元件（Button, Badge, Card）+ 展示頁
│   ├── components/
│   │   ├── Navbar.jsx            # 頂部導航（Email Copy / Works / About）
│   │   ├── HeroSection.jsx       # 首頁 Hero 區塊
│   │   ├── BackButton.jsx        # 共用返回按鈕元件
│   │   └── CaseStudy.jsx         # 萬用案例模組（含 mock data）
│   ├── pages/
│   │   ├── HomePage.jsx          # 浮動卡片首頁
│   │   ├── WorkListPage.jsx      # 作品列表（篩選 + ProjectCard）
│   │   ├── CaseStudyPage.jsx     # 案例頁容器（useParams）
│   │   ├── AboutPage.jsx         # 關於我（Bio / Skills / Experience）
│   │   └── NotFoundPage.jsx      # 404 頁面
│   ├── router/
│   │   ├── paths.js              # ROUTES 常數（純 JS，無 JSX）
│   │   └── routes.jsx            # routeConfig 陣列（JSX element）
│   ├── App.jsx                   # Routes 根
│   ├── index.css                 # Tailwind 指令 + heroFadeUp keyframes
│   └── main.jsx                  # BrowserRouter + React root
├── tailwind.config.js            # 自訂 Token（色彩、字族）
├── vite.config.js
└── PROJECT.md                    # 本文件
```

---

## 路由地圖

| Path | Page | 說明 |
|------|------|------|
| `/` | HomePage | 浮動卡片首頁 + Hero |
| `/work` | WorkListPage | 作品列表，支援 Tag 篩選 |
| `/work/:id` | CaseStudyPage | 個別案例頁，id 對應專案資料 |
| `/about` | AboutPage | 個人簡介、技能、工作歷程 |
| `/design-system` | DesignSystemPage | 設計系統展示頁（開發參考用）|
| `*` | NotFoundPage | 404 |

> `paths.js` 集中管理所有路徑常數，避免字串散落各處。  
> `routes.jsx` 中有 JSX，與 `paths.js` 分離是為了防止循環 import。

---

## 設計系統速查

### 色彩

| Token | Hex | 用途 |
|-------|-----|------|
| `accent-500` | `#6BBF59` | Active badge、視覺裝飾 |
| `accent-700` | `#2D7A28` | Button Accent、強調文字 |
| `neutral-900` | `#111110` | 標題、主要文字 |
| `neutral-600` | `#555553` | Body 主要文字 |
| `neutral-500` | `#757572` | Body 次要文字 |
| `neutral-400` | `#9A9A96` | Placeholder、Caption |
| `neutral-200` | `#E2E2DF` | Border、分隔線 |
| `neutral-100` | `#F0F0EE` | Subtle 背景 |
| `neutral-50` | `#FAFAF8` | 頁面背景 |

### 字級尺度（已統一）

| 用途 | px | Tailwind class |
|------|----|----------------|
| Display | 56px | `text-[56px]` |
| H1 | 40px | `text-[40px]` |
| H2 / Section | 32px | `text-[32px]` |
| H3 | 24px | `text-[24px]` |
| H4 / Subtitle | 20px | `text-xl` |
| Body Lg | 18px | `text-lg` |
| Body | 16px | `text-base` |
| Body Sm / Label | 14px | `text-sm` |
| Caption | 12px | `text-xs` |
| Micro | 10px | `text-[10px]` |

> 裝飾性數字（100px / 140px）不納入正式尺度。

### Border Radius

| Token | Value | Tailwind | 用途 |
|-------|-------|----------|------|
| `sm` | 12px | `rounded-xl` | 色彩色塊、小型裝飾 |
| `md` | 16px | `rounded-2xl` | 內容卡片、技能分組 |
| `lg` | 32px | `rounded-[32px]` | 頁面容器浮動卡片 |
| `full` | 9999px | `rounded-full` | Button、Badge、Avatar、Pill |

### Shadows

| Token | 用途 |
|-------|------|
| `sm` `0 2px 8px rgba(0,0,0,0.06)` | Hover 微陰影 |
| `md` `0 4px 24px rgba(0,0,0,0.08)` | Card Hover 狀態 |
| `lg` `0 8px 48px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)` | 頁面浮動卡片 |

### Button Variants

| Variant | 外觀 | 適用情境 |
|---------|------|---------|
| `primary` | 黑底白字 | 主要 CTA |
| `accent` | Accent-700 綠底白字 | 次主要 CTA、強調行動 |
| `secondary` | 黑框透明 | 次要操作 |
| `ghost` | 無框、綠字 | 低強調操作 |
| `outline` | 綠框、綠字 | 標籤類操作 |

Button sizes：`sm`（h-10）· `md`（h-12）· `lg`（h-14）

### Badge Variants

`active` · `accent` · `dark` · `outline` · `default`

### Card Variants

| Variant | 樣式 | 適用情境 |
|---------|------|---------|
| `default` | `bg-white + border` | 一般內容卡片（WorkListPage ProjectCard）|
| `elevated` | `bg-white + shadow-md` | 浮起感卡片（Featured 項目）|
| `tinted` | `bg-neutral-50 + border` | 技能分組、次要區塊 |
| Page Container | `rounded-[32px] + shadow-lg` | 頁面容器（非 Card 元件，直接用 className）|

---

## CaseStudy 模組使用方式

`CaseStudy.jsx` 匯出一個接受 `project` prop 的元件，不傳入時使用內建 mock data。

```jsx
import CaseStudy from './components/CaseStudy.jsx'

// 使用 mock data 預覽
<CaseStudy />

// 傳入真實資料
<CaseStudy project={myProject} />
```

### `project` 資料結構

```js
{
  index: '01',                  // 頁面裝飾編號
  status: 'Shipped',            // 'Shipped' | 'In Progress' | 'Concept'
  title: '專案英文名',
  titleSub: '專案中文副標',
  problem: '一句話定義核心問題',
  role: 'UX Designer · System Analyst',
  tools: ['Figma', 'React'],
  duration: '2024.03 — 2024.06',

  context: {
    background: '背景描述...',
    painPoints: ['痛點一', '痛點二'],
  },

  userFlow: [
    {
      step: '01',
      actor: 'PM',
      action: '動作描述',
      condition: '判斷條件？',
      branchA: '✓ 結果 A',
      branchB: '✗ 結果 B',
    },
  ],

  gallery: [
    { label: 'Dashboard', src: null, caption: '圖說文字' },
  ],

  designSystem: {
    colors:     [{ name, hex, usage }],
    fonts:      [{ name, weight, usage }],
    components: [{ name, variants, note }],
  },
}
```

---

## 待辦與開發路徑

### 近期

- [x] 接入 React Router（`/`、`/work`、`/work/:id`、`/about`、`/design-system`）
- [x] 設計系統展示頁（`/design-system`）加入 Border Radius / Shadows / Cards / Navigation
- [ ] Hero 頭像改為真實照片（替換 `JW` 文字佔位）
- [ ] 建立 `src/data/projects.js`，讓 CaseStudyPage 依 id 查找真實資料

### 中期

- [ ] 建立第一個真實案例，替換 CaseStudy mock data
- [ ] IA 佔位區接入真實架構圖（建議 SVG 或 Figma embed）
- [ ] Visual Gallery 接入真實截圖
- [ ] WorkListPage ProjectCard 縮圖接入真實圖片

### 長期

- [ ] 深色模式（Dark Mode）支援
- [ ] 多語系切換（繁中 / English）
- [ ] OG 圖片設定，利於社群分享

---

## 開發注意事項

**字級**  
全站字級已統一至 10 個尺度，新增元件請嚴格對照「字級尺度」表，禁止使用 9px、11px、15px 等非正式尺度。

**間距**  
以 `gap` 取代所有 `margin`，容器一律 `flex flex-col` 或 `flex flex-row`，不在 flex 父層內使用 `absolute`（例外：純裝飾元素）。

**新增元件**  
基礎元件（Button、Badge、Card）統一從 `design-system/DesignSystem.jsx` 匯入，不要在頁面層重複定義樣式。

**Accessibility**  
互動元素須保留 `focus-visible:ring-*`，不可移除。圖片須提供 `alt`，裝飾性元素加 `aria-hidden="true"`。

**路由**  
新增頁面時，先在 `paths.js` 加入 ROUTES 常數，再到 `routes.jsx` 加入 route entry，最後建立對應 page 檔案。
