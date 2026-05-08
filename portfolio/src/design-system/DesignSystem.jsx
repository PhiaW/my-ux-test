import React from 'react'
import { Link } from 'react-router-dom'

// ============================================================
// COLOR TOKENS
// ============================================================
export const colorTokens = {
  accent: {
    50:  '#F4FCF2',
    100: '#E6F7E3',
    200: '#C8EDBE',
    300: '#A2E08F',
    400: '#7ECF6C',
    500: '#6BBF59',  // Main: Apple Green
    600: '#4E9E3D',  // Hover on accent bg
    700: '#2D7A28',  // Text on white  — contrast ~5.2:1 ✓ AA
    800: '#1C5C19',
    900: '#0E3D0C',
  },
  neutral: {
    0:   '#FFFFFF',
    50:  '#FAFAF8',  // Page background
    100: '#F0F0EE',  // Subtle bg
    200: '#E2E2DF',  // Border light
    300: '#C4C4C0',  // Border default
    400: '#9A9A96',  // Placeholder / caption
    500: '#757572',  // Body secondary
    600: '#555553',  // Body primary
    700: '#3D3D3B',
    800: '#222220',
    900: '#111110',  // Near black — 18:1 on white ✓ AAA
  },
}

// ============================================================
// SPACING TOKENS
// ============================================================
export const spacingTokens = {
  xs:   '4px',
  sm:   '8px',
  md:   '16px',
  lg:   '24px',
  xl:   '40px',
  '2xl': '64px',
  '3xl': '96px',
  '4xl': '128px',
}

// ============================================================
// BORDER RADIUS TOKENS
// ============================================================
export const borderRadiusTokens = {
  sm:   { value: '12px',  tailwind: 'rounded-xl',     usage: 'Color swatch、小型裝飾元素' },
  md:   { value: '16px',  tailwind: 'rounded-2xl',    usage: 'Card、Skill 分組、技能區塊' },
  lg:   { value: '32px',  tailwind: 'rounded-[32px]', usage: '頁面容器浮動卡片' },
  full: { value: '9999px', tailwind: 'rounded-full',  usage: 'Button、Badge、Avatar、Pill' },
}

// ============================================================
// SHADOW TOKENS
// ============================================================
export const shadowTokens = {
  sm: {
    value:   '0 2px 8px rgba(0,0,0,0.06)',
    css:     '0_2px_8px_rgba(0,0,0,0.06)',
    usage:   'Hover 微陰影、輕量浮動',
  },
  md: {
    value:   '0 4px 24px rgba(0,0,0,0.08)',
    css:     '0_4px_24px_rgba(0,0,0,0.08)',
    usage:   'Card Hover 狀態',
  },
  lg: {
    value:   '0 8px 48px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)',
    css:     '0_8px_48px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)',
    usage:   '頁面浮動卡片（WorkListPage、AboutPage）',
  },
}

// ============================================================
// TYPOGRAPHY TOKENS
// ============================================================
export const typographyTokens = {
  fontFamily: {
    display: '"DM Sans", "Noto Sans TC", sans-serif',
    body:    '"Noto Sans TC", "DM Sans", sans-serif',
  },
  scale: {
    display: { size: '56px', lineHeight: '1.1',  letterSpacing: '-0.03em',  weight: 700 },
    h1:      { size: '40px', lineHeight: '1.15', letterSpacing: '-0.025em', weight: 700 },
    h2:      { size: '32px', lineHeight: '1.2',  letterSpacing: '-0.02em',  weight: 600 },
    h3:      { size: '24px', lineHeight: '1.3',  letterSpacing: '-0.01em',  weight: 600 },
    h4:      { size: '20px', lineHeight: '1.4',  letterSpacing: '0',        weight: 600 },
    bodyLg:  { size: '18px', lineHeight: '1.6',  letterSpacing: '0',        weight: 400 },
    body:    { size: '16px', lineHeight: '1.6',  letterSpacing: '0',        weight: 400 },
    bodySm:  { size: '14px', lineHeight: '1.5',  letterSpacing: '0',        weight: 400 },
    caption: { size: '12px', lineHeight: '1.4',  letterSpacing: '0.01em',   weight: 400 },
    label:   { size: '14px', lineHeight: '1',    letterSpacing: '0.06em',   weight: 500 },
  },
}

