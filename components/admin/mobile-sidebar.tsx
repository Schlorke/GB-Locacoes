'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PackageSearch,
  Settings,
  UserCircle,
  X,
  Package,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/equipamentos', icon: PackageSearch, label: 'Equipamentos' },
  { href: '/admin/categorias', icon: ListChecks, label: 'Categorias' },
  { href: '/admin/orcamentos', icon: FileText, label: 'Orçamentos' },
  { href: '/admin/rentals', icon: Package, label: 'Locações' },
  { href: '/admin/settings', icon: Settings, label: 'Configurações' },
]

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Bloquear scroll do body quando o sidebar estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[var(--layer-dialog-backdrop)] bg-black/80 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[var(--layer-dialog)] w-80 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{
          background:
            'linear-gradient(145deg, rgba(51, 65, 85, 0.95), rgba(30, 41, 59, 0.9))',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            -4px 0 20px rgba(0, 0, 0, 0.3),
            -2px 0 8px rgba(0, 0, 0, 0.2),
            inset 1px 0 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-black/20 transition-all duration-200 hover:scale-105 flex-shrink-0 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-lg pointer-events-none"></div>
                  <span className="relative z-10">GB</span>
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-white">GB Locações</h2>
                  <p className="text-sm text-slate-300">
                    Painel Administrativo
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 text-white hover:text-white relative overflow-hidden group transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(71, 85, 105, 0.8), rgba(51, 65, 85, 0.6))',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                    0 2px 8px rgba(0, 0, 0, 0.3)
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(145deg, rgba(71, 85, 105, 1), rgba(51, 65, 85, 0.8))'
                  e.currentTarget.style.boxShadow = `
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                    0 4px 12px rgba(0, 0, 0, 0.4)
                  `
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(145deg, rgba(71, 85, 105, 0.8), rgba(51, 65, 85, 0.6))'
                  e.currentTarget.style.boxShadow = `
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                    0 2px 8px rgba(0, 0, 0, 0.3)
                  `
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-lg pointer-events-none" />
                <X className="h-4 w-4 relative z-10 drop-shadow-sm" />
              </Button>
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname?.startsWith(item.href) || false

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium relative overflow-hidden group',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    )}
                    style={
                      isActive
                        ? {
                            background:
                              'linear-gradient(145deg, rgba(251, 146, 60, 0.9), rgba(234, 88, 12, 0.8))',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                        0 4px 12px rgba(251, 146, 60, 0.3)
                      `,
                          }
                        : {
                            background:
                              'linear-gradient(145deg, rgba(71, 85, 105, 0.3), rgba(51, 65, 85, 0.2))',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                        0 2px 8px rgba(0, 0, 0, 0.2)
                      `,
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          'linear-gradient(145deg, rgba(71, 85, 105, 0.5), rgba(51, 65, 85, 0.4))'
                        e.currentTarget.style.boxShadow = `
                          inset 0 1px 0 rgba(255, 255, 255, 0.2),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                          0 4px 12px rgba(0, 0, 0, 0.3)
                        `
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          'linear-gradient(145deg, rgba(71, 85, 105, 0.3), rgba(51, 65, 85, 0.2))'
                        e.currentTarget.style.boxShadow = `
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                          0 2px 8px rgba(0, 0, 0, 0.2)
                        `
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-lg pointer-events-none" />
                    <Icon className="h-5 w-5 flex-shrink-0 relative z-10 drop-shadow-sm" />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Seção do Usuário */}
          <div className="p-4 border-t border-white/10">
            <div
              className="flex items-center gap-3 mb-4 p-3 rounded-lg relative overflow-hidden group"
              style={{
                background:
                  'linear-gradient(145deg, rgba(71, 85, 105, 0.3), rgba(51, 65, 85, 0.2))',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 2px 8px rgba(0, 0, 0, 0.2)
                `,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-lg pointer-events-none" />
              <UserCircle className="h-10 w-10 ml-[0.2rem] text-slate-300 flex-shrink-0 relative z-10 drop-shadow-sm" />
              <div className="flex-1 min-w-0 relative z-10">
                <p className="font-medium text-white truncate">
                  {session?.user?.name || 'Administrador'}
                </p>
                <p className="text-sm text-slate-300 truncate">
                  {session?.user?.role || 'ADMIN'}
                </p>
              </div>
            </div>

            <Separator className="mb-4 bg-white/10" />

            <Button
              variant="ghost"
              onClick={() => {
                onClose()
                signOut({ callbackUrl: '/admin/login' })
              }}
              className="w-full justify-start gap-3 text-white hover:text-white relative overflow-hidden group transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  'linear-gradient(145deg, rgba(71, 85, 105, 0.3), rgba(51, 65, 85, 0.2))',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 2px 8px rgba(0, 0, 0, 0.2)
                `,
                color: 'white !important',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(145deg, rgba(71, 85, 105, 0.5), rgba(51, 65, 85, 0.4))'
                e.currentTarget.style.boxShadow = `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                  0 4px 12px rgba(0, 0, 0, 0.3)
                `
                e.currentTarget.style.color = 'white !important'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(145deg, rgba(71, 85, 105, 0.3), rgba(51, 65, 85, 0.2))'
                e.currentTarget.style.boxShadow = `
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 2px 8px rgba(0, 0, 0, 0.2)
                `
                e.currentTarget.style.color = 'white !important'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-lg pointer-events-none" />
              <LogOut className="h-5 w-5 relative z-10 drop-shadow-sm" />
              <span className="relative z-10">Sair do Sistema</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
