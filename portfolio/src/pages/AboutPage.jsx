import React from 'react'
import Navbar from '../components/Navbar.jsx'
import BackButton from '../components/BackButton.jsx'
import { Badge, Button } from '../design-system/DesignSystem.jsx'

const SKILLS = [
  { group: 'Design',  items: ['UI Design', 'Visual Design', 'Design System', 'Figma', 'Prototyping'] },
  { group: 'UX',      items: ['User Research', 'Usability Testing', 'Information Architecture', 'User Flow'] },
  { group: 'SA / PM', items: ['System Analysis', 'Requirements Gathering', 'Flow Diagram', 'Wireframing'] },
  { group: 'Dev',     items: ['HTML / CSS', 'React', 'Tailwind CSS', 'Git'] },
]

const EXPERIENCE = [
  { year: '2024 — Now',  role: '職位名稱',  company: '公司名稱',  desc: '工作內容描述即將更新。' },
  { year: '2022 — 2024', role: '職位名稱',  company: '公司名稱',  desc: '工作內容描述即將更新。' },
  { year: '2020 — 2022', role: '職位名稱',  company: '公司名稱',  desc: '工作內容描述即將更新。' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#E8E8E5] py-8 px-4">
      <div
        className="w-full max-w-4xl mx-auto bg-white rounded-[32px] overflow-hidden
                   shadow-[0_8px_48px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)]"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <Navbar />

        <main className="px-8 sm:px-12 py-14 flex flex-col gap-16">

          <BackButton to="/" label="返回首頁" />

          {/* Intro */}
          <section className="flex flex-col sm:flex-row gap-10 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-full bg-[#E6F7E3] ring-2 ring-[#2D7A28] ring-offset-2
                              flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-[#2D7A28]">JW</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
                  About
                </span>
                <h1 className="font-display font-bold text-[40px] leading-[1.1] tracking-[-0.025em]
                               text-[#111110] m-0">
                  Joyce Wang
                </h1>
                <p className="text-base text-[#9A9A96] font-body m-0">
                  UI Designer · UX Research · System Analysis
                </p>
              </div>
              <p className="text-base text-[#555553] font-body leading-[1.75] m-0 max-w-xl">
                個人簡介即將更新。這裡將說明你的設計理念、職涯轉換歷程，
                以及為什麼「視覺美感與邏輯思維並重」是你的核心優勢。
              </p>
              <div className="flex gap-3 pt-1">
                <Button variant="primary" size="md">Download CV</Button>
                <Button variant="secondary" size="md">聯絡我</Button>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-[#F0F0EE]" />

          {/* Skills */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
                Skills
              </span>
              <h2 className="font-display font-bold text-[32px] leading-[1.2] tracking-[-0.02em]
                             text-[#111110] m-0">
                專業能力
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SKILLS.map(({ group, items }) => (
                <div key={group}
                  className="flex flex-col gap-3 bg-[#FAFAF8] rounded-2xl border border-[#E2E2DF] p-5">
                  <span className="text-xs font-display font-semibold text-[#9A9A96] uppercase tracking-wider">
                    {group}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Badge key={item} variant="default">{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-[#F0F0EE]" />

          {/* Experience */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
                Experience
              </span>
              <h2 className="font-display font-bold text-[32px] leading-[1.2] tracking-[-0.02em]
                             text-[#111110] m-0">
                工作歷程
              </h2>
            </div>

            <div className="flex flex-col gap-0">
              {EXPERIENCE.map(({ year, role, company, desc }, i) => (
                <div key={i}
                  className="flex gap-6 pb-8 last:pb-0 relative">
                  {/* Timeline line */}
                  {i < EXPERIENCE.length - 1 && (
                    <div className="absolute left-[5px] top-3 bottom-0 w-px bg-[#E2E2DF]" />
                  )}
                  {/* Dot */}
                  <div className="shrink-0 w-[11px] h-[11px] rounded-full border-2 border-[#2D7A28]
                                  bg-white mt-1.5 z-10" />
                  {/* Content */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-display font-medium text-[#C4C4C0] tracking-wide">
                      {year}
                    </span>
                    <p className="font-display font-semibold text-base text-[#111110] m-0">{role}</p>
                    <p className="text-sm text-[#6BBF59] font-body m-0">{company}</p>
                    <p className="text-sm text-[#757572] font-body leading-relaxed m-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-[#F0F0EE]" />

          {/* Contact */}
          <section className="flex flex-col gap-6 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#6BBF59] font-display tracking-widest uppercase">
                Contact
              </span>
              <h2 className="font-display font-bold text-[32px] leading-[1.2] tracking-[-0.02em]
                             text-[#111110] m-0">
                一起合作？
              </h2>
            </div>
            <p className="text-base text-[#757572] font-body leading-relaxed m-0 max-w-md">
              歡迎聊聊設計、UX 研究或系統規劃相關的合作機會。
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="primary" size="lg">
                joyce2502017@gmail.com →
              </Button>
              <Button variant="secondary" size="lg">LinkedIn</Button>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
