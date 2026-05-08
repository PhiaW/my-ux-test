import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../design-system/DesignSystem.jsx'
import { ROUTES } from '../router/paths.js'

const SKILLS = [
  { label: 'UI Design',       variant: 'accent' },
  { label: 'UX Research',     variant: 'accent' },
  { label: 'System Analysis', variant: 'accent' },
  { label: 'Figma',           variant: 'accent' },
  { label: 'React',           variant: 'accent' },
]

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center
                 px-8 pt-16 pb-20 min-h-[78vh] overflow-hidden"
    >
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, #C4C4C0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Avatar + Name badge ── */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 hero-fade-up"
        style={{ animationDelay: '0.05s' }}
      >
        {/* Avatar circle */}
        <div className="relative">
          <div
            className="w-[72px] h-[72px] rounded-full bg-[#E6F7E3]
                        ring-2 ring-[#2D7A28] ring-offset-3
                        flex items-center justify-center overflow-hidden"
          >
            <span className="font-display font-bold text-xl text-[#2D7A28] select-none">
              JW
            </span>
          </div>
          {/* Availability dot */}
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full
                        bg-[#6BBF59] border-2 border-white"
            title="Available for work"
          />
        </div>

        {/* Name badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0F0EE]">
          <span className="text-sm font-medium text-[#3D3D3B] font-body">Joyce Wang</span>
          <span role="img" aria-label="wave">👋</span>
        </div>
      </div>

      {/* ── Headline ── */}
      <h1
        className="relative z-10 m-0 mt-9
                   font-display font-bold leading-[1.08] tracking-[-0.035em]
                   text-[#111110] text-[36px] sm:text-[40px] md:text-[56px]
                   hero-fade-up"
        style={{ animationDelay: '0.15s' }}
      >
        以美感發問，
        <br />
        <em className="not-italic text-[#2D7A28]">以邏輯解題。</em>
      </h1>

      {/* ── Role label ── */}
      <p
        className="relative z-10 m-0 mt-5
                   text-xs sm:text-sm font-display font-medium
                   text-[#9A9A96] tracking-[0.16em] uppercase
                   hero-fade-up"
        style={{ animationDelay: '0.23s' }}
      >
        UI Design&nbsp;&nbsp;·&nbsp;&nbsp;UX Research&nbsp;&nbsp;·&nbsp;&nbsp;System Analysis
      </p>

      {/* ── Tagline ── */}
      <p
        className="relative z-10 m-0 mt-2
                   text-sm text-[#C4C4C0] font-body
                   hero-fade-up"
        style={{ animationDelay: '0.28s' }}
      >
        以視覺驅動體驗，以架構支撐設計
      </p>

      {/* ── Skill badges ── */}
      <div
        className="relative z-10 mt-8 flex flex-wrap gap-2 justify-center hero-fade-up"
        style={{ animationDelay: '0.33s' }}
      >
        {SKILLS.map(({ label, variant }) => (
          <Badge key={label} variant={variant}>{label}</Badge>
        ))}
      </div>

      {/* ── CTAs ── */}
      <div
        className="relative z-10 mt-8 flex gap-3 flex-wrap justify-center hero-fade-up"
        style={{ animationDelay: '0.40s' }}
      >
        {/* Primary CTA — Link 樣式複用 primary button，arrow 獨立做 hover 位移 */}
        <Link
          to={ROUTES.WORK}
          className="group inline-flex items-center gap-2.5 h-14 px-10 text-lg rounded-full
                     bg-[#111110] text-white font-display font-medium
                     hover:bg-[#3D3D3B] active:scale-[0.97]
                     transition-all duration-150 select-none"
        >
          查看作品集
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
            →
          </span>
        </Link>

        {/* Secondary CTA */}
        <Link
          to={ROUTES.ABOUT}
          className="inline-flex items-center justify-center h-14 px-10 text-lg rounded-full
                     border border-[#111110] text-[#111110] bg-transparent font-display font-medium
                     hover:bg-[#F0F0EE] active:scale-[0.97]
                     transition-all duration-150 select-none"
        >
          關於我
        </Link>
      </div>

    </section>
  )
}
