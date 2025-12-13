'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ChevronsLeft,
  ChevronsRight,
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PackageSearch,
  Settings,
  UserCircle,
  Package,
  DollarSign,
  Wrench,
  Truck,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface AdminSidebarProps {
  onCollapseChange?: (_collapsed: boolean) => void
}

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/equipamentos', icon: PackageSearch, label: 'Equipamentos' },
  { href: '/admin/categorias', icon: ListChecks, label: 'Categorias' },
  { href: '/admin/orcamentos', icon: FileText, label: 'Orçamentos' },
  { href: '/admin/rentals', icon: Package, label: 'Locações' },
  { href: '/admin/financial', icon: DollarSign, label: 'Financeiro' },
  { href: '/admin/maintenance', icon: Wrench, label: 'Manutenção' },
  { href: '/admin/logistics', icon: Truck, label: 'Logística' },
  { href: '/admin/settings', icon: Settings, label: 'Configurações' },
]

export default function AdminSidebar({ onCollapseChange }: AdminSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(isSidebarCollapsed)
  }, [isSidebarCollapsed, onCollapseChange])

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const SidebarContent = () => (
    <>
      <div
        className={cn(
          'border-b border-white/10 transition-all duration-300',
          isSidebarCollapsed ? 'p-4' : 'p-3 sm:p-4'
        )}
      >
        <Link
          href="/"
          className={cn(
            'flex items-center transition-all duration-300',
            isSidebarCollapsed ? 'justify-center w-full' : 'gap-2'
          )}
        >
          {isSidebarCollapsed ? (
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-lg pointer-events-none"></div>
              <span className="relative z-10">GB</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 flex-shrink-0 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-lg pointer-events-none"></div>
                <span className="relative z-10">GB</span>
              </div>
              <div className="overflow-hidden transition-all duration-300 ease-in-out flex flex-col min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-white whitespace-nowrap mt-0.5">
                  GB Locações
                </h2>
                <p className="text-xs text-slate-400 whitespace-nowrap">
                  Admin Panel
                </p>
              </div>
            </>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname?.startsWith(item.href) || false

            return (
              <li key={item.href} className="list-none">
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out group text-[15px] relative overflow-hidden',
                    'hover:scale-[1.02] active:scale-[0.98]',
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white',
                    isSidebarCollapsed
                      ? 'justify-center gap-0'
                      : 'justify-start gap-3'
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
                  <Icon
                    className={cn(
                      'h-4 w-4 flex-shrink-0 relative z-10 drop-shadow-sm',
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-white'
                    )}
                  />
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      isSidebarCollapsed
                        ? 'w-0 opacity-0'
                        : 'w-auto opacity-100'
                    )}
                  >
                    <span className="font-medium whitespace-nowrap relative z-10">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div
        className={cn(
          'border-t border-white/10 mt-auto',
          isSidebarCollapsed ? 'px-3 py-3' : 'p-3 sm:p-4'
        )}
      >
        <div
          className={cn(
            'flex items-center min-w-0 mb-3 w-full p-3 rounded-lg relative overflow-hidden group',
            isSidebarCollapsed ? 'justify-center gap-0' : 'justify-start gap-3'
          )}
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
          <UserCircle className="h-8 w-8 text-slate-300 flex-shrink-0 relative z-10 drop-shadow-sm" />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out flex flex-col min-w-0 relative z-10',
              isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            <p className="text-sm font-medium text-white whitespace-nowrap">
              {session?.user?.name || 'Administrador'}
            </p>
            <p className="text-xs text-slate-300 whitespace-nowrap">
              {session?.user?.role || 'ADMIN'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className={cn(
            'flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] w-full group text-[15px] relative overflow-hidden',
            'text-white hover:text-white',
            isSidebarCollapsed ? 'justify-center gap-0' : 'justify-start gap-3'
          )}
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
          title="Sair"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-lg pointer-events-none" />
          <LogOut className="h-4 w-4 relative z-10 drop-shadow-sm" />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            <span className="font-medium whitespace-nowrap relative z-10">
              Sair
            </span>
          </div>
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex md:flex-col text-white transition-all duration-300 ease-in-out relative admin-sidebar-dark z-[var(--layer-sticky)]',
          isSidebarCollapsed ? 'w-20' : 'w-56 lg:w-64'
        )}
        style={{
          background:
            'linear-gradient(145deg, rgba(30, 41, 59, 0.98), rgba(20, 31, 45, 0.95))',
          backgroundColor: 'rgba(30, 41, 59, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
              -4px 0 20px rgba(0, 0, 0, 0.4),
              -2px 0 8px rgba(0, 0, 0, 0.3),
              inset 1px 0 0 rgba(255, 255, 255, 0.08)
            `,
          position: 'relative',
          zIndex: 'var(--layer-sticky)',
        }}
      >
        <SidebarContent />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapse}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 text-white hover:text-white rounded-full h-10 w-10 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-[var(--layer-fab)] overflow-hidden group"
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
          title={isSidebarCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full pointer-events-none" />
          {isSidebarCollapsed ? (
            <ChevronsRight className="h-4 w-4 relative z-10 drop-shadow-sm" />
          ) : (
            <ChevronsLeft className="h-4 w-4 relative z-10 drop-shadow-sm" />
          )}
        </Button>
      </aside>
    </>
  )
}
