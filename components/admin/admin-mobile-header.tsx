'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MobileSidebar from './mobile-sidebar'

export default function AdminMobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname?.includes('/dashboard')) return 'Dashboard'
    if (pathname?.includes('/equipamentos')) return 'Equipamentos'
    if (pathname?.includes('/categorias')) return 'Categorias'
    if (pathname?.includes('/orcamentos')) return 'Orçamentos'
    if (pathname?.includes('/rentals')) return 'Locações'
    if (pathname?.includes('/financial')) return 'Financeiro'
    if (pathname?.includes('/maintenance')) return 'Manutenção'
    if (pathname?.includes('/logistics')) return 'Logística'
    if (pathname?.includes('/settings')) return 'Configurações'
    return 'GB Admin'
  }

  return (
    <>
      {/* Status Bar Area - mesma cor da área pública */}
      <div
        className="w-full md:hidden"
        style={{
          backgroundColor: '#334155', // Mesma cor do header público
          height: 'env(safe-area-inset-top, 0px)', // Altura do notch/status bar
          minHeight: '44px', // Altura mínima para iPhone
        }}
      />

      <header
        className="admin-mobile-header sticky top-0 z-[var(--layer-sticky)] w-full md:hidden"
        style={{
          backgroundColor: 'rgb(51, 65, 85) !important',
          background: 'rgb(51, 65, 85) !important',
        }}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo e Título */}
          <Link href="/" className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-black/20 transition-all duration-200 hover:scale-105 flex-shrink-0 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-lg pointer-events-none"></div>
              <span className="relative z-10">GB</span>
            </div>
            <span className="font-semibold text-white truncate text-base">
              {getPageTitle()}
            </span>
          </Link>

          {/* Menu Hambúrguer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="h-10 w-10 text-white hover:text-white z-[var(--layer-fab)] relative overflow-hidden group transition-all duration-300 ease-out hover:scale-105 active:scale-95 flex-shrink-0"
            style={{
              background:
                'linear-gradient(145deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.8))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                0 4px 12px rgba(0, 0, 0, 0.4),
                0 2px 4px rgba(0, 0, 0, 0.2)
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(145deg, rgba(71, 85, 105, 0.95), rgba(51, 65, 85, 0.9))'
              e.currentTarget.style.boxShadow = `
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                0 6px 16px rgba(0, 0, 0, 0.5),
                0 3px 6px rgba(0, 0, 0, 0.3)
              `
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(145deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.8))'
              e.currentTarget.style.boxShadow = `
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                0 4px 12px rgba(0, 0, 0, 0.4),
                0 2px 4px rgba(0, 0, 0, 0.2)
              `
            }}
            aria-label="Abrir menu de navegação"
          >
            {/* Efeito de brilho interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg pointer-events-none" />
            {/* Ícone com efeito de profundidade */}
            <Menu className="h-5 w-5 relative z-10 drop-shadow-sm" />
          </Button>
        </div>
      </header>

      {/* Sidebar Mobile */}
      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
