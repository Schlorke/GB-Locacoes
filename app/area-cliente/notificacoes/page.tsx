'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bell, 
  Check, 
  X, 
  Trash2, 
  ExternalLink, 
  Filter,
  Search,
  MoreVertical
} from 'lucide-react'
import { useNotifications, Notification } from '@/hooks/use-notifications'
import { NotificationDemo } from '@/components/notification-demo'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotificacoesPage() {
  const {
    notifications,
    unreadNotifications,
    stats,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  } = useNotifications()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'quote' | 'order' | 'payment' | 'equipment' | 'system'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest')

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Agora mesmo'
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d atrás`
    
    return date.toLocaleDateString('pt-BR')
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'quote':
        return '📋'
      case 'order':
        return '📦'
      case 'payment':
        return '💳'
      case 'equipment':
        return '🔧'
      case 'system':
        return '🔔'
      default:
        return '📢'
    }
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'quote':
        return 'Orçamento'
      case 'order':
        return 'Pedido'
      case 'payment':
        return 'Pagamento'
      case 'equipment':
        return 'Equipamento'
      case 'system':
        return 'Sistema'
      default:
        return 'Geral'
    }
  }

  // Filtrar e ordenar notificações
  const filteredNotifications = notifications
    .filter(notification => {
      // Filtro por texto
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          notification.title.toLowerCase().includes(searchLower) ||
          notification.message.toLowerCase().includes(searchLower)
        )
      }
      
      // Filtro por tipo
      if (filterType === 'unread') {
        return !notification.isRead
      }
      if (filterType !== 'all') {
        return notification.type === filterType
      }
      
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'newest':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notificações</h1>
          <p className="text-slate-600 mt-1">
            {stats.total} notificação{stats.total !== 1 ? 'ões' : ''} • {stats.unread} não lida{stats.unread !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {stats.unread > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
          
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar todas
            </Button>
          )}
        </div>
      </div>

      {/* Demo de Notificações */}
      <NotificationDemo />

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar notificações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            {/* Filtros */}
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Filtrar notificações por tipo"
              >
                <option value="all">Todas</option>
                <option value="unread">Não lidas</option>
                <option value="quote">Orçamentos</option>
                <option value="order">Pedidos</option>
                <option value="payment">Pagamentos</option>
                <option value="equipment">Equipamentos</option>
                <option value="system">Sistema</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Ordenar notificações"
              >
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigas</option>
                <option value="priority">Por prioridade</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Notificações */}
      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterType !== 'all' ? 'Nenhuma notificação encontrada' : 'Nenhuma notificação'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Você está em dia! Novas notificações aparecerão aqui.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              variants={itemVariants}
              className={cn(
                'p-4 border rounded-lg transition-all duration-200 hover:shadow-md',
                !notification.isRead 
                  ? 'bg-blue-50/50 border-blue-200' 
                  : 'bg-white border-gray-200'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className={cn(
                        'text-sm font-medium text-gray-900',
                        !notification.isRead && 'font-semibold'
                      )}>
                        {notification.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs px-2 py-0.5',
                          getPriorityColor(notification.priority)
                        )}
                      >
                        {notification.priority}
                      </Badge>
                      
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700"
                      >
                        {getTypeLabel(notification.type)}
                      </Badge>
                      
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <Link href={notification.actionUrl}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-3 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Ver detalhes
                          </Button>
                        </Link>
                      )}
                      
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-3 text-xs text-green-600 hover:text-green-700"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Marcar como lida
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-gray-400 hover:text-red-600"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
