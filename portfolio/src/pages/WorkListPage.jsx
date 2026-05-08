import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import BackButton from '../components/BackButton.jsx'
import { Badge } from '../design-system/DesignSystem.jsx'
import { PROJECTS } from '../data/projects.js'

const FILTERS = ['All', 'UI Design', 'UX Research', 'Visual Design']

const STATUS_VARIANT = {
  Shipped:       'active',
  'In Progress': 'accent',
  Concept:       'outline',
}

const TAG_VARIANT = {
  'UI Design':     'default',
  'UX Research':   'accent',
  'Visual Design': 'outline',
}

export default function WorkListPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(active))

  return (
    <div className="min-h-screen bg-[#E8E8E5] py-8 px-4">
      <div
        className="w-full max-w-4xl mx-auto bg-white rounded-[32px] overflow-hidden
                   shadow-[0_8px_48px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)]"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <Navbar />

        <main className="px-8 sm:px-12 py-14 flex flex-col gap-12">

          <BackButton to="/" label="返回首頁" />

          {/* Header */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
              Portfolio
            </span>
            <h1 className="font-display font-bold text-[40px] leading-[1.1] tracking-[-0.025em] text-[#111110] m-0">
              Works
            </h1>
            <p className="text-[#9A9A96] text-base m-0">
              UI Design · UX Research · Visual Design
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`h-9 px-5 rounded-full text-sm font-medium font-display
                            transition-all duration-150 cursor-pointer
                            ${active === f
                              ? 'bg-[#111110] text-white'
                              : 'bg-[#F0F0EE] text-[#555553] hover:bg-[#E2E2DF]'
                            }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {filtered.length === 0 && (
              <p className="text-[#C4C4C0] text-sm font-body col-span-2 text-center py-16">
                此分類尚無案例
              </p>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const { id, title, subtitle, year, status, tags, description, thumbBg } = project

  return (
    <Link
      to={`/work/${id}`}
      className="group flex flex-col rounded-2xl border border-[#E2E2DF] bg-white
                 overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]
                 hover:border-[#C4C4C0] transition-all duration-200"
    >
      {/* Thumbnail */}
      <div
        className="aspect-[16/9] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: thumbBg ?? '#F0F0EE' }}
      >
        <span className="text-4xl opacity-20">🖼</span>
        <div
          className="absolute inset-0 bg-[#111110]/0 group-hover:bg-[#111110]/5
                     transition-colors duration-200 flex items-center justify-center"
        >
          <span
            className="text-sm font-display font-medium text-white
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       bg-[#111110] px-4 py-2 rounded-full"
          >
            View Case Study →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <Badge variant={STATUS_VARIANT[status] ?? 'default'}>{status}</Badge>
          <span className="text-xs text-[#C4C4C0] font-display">{year}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="font-display font-bold text-[20px] leading-[1.2] tracking-[-0.01em]
                         text-[#111110] m-0">
            {title}
          </h2>
          <p className="text-sm text-[#9A9A96] font-body m-0">{subtitle}</p>
        </div>

        <p className="text-sm text-[#757572] font-body leading-relaxed m-0">{description}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((t) => (
            <Badge key={t} variant={TAG_VARIANT[t] ?? 'default'}>{t}</Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
