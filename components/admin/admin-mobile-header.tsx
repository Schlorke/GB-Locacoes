'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import MobileSidebar from './mobile-sidebar'

export default function AdminMobileHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-[9999] w-full border-b border-slate-700 bg-slate-900 md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo e Título */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-black/20 transition-all duration-200 hover:scale-105 flex-shrink-0 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-lg pointer-events-none"></div>
              <span className="relative z-10">GB</span>
            </div>
            <span className="font-semibold text-white truncate">GB Admin</span>
          </Link>

          {/* Menu Hambúrguer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="h-10 w-10 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 z-[9999]"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar Mobile */}
      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
