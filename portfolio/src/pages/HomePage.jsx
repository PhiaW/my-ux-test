import React from 'react'
import Navbar from '../components/Navbar.jsx'
import HeroSection from '../components/HeroSection.jsx'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#E8E8E5] flex items-start justify-center py-8 px-4">
      {/* Floating card */}
      <div
        className="w-full max-w-4xl bg-white rounded-[32px] overflow-hidden
                   shadow-[0_8px_48px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)]
                   hero-fade-in"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <Navbar />
        <HeroSection />
      </div>
    </div>
  )
}
