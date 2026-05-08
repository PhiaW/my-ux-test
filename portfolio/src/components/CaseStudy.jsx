import React from 'react'
import { Badge } from '../design-system/DesignSystem.jsx'

// ============================================================
// INTERNAL HELPERS
// ============================================================
const STATUS_CONFIG = {
  Shipped:       { variant: 'active'  },
  'In Progress': { variant: 'accent'  },
  Concept:       { variant: 'outline' },
}

function SectionLabel({ number, title, description }) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
        {number}
      </span>
      <h2 className="font-display font-bold text-[32px] leading-[1.2] tracking-[-0.02em] text-[#111110] m-0">
        {title}
      </h2>
      {description && (
        <p className="text-[#9A9A96] text-sm m-0">{description}</p>
      )}
    </div>
  )
}

function MetaBlock({ label, value, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-display font-medium tracking-[0.14em] uppercase text-[#C4C4C0]">
        {label}
      </span>
      {value    && <span className="text-sm font-medium text-[#3D3D3B] font-body">{value}</span>}
      {children}
    </div>
  )
}

function Divider() {
  return <div className="w-full h-px bg-[#F0F0EE] my-0" />
}

// ============================================================
// PROJECT HEADER
// ============================================================
function ProjectHeader({ project }) {
  const { index, status, title, titleSub, problem, role, tools, duration } = project
  const { variant } = STATUS_CONFIG[status] ?? STATUS_CONFIG['Concept']

  return (
    <header className="relative pt-12 pb-12 flex flex-col gap-7">
      {/* Decorative number */}
      <span
        className="absolute top-6 right-0 font-display font-bold leading-none
                   text-[#F0F0EE] select-none pointer-events-none
                   text-[100px] sm:text-[140px]"
        aria-hidden="true"
      >
        {index}
      </span>

      {/* Status badge */}
      <div className="relative">
        <Badge variant={variant}>{status}</Badge>
      </div>

      {/* Title block */}
      <div className="relative flex flex-col gap-1.5">
        <h1 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-[#111110] m-0
                       text-[40px] sm:text-[56px]">
          {title}
        </h1>
        {titleSub && (
          <p className="font-display font-medium text-xl text-[#9A9A96] m-0 tracking-[-0.01em]">
            {titleSub}
          </p>
        )}
      </div>

      {/* Problem statement */}
      <div className="relative flex items-start gap-3 bg-[#F4FCF2] rounded-2xl px-5 py-4 border border-[#C8EDBE]">
        <span className="text-[#2D7A28] shrink-0 mt-0.5" aria-hidden="true">⚡</span>
        <p className="text-[#2D7A28] font-body text-base leading-relaxed m-0 font-medium">
          {problem}
        </p>
      </div>

      {/* Meta */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-6 pt-1">
        <MetaBlock label="My Role" value={role} />
        <MetaBlock label="Tools">
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
          </div>
        </MetaBlock>
        <MetaBlock label="Duration" value={duration} />
      </div>
    </header>
  )
}

// ============================================================
// CONTEXT SECTION
// ============================================================
function ContextSection({ context }) {
  return (
    <section className="py-12 flex flex-col gap-8">
      <SectionLabel number="02" title="Context" description="背景脈絡與核心痛點" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Background */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-semibold text-base text-[#3D3D3B] m-0 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#C4C4C0] shrink-0" />
            背景
          </h3>
          <p className="text-[#555553] font-body text-base leading-[1.75] m-0">
            {context.background}
          </p>
        </div>

        {/* Pain points */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-semibold text-base text-[#3D3D3B] m-0 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#2D7A28] shrink-0" />
            核心痛點
          </h3>
          <ol className="flex flex-col gap-3 m-0 p-0 list-none">
            {context.painPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 w-6 h-6 rounded-full bg-[#F0F0EE] flex items-center justify-center
                             text-sm font-display font-bold text-[#757572]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base font-body text-[#555553] leading-[1.65]">{pt}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// LOGIC SECTION — text card layout
// ============================================================
function LogicSection({ logic }) {
  return (
    <section className="py-12 flex flex-col gap-8">
      <SectionLabel
        number="03"
        title="Logic & Architecture"
        description="資訊架構 × 判斷邏輯 — 設計決策核心思維"
      />

      <div className="flex flex-col gap-5">
        {logic.map((block, i) => (
          <div
            key={i}
            className="flex flex-col gap-5 bg-white rounded-2xl border border-[#E2E2DF] p-7"
          >
            {/* Block header */}
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display font-semibold text-[20px] leading-[1.3] text-[#111110] m-0">
                {block.title}
              </h3>
              <p className="text-[#757572] font-body text-sm leading-relaxed m-0">
                {block.content}
              </p>
            </div>

            {/* Items */}
            {block.items?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    className="flex gap-3 bg-[#FAFAF8] rounded-xl border border-[#E2E2DF] px-4 py-3"
                  >
                    <span
                      className="shrink-0 text-xs font-display font-bold text-[#2D7A28]
                                 bg-[#E6F7E3] px-2.5 py-1 rounded-full h-fit mt-0.5 whitespace-nowrap"
                    >
                      {item.label}
                    </span>
                    <span className="text-sm font-body text-[#555553] leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// VISUAL GALLERY
// ============================================================
function GalleryCard({ item, featured = false }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative rounded-2xl bg-[#F0F0EE] border border-[#E2E2DF]
                    flex items-center justify-center overflow-hidden
                    ${featured ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}
      >
        {item.src ? (
          <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <span className="text-4xl">🖼</span>
            <span className="text-xs text-[#9A9A96] font-display">{item.label}</span>
          </div>
        )}
        <span className="absolute top-3 left-3">
          <Badge variant="dark">{item.label}</Badge>
        </span>
      </div>
      <p className="text-sm font-body text-[#757572] leading-relaxed m-0">{item.caption}</p>
    </div>
  )
}

function VisualGallery({ gallery }) {
  return (
    <section className="py-12 flex flex-col gap-8">
      <SectionLabel
        number="04"
        title="Visual Gallery"
        description="設計稿展示 — 關鍵畫面與設計決策說明"
      />

      <div className="flex flex-col gap-5">
        {gallery[0] && <GalleryCard item={gallery[0]} featured />}
        {gallery.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gallery.slice(1).map((item) => (
              <GalleryCard key={item.label} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ============================================================
// OUTCOMES SECTION
// ============================================================
function OutcomesSection({ outcomes }) {
  return (
    <section className="py-12 flex flex-col gap-8">
      <SectionLabel number="05" title="Outcomes" description="設計成果與關鍵指標" />

      <div className="flex flex-wrap gap-4">
        {outcomes.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 bg-[#F4FCF2] border border-[#C8EDBE] rounded-2xl px-7 py-5 min-w-[140px]"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-[40px] leading-none text-[#2D7A28]">
                {item.value}
              </span>
              {item.unit && (
                <span className="font-display font-medium text-lg text-[#6BBF59]">
                  {item.unit}
                </span>
              )}
            </div>
            <span className="text-sm font-body text-[#757572] leading-snug">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// MAIN EXPORT
// ============================================================
export default function CaseStudy({ project }) {
  if (!project) return null

  return (
    <article className="font-body flex flex-col px-8 sm:px-12">
      <ProjectHeader project={project} />
      <Divider />
      <ContextSection context={project.context} />
      {project.logic?.length > 0 && (
        <>
          <Divider />
          <LogicSection logic={project.logic} />
        </>
      )}
      <Divider />
      <VisualGallery gallery={project.gallery} />
      {project.outcomes?.length > 0 && (
        <>
          <Divider />
          <OutcomesSection outcomes={project.outcomes} />
        </>
      )}
      <div className="pb-12" />
    </article>
  )
}
