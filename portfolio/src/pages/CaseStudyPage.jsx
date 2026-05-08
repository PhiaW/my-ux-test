import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import BackButton from '../components/BackButton.jsx'
import CaseStudy from '../components/CaseStudy.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import { PROJECTS } from '../data/projects.js'
import { ROUTES } from '../router/paths.js'

export default function CaseStudyPage() {
  const { id } = useParams()
  const project = PROJECTS.find((p) => p.id === id)

  if (!project) return <NotFoundPage />

  return (
    <div className="min-h-screen bg-[#E8E8E5] py-8 px-4">
      <div
        className="w-full max-w-5xl mx-auto bg-white rounded-[32px] overflow-hidden
                   shadow-[0_8px_48px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)]"
      >
        <Navbar />
        <div className="px-8 sm:px-12 pt-10">
          <BackButton to={ROUTES.WORK} label="返回作品列表" />
        </div>
        <CaseStudy project={project} />
      </div>
    </div>
  )
}
