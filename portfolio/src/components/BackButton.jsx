import React from 'react'
import { Link } from 'react-router-dom'

export default function BackButton({ to, label = '返回' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-sm font-medium font-body
                 text-[#9A9A96] hover:text-[#111110] transition-colors duration-150
                 group"
    >
      <span
        className="inline-block transition-transform duration-150 group-hover:-translate-x-1"
        aria-hidden="true"
      >
        ←
      </span>
      {label}
    </Link>
  )
}
