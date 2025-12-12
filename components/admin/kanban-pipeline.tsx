'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import type React from 'react'

export interface KanbanStatusConfig {
  key: string
  label: string
  color: string
  icon: LucideIcon
  gradient: string
}

export interface KanbanItem {
  id: string
  status: string
  [key: string]: unknown
}

export interface KanbanPipelineProps<T extends KanbanItem> {
  items: T[]
  statusConfig: Record<string, KanbanStatusConfig>
  renderItem: (_item: T) => React.ReactNode
  onItemClick?: (_item: T) => void
  className?: string
  columnsPerRow?: {
    mobile?: number
    tablet?: number
    desktop?: number
    xl?: number
  }
}

export function KanbanPipeline<T extends KanbanItem>({
  items,
  statusConfig,
  renderItem,
  onItemClick,
  className = '',
  columnsPerRow = {
    mobile: 1,
    tablet: 3,
    desktop: 3,
    xl: 6,
  },
}: KanbanPipelineProps<T>) {
  // Agrupar itens por status
  const itemsByStatus = Object.keys(statusConfig).reduce(
    (acc, status) => {
      acc[status] = items.filter((item) => item.status === status)
      return acc
    },
    {} as Record<string, T[]>
  )

  const gridCols = `grid-cols-${columnsPerRow.mobile || 1} md:grid-cols-${columnsPerRow.tablet || 3} lg:grid-cols-${columnsPerRow.desktop || 3} xl:grid-cols-${columnsPerRow.xl || 6}`

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {Object.entries(statusConfig).map(([status, config]) => {
        const statusItems = itemsByStatus[status] || []
        const Icon = config.icon

        return (
          <Card key={status} className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{config.label}</h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {statusItems.length}
                </Badge>
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                  {statusItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={
                        onItemClick ? 'cursor-pointer transition-colors' : ''
                      }
                      onClick={() => onItemClick?.(item)}
                    >
                      {renderItem(item)}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

