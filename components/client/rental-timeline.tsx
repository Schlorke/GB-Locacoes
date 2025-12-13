'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  DollarSign,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  id: string
  type:
    | 'quote'
    | 'approved'
    | 'delivery'
    | 'active'
    | 'payment'
    | 'return'
    | 'completed'
  title: string
  description: string
  date: string
  completed: boolean
}

interface RentalTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const eventIcons = {
  quote: FileText,
  approved: CheckCircle,
  delivery: Truck,
  active: Package,
  payment: DollarSign,
  return: Truck,
  completed: CheckCircle,
}

const eventColors = {
  quote: 'bg-blue-500',
  approved: 'bg-green-500',
  delivery: 'bg-purple-500',
  active: 'bg-orange-500',
  payment: 'bg-green-500',
  return: 'bg-blue-500',
  completed: 'bg-gray-500',
}

export function RentalTimeline({ events, className }: RentalTimelineProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {events.map((event, index) => {
        const Icon = eventIcons[event.type] || Clock
        const isLast = index === events.length - 1

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4"
          >
            {/* Linha vertical */}
            {!isLast && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200" />
            )}

            {/* Ícone */}
            <div
              className={cn(
                'relative z-10 flex h-10 w-10 items-center justify-center rounded-full',
                event.completed ? eventColors[event.type] : 'bg-gray-300',
                event.completed && 'ring-2 ring-white'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5',
                  event.completed ? 'text-white' : 'text-gray-500'
                )}
              />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={cn(
                      'font-semibold',
                      event.completed ? 'text-gray-900' : 'text-gray-500'
                    )}
                  >
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {formatDate(event.date)}
                </span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
