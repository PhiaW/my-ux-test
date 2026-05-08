import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../router/paths.js'

const EMAIL = 'joyce2502017@gmail.com'

const NAV_LINKS = [
  { label: 'Works', to: ROUTES.WORK  },
  { label: 'About', to: ROUTES.ABOUT },
]

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium font-body transition-colors duration-150 ${
    isActive ? 'text-[#111110]' : 'text-[#9A9A96] hover:text-[#111110]'
  }`

export default function Navbar() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-[#F0F0EE]">

      {/* Left: Mail icon button */}
      <button
        onClick={handleCopy}
        title={copied ? '已複製！' : EMAIL}
        aria-label="複製 Email"
        className="relative flex items-center justify-center w-9 h-9 rounded-full
                   bg-[#E6F7E3] text-[#2D7A28] hover:bg-[#C8EDBE]
                   transition-all duration-150 cursor-pointer select-none"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Right: Nav links */}
      <div className="flex items-center gap-7">
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            {label}
          </NavLink>
        ))}
      </div>

    </nav>
  )
}
