import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../design-system/DesignSystem.jsx'
import { ROUTES } from '../router/paths.js'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#E8E8E5] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 text-center">

        {/* Big 404 */}
        <span
          className="font-display font-bold text-[140px] leading-none text-[#E2E2DF] select-none"
          aria-hidden="true"
        >
          404
        </span>

        <div className="flex flex-col gap-3 -mt-6">
          <h1 className="font-display font-bold text-[32px] leading-[1.2] tracking-[-0.02em]
                         text-[#111110] m-0">
            頁面找不到
          </h1>
          <p className="text-base text-[#9A9A96] font-body m-0">
            這個頁面不存在，或是連結已經失效。
          </p>
        </div>

        <Link to={ROUTES.HOME}>
          <Button variant="primary" size="lg">回到首頁 →</Button>
        </Link>

      </div>
    </div>
  )
}