// ============================================================
// BUTTON COMPONENT
// Accessibility: all variants meet WCAG 2.1 AA contrast ratio
// Primary  : white on #111110 → ~18:1 ✓
// Accent   : white on #2D7A28 → ~5.2:1 ✓
// Secondary: #111110 on white  → ~18:1 ✓
// Ghost    : #2D7A28 on white  → ~5.2:1 ✓
// Outline  : #2D7A28 on white  → ~5.2:1 ✓
// ============================================================
const BTN_BASE = [
  'inline-flex items-center justify-center gap-2',
  'font-display font-medium',
  'rounded-full cursor-pointer select-none',
  'transition-all duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:opacity-40 disabled:cursor-not-allowed',
  'active:scale-[0.97]',
].join(' ')

const BTN_VARIANTS = {
  primary:   'bg-[#111110] text-white              hover:bg-[#3D3D3B] focus-visible:ring-[#111110]',
  accent:    'bg-[#2D7A28] text-white              hover:bg-[#1C5C19] focus-visible:ring-[#6BBF59]',
  secondary: 'border border-[#111110] text-[#111110] bg-transparent hover:bg-[#F0F0EE] focus-visible:ring-[#111110]',
  ghost:     'bg-transparent text-[#2D7A28]        hover:bg-[#E6F7E3] focus-visible:ring-[#6BBF59]',
  outline:   'border border-[#6BBF59] text-[#2D7A28] bg-transparent hover:bg-[#F4FCF2] focus-visible:ring-[#6BBF59]',
}

const BTN_SIZES = {
  sm: 'h-10 px-6  text-sm',
  md: 'h-12 px-8  text-base',
  lg: 'h-14 px-10 text-lg',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`${BTN_BASE} ${BTN_VARIANTS[variant]} ${BTN_SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// ============================================================
// BADGE / TAG COMPONENT
// ============================================================
const BADGE_VARIANTS = {
  default: 'bg-[#F0F0EE] text-[#555553]',
  accent:  'bg-[#E6F7E3] text-[#2D7A28]',
  dark:    'bg-[#111110] text-white',
  outline: 'border border-[#C4C4C0] text-[#555553] bg-transparent',
  active:  'bg-[#6BBF59] text-[#111110]',
}

export function Badge({ variant = 'default', className = '', children, ...props }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-body ${BADGE_VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

// ============================================================
// CARD COMPONENT
// ============================================================
const CARD_VARIANTS = {
  default:  'bg-white border border-[#E2E2DF] rounded-2xl',
  elevated: 'bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]',
  tinted:   'bg-[#FAFAF8] border border-[#E2E2DF] rounded-2xl',
}

export function Card({ variant = 'default', className = '', children, ...props }) {
  return (
    <div
      className={`${CARD_VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================
// INTERNAL HELPERS
// ============================================================
function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
        {label}
      </span>
      <h2 className="font-display font-bold text-[32px] leading-[1.2] tracking-[-0.02em] text-[#111110] m-0">
        {title}
      </h2>
      <p className="text-[#9A9A96] m-0">{subtitle}</p>
    </div>
  )
}

function ColorSwatch({ step, hex }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <div
        className="w-16 h-16 rounded-xl border border-[#E2E2DF]"
        style={{ backgroundColor: hex }}
        title={hex}
      />
      <span className="text-xs font-medium text-[#757572] font-display">{step}</span>
      <span className="text-[10px] text-[#9A9A96] font-mono tracking-wide">{hex}</span>
    </div>
  )
}

