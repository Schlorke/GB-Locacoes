'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  User,
  FileText,
  Clock,
  Phone,
  Settings,
  Bell,
  Home,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function AreaClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Só redirecionar se não estiver carregando e não houver sessão
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router])

  // Escutar mudanças nas notificações via evento customizado
  useEffect(() => {
    const handleNotificationUpdate = (e: CustomEvent) => {
      setUnreadNotifications(e.detail.unreadCount)
    }

    // Escutar evento customizado para atualização imediata
    window.addEventListener(
      'notificationUpdate',
      handleNotificationUpdate as EventListener
    )

    // Verificar valor inicial
    const unreadCount = localStorage.getItem('gb-locacoes-unread-count')
    if (unreadCount) {
      setUnreadNotifications(parseInt(unreadCount))
    }

    return () => {
      window.removeEventListener(
        'notificationUpdate',
        handleNotificationUpdate as EventListener
      )
    }
  }, [])

  // Altura do header fixo (top bar ~40px + main header 64px = 104px)
  const HEADER_HEIGHT = 104

  // Função para fazer scroll para o banner com retry
  const scrollToBanner = (maxRetries = 10, delay = 50) => {
    let retries = 0

    const tryScroll = () => {
      const element = document.getElementById('dashboard-banner')
      if (element) {
        const elementPosition = element.offsetTop
        const offsetPosition = elementPosition - HEADER_HEIGHT

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        return true
      }

      retries++
      if (retries < maxRetries) {
        setTimeout(tryScroll, delay)
      }
      return false
    }

    // Primeiro aguardar um frame para garantir que o DOM está pronto
    requestAnimationFrame(() => {
      setTimeout(tryScroll, delay)
    })
  }

  // Ajustar scroll quando o pathname muda (navegação entre páginas)
  // Apenas no modo mobile
  useEffect(() => {
    if (!isMobile) return // Não fazer scroll no desktop

    const adjustScrollAfterLoad = sessionStorage.getItem(
      'adjustScrollAfterLoad'
    )
    if (adjustScrollAfterLoad) {
      sessionStorage.removeItem('adjustScrollAfterLoad')
      scrollToBanner()
    }
  }, [pathname, isMobile]) // Re-executa quando o pathname muda ou quando isMobile muda

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            Carregando sua área...
          </p>
        </motion.div>
      </div>
    )
  }

  // Só renderizar se tiver sessão válida
  if (status === 'unauthenticated' || !session) {
    return null
  }

  const navigationItems = [
    {
      href: '/area-cliente',
      icon: Home,
      label: 'Dashboard',
      isActive: pathname === '/area-cliente',
    },
    {
      href: '/area-cliente/notificacoes',
      icon: Bell,
      label: 'Notificações',
      isActive: pathname === '/area-cliente/notificacoes',
    },
    {
      href: '/area-cliente/perfil',
      icon: User,
      label: 'Meu Perfil',
      isActive: pathname === '/area-cliente/perfil',
    },
    {
      href: '/area-cliente/orcamentos',
      icon: FileText,
      label: 'Meus Orçamentos',
      isActive: pathname.startsWith('/area-cliente/orcamentos'),
    },
    {
      href: '/area-cliente/historico',
      icon: Clock,
      label: 'Histórico',
      isActive:
        pathname === '/area-cliente/historico' ||
        pathname.startsWith('/area-cliente/historico/'),
    },
    {
      href: '/area-cliente/enderecos',
      icon: Settings,
      label: 'Endereços',
      isActive: pathname === '/area-cliente/enderecos',
    },
    {
      href: '/contato',
      icon: Phone,
      label: 'Suporte',
      isActive: pathname === '/contato',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com Identidade Visual */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-30"></div>

                {/* Header da Sidebar */}
                <div className="relative z-10 p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Área do Cliente
                      </h3>
                      <p className="text-xs text-gray-500">
                        {session?.user?.name || 'Cliente'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navegação */}
                <CardContent className="p-0 relative z-10">
                  <nav className="space-y-1 p-4">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 ${
                            item.isActive
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                          }`}
                          onClick={(e) => {
                            // Apenas fazer scroll no modo mobile
                            if (!isMobile) return

                            // Se for a mesma página, fazer scroll suave para o banner
                            if (item.href === pathname) {
                              e.preventDefault()
                              scrollToBanner(1, 0) // Imediato, sem retry
                            } else {
                              // Navegando para outra página: marcar para ajustar scroll após carregar
                              sessionStorage.setItem(
                                'adjustScrollAfterLoad',
                                'dashboard-banner'
                              )
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <item.icon
                                className={`h-5 w-5 transition-colors duration-200 ${
                                  item.isActive
                                    ? 'text-white'
                                    : 'text-gray-500 group-hover:text-orange-600'
                                }`}
                              />
                              {/* Badge de notificação não lida */}
                              {item.href === '/area-cliente/notificacoes' &&
                                unreadNotifications > 0 && (
                                  <div className="absolute -top-[0.29rem] right-[0rem] w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                                )}
                            </div>
                            <span>{item.label}</span>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 transition-colors duration-200 ${
                              item.isActive
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-orange-600'
                            }`}
                          />
                        </Link>
                      </motion.div>
                    ))}

                    {/* Separador */}
                    <div className="my-4 border-t border-gray-200"></div>

                    {/* Logout */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: navigationItems.length * 0.1,
                      }}
                    >
                      <button
                        onClick={() => router.push('/api/auth/signout')}
                        className="group flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 rounded-xl transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="h-5 w-5 text-gray-500 group-hover:text-orange-600 transition-colors duration-200" />
                          <span>Sair</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 transition-colors duration-200" />
                      </button>
                    </motion.div>
                  </nav>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Content com Animações */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
