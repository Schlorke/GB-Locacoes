'use client'

import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import { useNotifications } from '@/hooks/use-notifications'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClientAreaBadge } from '@/components/ui/client-area-badge'
import {
  Bell,
  Check,
  ExternalLink,
  Settings,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Mock data para notificações
const mockNotifications = [
  {
    id: '1',
    title: 'Orçamento Aprovado',
    message: 'Seu orçamento #ORD-001 foi aprovado e está pronto para locação.',
    type: 'quote' as const,
    priority: 'high' as const,
    isRead: false,
    createdAt: '2024-01-20T10:30:00Z',
    actionUrl: '/area-cliente/orcamentos',
  },
  {
    id: '2',
    title: 'Equipamento Disponível',
    message:
      'A Betoneira 400L que você solicitou está disponível para retirada.',
    type: 'equipment' as const,
    priority: 'medium' as const,
    isRead: false,
    createdAt: '2024-01-19T14:20:00Z',
    actionUrl: '/equipamentos/betoneira-400l',
  },
  {
    id: '3',
    title: 'Pagamento Processado',
    message: 'Pagamento de R$ 350,00 processado com sucesso.',
    type: 'payment' as const,
    priority: 'low' as const,
    isRead: true,
    createdAt: '2024-01-18T16:45:00Z',
  },
  {
    id: '4',
    title: 'Manutenção Programada',
    message: 'Sistema em manutenção programada hoje das 02:00 às 04:00.',
    type: 'system' as const,
    priority: 'medium' as const,
    isRead: true,
    createdAt: '2024-01-17T08:00:00Z',
  },
]

interface Notification {
  id: string
  title: string
  message: string
  type: 'budget' | 'equipment' | 'system' | 'quote' | 'payment'
  priority: 'high' | 'medium' | 'low'
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  getNotificationIcon: (
    type: string
  ) => React.ComponentType<{ className?: string }>
  getPriorityColor: (priority: string) => string
  getTypeLabel: (type: string) => string
  formatTimeAgo: (date: string) => string
}

// Componente de notificação individual com animação controlada
function NotificationCard({
  notification,
  onMarkAsRead,
  getNotificationIcon,
  getPriorityColor,
  getTypeLabel,
  formatTimeAgo,
}: NotificationCardProps) {
  const [showOrange, setShowOrange] = useState(!notification.isRead)

  const handleMarkAsRead = () => {
    if (!notification.isRead) {
      setShowOrange(false)
      onMarkAsRead(notification.id)
    }
  }

  const Icon = getNotificationIcon(notification.type)

  return (
    <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group relative z-0 bg-white">
      {/* Background laranja com transição de opacidade */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl transition-opacity duration-1000 ease-in-out bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 ',
          showOrange ? 'opacity-100' : 'opacity-0'
        )}
      />
      {/* Conteúdo da notificação */}
      <div className="relative z-10">
        <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  {notification.title}
                </h4>
                <div className="flex items-center gap-2">
                  <ClientAreaBadge
                    className={cn(getPriorityColor(notification.priority))}
                  >
                    {notification.priority}
                  </ClientAreaBadge>
                  <ClientAreaBadge
                    variant="outline"
                    className="bg-gray-100 text-gray-700"
                  >
                    {getTypeLabel(notification.type)}
                  </ClientAreaBadge>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {notification.message}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(notification.createdAt)}
                </span>
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                  {notification.actionUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 min-w-0 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <Link href={notification.actionUrl}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                  )}
                  {!notification.isRead && (
                    <Button
                      size="sm"
                      onClick={handleMarkAsRead}
                      className="flex-1 min-w-0 bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Lido
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotificacoesPage() {
  // const { data: session } = useSession()
  // TODO: Use session data for user-specific notifications
  const { markAsRead: markNotificationAsRead } = useNotifications()
  const [localNotifications, setLocalNotifications] =
    useState(mockNotifications)

  // Inicializar contador de notificações não lidas
  useEffect(() => {
    const unreadCount = localNotifications.filter((n) => !n.isRead).length
    localStorage.setItem('gb-locacoes-unread-count', unreadCount.toString())
  }, [localNotifications])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return CheckCircle
      case 'equipment':
        return Settings
      case 'payment':
        return CheckCircle
      case 'system':
        return AlertCircle
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'quote':
        return 'Orçamento'
      case 'equipment':
        return 'Equipamento'
      case 'payment':
        return 'Pagamento'
      case 'system':
        return 'Sistema'
      default:
        return 'Geral'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    )

    if (diffInMinutes < 1) return 'Agora mesmo'
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`
    return `${Math.floor(diffInMinutes / 1440)}d atrás`
  }

  const markAsRead = (id: string) => {
    // Marcar no hook global (para sincronizar com header e layout)
    markNotificationAsRead(id)

    // Marcar no estado local também
    setLocalNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )

      // Atualizar contador de não lidas no localStorage
      const unreadCount = updated.filter((n) => !n.isRead).length
      localStorage.setItem('gb-locacoes-unread-count', unreadCount.toString())

      return updated
    })
  }

  // Disparar evento quando o contador muda
  useEffect(() => {
    const unreadCount = localNotifications.filter((n) => !n.isRead).length
    const event = new CustomEvent('notificationUpdate', {
      detail: { unreadCount },
    })
    window.dispatchEvent(event)
  }, [localNotifications])

  const filteredNotifications = localNotifications

  return (
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      {/* Hero Section com Identidade Visual Completa */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
        {/* Elementos animados de background removidos nesta seção da área do cliente */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-14 relative z-10">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight">Notificações</h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
              Mantenha-se atualizado com todas as suas notificações
            </p>
          </motion.div>
        </div>

        {/* Onda SVG no final */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="relative block w-full h-6"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Dashboard Principal - LAYOUT OTIMIZADO */}
      <section className="py-12 md:py-16 lg:py-10 relative -mt-20 md:-mt-24">
        <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Lista de Notificações */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <Bell className="h-5 w-5" />
                  </div>
                  Lista de Notificações
                </CardTitle>
                <CardDescription>
                  {filteredNotifications.length} notificação(ões) encontrada(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-0 pt-0">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-6">
                    {filteredNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        getNotificationIcon={getNotificationIcon}
                        getPriorityColor={getPriorityColor}
                        getTypeLabel={getTypeLabel}
                        formatTimeAgo={formatTimeAgo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Bell className="h-16 w-16 text-gray-300" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Nenhuma notificação
                    </h3>
                    <p className="text-xl md:text-2xl text-gray-500 mb-8 leading-relaxed">
                      Você está em dia! Novas notificações aparecerão aqui.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