function SpacingRow({ token, value }) {
  const numericPx = parseInt(value)
  return (
    <div className="flex items-center gap-6">
      <span className="text-sm font-medium font-display text-[#9A9A96] w-10 shrink-0">{token}</span>
      <div
        className="h-5 bg-[#6BBF59] rounded shrink-0"
        style={{ width: value }}
      />
      <span className="text-sm text-[#9A9A96] font-mono">{value}</span>
      <span className="text-xs text-[#C4C4C0] font-mono">{numericPx / 4} × 4px</span>
    </div>
  )
}

// ============================================================
// DESIGN SYSTEM SHOWCASE PAGE
// ============================================================
export function DesignSystemPage() {
  const typeScale = [
    { label: 'Display',  cls: 'font-display font-bold  text-[56px] leading-[1.1]  tracking-[-0.03em]',  text: 'Aa 你好世界' },
    { label: 'H1',       cls: 'font-display font-bold  text-[40px] leading-[1.15] tracking-[-0.025em]', text: 'Heading One 標題一' },
    { label: 'H2',       cls: 'font-display font-semibold text-[32px] leading-[1.2] tracking-[-0.02em]', text: 'Heading Two 標題二' },
    { label: 'H3',       cls: 'font-display font-semibold text-[24px] leading-[1.3] tracking-[-0.01em]', text: 'Heading Three 標題三' },
    { label: 'H4',       cls: 'font-display font-semibold text-[20px] leading-[1.4]',                    text: 'Heading Four 標題四' },
    { label: 'Body Lg',  cls: 'font-body   text-[18px] leading-[1.6]',  text: '大段落文字 — Body Large，適合引言與重點說明段落。' },
    { label: 'Body',     cls: 'font-body   text-[16px] leading-[1.6]',  text: '標準內文 — Body，用於描述、一般內容與列表說明。' },
    { label: 'Body Sm',  cls: 'font-body   text-[14px] leading-[1.5]',  text: '小字內文 — Body Small，適合補充說明與注釋。' },
    { label: 'Label',    cls: 'font-display font-medium text-[14px] leading-[1] tracking-[0.06em] uppercase', text: 'Label Text 標籤文字' },
    { label: 'Caption',  cls: 'font-body   text-[12px] leading-[1.4] tracking-[0.01em]', text: 'Caption 說明文字 12px' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-body">

      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-[#E2E2DF]">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium font-body
                         text-[#9A9A96] hover:text-[#111110] transition-colors duration-150 group"
            >
              <span className="inline-block transition-transform duration-150 group-hover:-translate-x-1" aria-hidden="true">←</span>
              首頁
            </Link>
            <span className="text-[#E2E2DF]">/</span>
            <span className="font-display font-bold text-base tracking-tight text-[#111110]">
              Design System
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">v 1.0</Badge>
            <Badge variant="outline">WCAG AA</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-20 flex flex-col gap-24">

        {/* ── Hero ── */}
        <section className="flex flex-col gap-5 border-b border-[#E2E2DF] pb-20">
          <p className="text-xs font-medium tracking-widest text-[#6BBF59] uppercase font-display m-0">
            Personal Portfolio
          </p>
          <h1 className="font-display font-bold text-[56px] leading-[1.1] tracking-[-0.03em] text-[#111110] m-0">
            Design System
          </h1>
          <p className="text-lg text-[#757572] max-w-xl leading-relaxed m-0">
            UI 設計師的個人設計規範系統——
            色彩、字體排版、元件，以極簡結構為基礎，
            確保跨頁面的視覺一致性與無障礙可及性。
          </p>
          <div className="flex gap-3 flex-wrap pt-2">
            <Button variant="primary">開始探索</Button>
            <Button variant="secondary">查看原始碼</Button>
          </div>
        </section>

        {/* ── 01 Colors ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="01"
            title="Color"
            subtitle="蘋果綠強調色 × 中性灰階 — 所有配色符合 WCAG 2.1 AA 對比標準"
          />

          <div className="flex flex-col gap-8 bg-white rounded-2xl border border-[#E2E2DF] p-10">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">
                Accent — Apple Green
              </p>
              <div className="flex gap-3 flex-wrap">
                {Object.entries(colorTokens.accent).map(([step, hex]) => (
                  <ColorSwatch key={step} step={step} hex={hex} />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-[#F0F0EE]" />

            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">
                Neutral
              </p>
              <div className="flex gap-3 flex-wrap">
                {Object.entries(colorTokens.neutral).map(([step, hex]) => (
                  <ColorSwatch key={step} step={step} hex={hex} />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-[#F0F0EE]" />

            {/* Accessibility contrast demos */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">
                Contrast Checks
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { bg: '#111110', fg: '#FFFFFF',  label: 'Primary',   ratio: '18:1' },
                  { bg: '#2D7A28', fg: '#FFFFFF',  label: 'Accent',    ratio: '5.2:1' },
                  { bg: '#FFFFFF', fg: '#111110',  label: 'Secondary', ratio: '18:1' },
                  { bg: '#FFFFFF', fg: '#2D7A28',  label: 'Ghost',     ratio: '5.2:1' },
                ].map(({ bg, fg, label, ratio }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-xl px-5 py-4 border border-[#E2E2DF]"
                    style={{ backgroundColor: bg }}
                  >
                    <span className="text-sm font-medium font-display" style={{ color: fg }}>
                      {label}
                    </span>
                    <span className="text-xs font-mono rounded-full px-2 py-0.5 bg-black/10" style={{ color: fg }}>
                      {ratio}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 Typography ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="02"
            title="Typography"
            subtitle="DM Sans（英文 Display）× Noto Sans TC（中英內文）"
          />

          <div className="flex flex-col bg-white rounded-2xl border border-[#E2E2DF] overflow-hidden">
            {typeScale.map(({ label, cls, text }, i) => (
              <div
                key={label}
                className={`flex items-baseline gap-6 px-10 py-6 ${
                  i < typeScale.length - 1 ? 'border-b border-[#F0F0EE]' : ''
                }`}
              >
                <span className="text-xs font-medium text-[#9A9A96] font-display w-16 shrink-0">
                  {label}
                </span>
                <span className={`${cls} text-[#111110] min-w-0`}>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Buttons ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="03"
            title="Buttons"
            subtitle="5 Variants × 3 Sizes + Disabled 狀態"
          />

          <div className="flex flex-col gap-10 bg-white rounded-2xl border border-[#E2E2DF] p-10">

            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">
                Variants
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            <div className="w-full h-px bg-[#F0F0EE]" />

            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">
                Sizes
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="w-full h-px bg-[#F0F0EE]" />

            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">
                Disabled State
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary"   disabled>Primary</Button>
                <Button variant="accent"    disabled>Accent</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="ghost"     disabled>Ghost</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 Badges ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="04"
            title="Badges & Tags"
            subtitle="狀態標籤、技能分類標記"
          />

          <div className="flex flex-col gap-6 bg-white rounded-2xl border border-[#E2E2DF] p-10">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Variants</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="default">Default</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="dark">Dark</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="active">Active</Badge>
              </div>
            </div>

            <div className="w-full h-px bg-[#F0F0EE]" />

            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Use Case — Skills</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="active">UI Design</Badge>
                <Badge variant="accent">UX Research</Badge>
                <Badge variant="outline">System Analysis</Badge>
                <Badge variant="default">Front-End</Badge>
                <Badge variant="default">Figma</Badge>
                <Badge variant="default">React</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 Spacing ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="05"
            title="Spacing"
            subtitle="4px 基礎倍數，8 個 Token 覆蓋所有間距需求"
          />

          <div className="flex flex-col gap-5 bg-white rounded-2xl border border-[#E2E2DF] p-10">
            {Object.entries(spacingTokens).map(([token, value]) => (
              <SpacingRow key={token} token={token} value={value} />
            ))}
          </div>
        </section>

        {/* ── 06 Border Radius ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="06"
            title="Border Radius"
            subtitle="4 個層級：小裝飾 → 內容卡片 → 頁面容器 → Pill / Avatar"
          />

          <div className="flex flex-col gap-0 bg-white rounded-2xl border border-[#E2E2DF] overflow-hidden">
            {Object.entries(borderRadiusTokens).map(([key, { value, tailwind, usage }], i, arr) => (
              <div
                key={key}
                className={`flex items-center gap-8 px-10 py-6 ${
                  i < arr.length - 1 ? 'border-b border-[#F0F0EE]' : ''
                }`}
              >
                {/* Preview */}
                <div
                  className="shrink-0 w-14 h-14 bg-[#E6F7E3] border-2 border-[#6BBF59]"
                  style={{ borderRadius: value === '9999px' ? '9999px' : value }}
                />
                {/* Token info */}
                <div className="flex flex-col gap-0.5 min-w-[80px]">
                  <span className="text-sm font-semibold font-display text-[#111110]">{key}</span>
                  <span className="text-xs font-mono text-[#9A9A96]">{value}</span>
                </div>
                {/* Tailwind class */}
                <code className="text-xs font-mono bg-[#F0F0EE] text-[#555553] px-3 py-1.5 rounded-lg shrink-0">
                  {tailwind}
                </code>
                {/* Usage */}
                <span className="text-sm text-[#9A9A96] font-body">{usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07 Shadows ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="07"
            title="Shadows"
            subtitle="3 層陰影深度——從輕量 Hover 到頁面浮動卡片"
          />

          <div className="flex flex-col gap-5 bg-[#FAFAF8] rounded-2xl border border-[#E2E2DF] p-10">
            {Object.entries(shadowTokens).map(([key, { value, usage }]) => (
              <div key={key} className="flex items-center gap-8">
                {/* Shadow preview */}
                <div
                  className="shrink-0 w-20 h-14 bg-white rounded-xl"
                  style={{ boxShadow: value }}
                />
                {/* Token info */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold font-display text-[#111110]">shadow-{key}</span>
                    <span className="text-xs text-[#9A9A96] font-body">{usage}</span>
                  </div>
                  <code className="text-[11px] font-mono text-[#9A9A96] break-all">{value}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 08 Cards ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="08"
            title="Cards"
            subtitle="3 種卡片層次——Default（邊框）· Elevated（陰影）· Tinted（底色）"
          />

          <div className="flex flex-col gap-8 bg-[#FAFAF8] rounded-2xl border border-[#E2E2DF] p-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* Default Card */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Default</p>
                <Card variant="default" className="p-5 flex flex-col gap-3">
                  <Badge variant="active">Shipped</Badge>
                  <p className="font-display font-semibold text-base text-[#111110] m-0">Project Title</p>
                  <p className="text-sm text-[#757572] font-body m-0">案例描述文字，說明此專案的核心目標與解決方案。</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <Badge variant="accent">UX Research</Badge>
                    <Badge variant="default">Figma</Badge>
                  </div>
                </Card>
                <code className="text-xs font-mono text-[#9A9A96]">variant="default"</code>
              </div>

              {/* Elevated Card */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Elevated</p>
                <Card variant="elevated" className="p-5 flex flex-col gap-3">
                  <Badge variant="active">Shipped</Badge>
                  <p className="font-display font-semibold text-base text-[#111110] m-0">Project Title</p>
                  <p className="text-sm text-[#757572] font-body m-0">案例描述文字，說明此專案的核心目標與解決方案。</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <Badge variant="accent">UX Research</Badge>
                    <Badge variant="default">Figma</Badge>
                  </div>
                </Card>
                <code className="text-xs font-mono text-[#9A9A96]">variant="elevated"</code>
              </div>

              {/* Tinted Card */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Tinted</p>
                <Card variant="tinted" className="p-5 flex flex-col gap-3">
                  <Badge variant="active">Shipped</Badge>
                  <p className="font-display font-semibold text-base text-[#111110] m-0">Project Title</p>
                  <p className="text-sm text-[#757572] font-body m-0">案例描述文字，說明此專案的核心目標與解決方案。</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <Badge variant="accent">UX Research</Badge>
                    <Badge variant="default">Figma</Badge>
                  </div>
                </Card>
                <code className="text-xs font-mono text-[#9A9A96]">variant="tinted"</code>
              </div>

            </div>

            <div className="w-full h-px bg-[#E2E2DF]" />

            {/* Page Card */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Page Container Card — rounded-[32px] + double shadow</p>
              <div
                className="bg-white rounded-[32px] overflow-hidden p-8
                           shadow-[0_8px_48px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">Portfolio</span>
                  <p className="font-display font-bold text-[24px] text-[#111110] m-0">Works</p>
                  <p className="text-sm text-[#9A9A96] font-body m-0">
                    WorkListPage、AboutPage、CaseStudyPage 的外層容器樣式
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 09 Navigation ── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            label="09"
            title="Navigation"
            subtitle="Navbar + BackButton — 導覽一致性"
          />

          <div className="flex flex-col gap-8 bg-white rounded-2xl border border-[#E2E2DF] overflow-hidden">

            {/* Navbar mockup */}
            <div className="flex flex-col gap-4 p-10 pb-0">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">Navbar</p>
              <div className="rounded-2xl border border-[#E2E2DF] overflow-hidden">
                {/* Default state */}
                <div className="flex items-center justify-between px-8 h-16 border-b border-[#F0F0EE]">
                  <button className="h-8 px-4 rounded-full text-sm font-medium font-body
                                     text-[#555553] bg-[#F0F0EE] hover:bg-[#E2E2DF] transition-colors">
                    joyce2502017@gmail.com
                  </button>
                  <div className="flex items-center gap-1">
                    <span className="h-9 px-4 rounded-full text-sm font-medium font-display
                                     text-[#555553] flex items-center">Works</span>
                    <span className="h-9 px-4 rounded-full text-sm font-medium font-display
                                     text-[#555553] flex items-center">About</span>
                  </div>
                </div>
                {/* Active state */}
                <div className="flex items-center justify-between px-8 h-16 bg-[#FAFAF8]">
                  <span className="text-xs text-[#C4C4C0] font-body">Active Link State ↓</span>
                  <div className="flex items-center gap-1">
                    <span className="h-9 px-4 rounded-full text-sm font-medium font-display
                                     bg-[#F0F0EE] text-[#111110] flex items-center">Works</span>
                    <span className="h-9 px-4 rounded-full text-sm font-medium font-display
                                     text-[#555553] flex items-center">About</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BackButton */}
            <div className="flex flex-col gap-4 px-10 pb-10">
              <p className="text-xs font-medium text-[#9A9A96] font-display uppercase tracking-wider m-0">BackButton</p>
              <div className="flex flex-col gap-3 bg-[#FAFAF8] rounded-xl border border-[#E2E2DF] p-6">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-[#C4C4C0] m-0 mb-2">Default</p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-1.5 text-sm font-medium font-body
                                 text-[#9A9A96] hover:text-[#111110] transition-colors duration-150 group"
                    >
                      <span className="inline-block transition-transform duration-150 group-hover:-translate-x-1" aria-hidden="true">←</span>
                      返回首頁
                    </Link>
                  </div>
                  <div className="w-px h-10 bg-[#E2E2DF]" />
                  <div>
                    <p className="text-xs text-[#C4C4C0] m-0 mb-2">Hover（滑入試試）</p>
                    <Link
                      to="/work"
                      className="inline-flex items-center gap-1.5 text-sm font-medium font-body
                                 text-[#111110] transition-colors duration-150 group"
                    >
                      <span className="inline-block -translate-x-1" aria-hidden="true">←</span>
                      返回作品列表
                    </Link>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#C4C4C0] pt-2">
                  {'<BackButton to="/work" label="返回作品列表" />'}
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E2DF] bg-white">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
          <span className="text-sm text-[#9A9A96]">© 2025 Portfolio Design System</span>
          <Badge variant="accent">WCAG 2.1 AA Compliant</Badge>
        </div>
      </footer>

    </div>
  )
}
