'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, X, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNotifications, Notification } from '@/hooks/use-notifications'
import { NotificationBadge } from './notification-badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NotificationDropdownProps {
  className?: string
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const {
    notifications,
    stats,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotifications()

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    )

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

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        <Bell className="h-5 w-5" />
        <NotificationBadge
          count={stats.unread}
          variant="pulse"
          size="sm"
          className="-top-1 -right-1"
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 z-50"
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notificações</CardTitle>
                  <div className="flex items-center gap-2">
                    {stats.unread > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs h-7"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Marcar todas
                      </Button>
                    )}
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-xs h-7 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Limpar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhuma notificação</p>
                    <p className="text-sm">Você está em dia!</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.slice(0, 10).map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={cn(
                          'p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors',
                          !notification.isRead && 'bg-blue-50/50'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4
                                className={cn(
                                  'text-sm font-medium text-gray-900',
                                  !notification.isRead && 'font-semibold'
                                )}
                              >
                                {notification.title}
                              </h4>

                              <div className="flex items-center gap-1">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs px-2 py-0.5',
                                    getPriorityColor(notification.priority)
                                  )}
                                >
                                  {notification.priority}
                                </Badge>

                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-400">
                                {formatTimeAgo(notification.createdAt)}
                              </span>

                              <div className="flex items-center gap-1">
                                {notification.actionUrl && (
                                  <Link href={notification.actionUrl}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs"
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Ver
                                    </Button>
                                  </Link>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                                  onClick={() =>
                                    removeNotification(notification.id)
                                  }
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {notifications.length > 10 && (
                      <div className="p-4 text-center">
                        <Button variant="ghost" size="sm" className="text-xs">
                          Ver todas as notificações
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
