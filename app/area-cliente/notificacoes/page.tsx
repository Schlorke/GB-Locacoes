'use client'

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Bell,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Settings,
  CheckCircle,
  Clock,
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

type FilterType =
  | 'all'
  | 'unread'
  | 'quote'
  | 'order'
  | 'payment'
  | 'equipment'
  | 'system'

export default function NotificacoesPage() {
  // const { data: session } = useSession()
  // TODO: Use session data for user-specific notifications
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [notifications, setNotifications] = useState(mockNotifications)

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
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'unread' && !notification.isRead) ||
      notification.type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    high: notifications.filter((n) => n.priority === 'high').length,
    medium: notifications.filter((n) => n.priority === 'medium').length,
  }

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
          {/* Stats Grid - 1 coluna em mobile, 4 colunas em desktop */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 items-stretch"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Card Total */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.total}
                    </p>
                    <p className="text-sm text-gray-500">notificações</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <Bell className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Não Lidas */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Não Lidas
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.unread}
                    </p>
                    <p className="text-sm text-gray-500">pendentes</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Alta Prioridade */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Prioritárias
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stats.high}
                    </p>
                    <p className="text-sm text-gray-500">importantes</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Configurações */}
            <div className="relative overflow-hidden h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white/95">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between h-full">
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Sistema
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {notifications.filter((n) => n.type === 'system').length}
                    </p>
                    <p className="text-sm text-gray-500">do sistema</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white group-hover:scale-110 transition-transform self-center">
                    <Settings className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Seções Principais - Layout Proporcional à linha superior */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Filtros e Busca */}
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <Search className="h-5 w-5" />
                  </div>
                  Filtros e Busca
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0 flex flex-col flex-1">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <Label
                      htmlFor="search"
                      className="text-sm font-medium text-gray-700"
                    >
                      Buscar Notificação
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Título ou mensagem..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="filter"
                      className="text-sm font-medium text-gray-700"
                    >
                      Filtrar por Tipo
                    </Label>
                    <Select
                      value={filterType}
                      onValueChange={(value: FilterType) =>
                        setFilterType(value)
                      }
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Filtrar por tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="unread">Não lidas</SelectItem>
                        <SelectItem value="quote">Orçamentos</SelectItem>
                        <SelectItem value="equipment">Equipamentos</SelectItem>
                        <SelectItem value="payment">Pagamentos</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <Settings className="h-5 w-5" />
                  </div>
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0 flex flex-col flex-1">
                <div className="space-y-4 flex-1">
                  {stats.unread > 0 && (
                    <Button
                      onClick={markAllAsRead}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Marcar Todas como Lidas
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Configurar Notificações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lista de Notificações */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg text-white">
                    <Bell className="h-5 w-5" />
                  </div>
                  Lista de Notificações
                </CardTitle>
                <CardDescription>
                  {filteredNotifications.length} notificação(ões) encontrada(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => {
                      const Icon = getNotificationIcon(notification.type)
                      return (
                        <div
                          key={notification.id}
                          className={cn(
                            'p-6 bg-gradient-to-r rounded-xl transition-all duration-300 border',
                            !notification.isRead
                              ? 'from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200'
                              : 'from-gray-50 to-gray-100 border-gray-200 hover:from-orange-50 hover:to-orange-100 hover:border-orange-200'
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h4
                                    className={cn(
                                      'font-semibold text-gray-900',
                                      !notification.isRead && 'font-bold'
                                    )}
                                  >
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={getPriorityColor(
                                        notification.priority
                                      )}
                                    >
                                      {notification.priority}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-gray-100 text-gray-700"
                                    >
                                      {getTypeLabel(notification.type)}
                                    </Badge>
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
                                  <div className="flex items-center gap-2">
                                    {notification.actionUrl && (
                                      <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300"
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
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
                                        variant="outline"
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
                                        className="bg-white hover:bg-green-50 text-gray-900 hover:text-green-600 font-semibold rounded-lg transition-all duration-300"
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Ler
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        removeNotification(notification.id)
                                      }
                                      className="bg-white hover:bg-red-50 text-red-600 hover:text-red-700 font-semibold rounded-lg transition-all duration-300"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">
                      {searchTerm || filterType !== 'all'
                        ? 'Nenhuma notificação encontrada'
                        : 'Nenhuma notificação'}
                    </p>
                    <p className="text-gray-400">
                      {searchTerm || filterType !== 'all'
                        ? 'Tente ajustar os filtros de busca'
                        : 'Você está em dia! Novas notificações aparecerão aqui.'}
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
