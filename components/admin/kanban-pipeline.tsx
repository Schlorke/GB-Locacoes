'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

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
  const itemsByStatus = useMemo(() => {
    return Object.keys(statusConfig).reduce(
      (acc, status) => {
        acc[status] = items.filter((item) => item.status === status)
        return acc
      },
      {} as Record<string, T[]>
    )
  }, [items, statusConfig])

  // Estado intermediário para cada coluna (uma por status)
  const [displayedItems, setDisplayedItems] =
    useState<Record<string, T[]>>(itemsByStatus)

  // Refs para armazenar itens pendentes de cada coluna
  const pendingItemsRef = useRef<Record<string, T[] | null>>({})

  // Sincronizar displayedItems quando itemsByStatus muda sem criar loop de estado:
  // - Se a coluna tinha itens, esvaziamos para disparar exit; o pending entra no onExitComplete
  // - Se a coluna estava vazia, atualizamos direto
  useEffect(() => {
    setDisplayedItems((prev) => {
      let changed = false
      const nextDisplayed: Record<string, T[]> = { ...prev }

      Object.keys(statusConfig).forEach((status) => {
        const current = prev[status] ?? []
        const next = itemsByStatus[status] ?? []

        const same =
          current.length === next.length &&
          current.every((item, idx) => item.id === next[idx]?.id)

        if (same) {
          nextDisplayed[status] = current
          return
        }

        changed = true

        if (current.length > 0) {
          pendingItemsRef.current[status] = next
          // Disparar exit (AnimatePresence mode="wait" garante que a entrada só vem depois)
          nextDisplayed[status] = []
          return
        }

        // Coluna vazia → atualiza imediatamente (enter)
        nextDisplayed[status] = next
      })

      return changed ? nextDisplayed : prev
    })
  }, [itemsByStatus, statusConfig])

  const handleExitComplete = (status: string) => {
    const pending = pendingItemsRef.current[status]
    if (pending) {
      pendingItemsRef.current[status] = null
      setDisplayedItems((prev) => ({
        ...prev,
        [status]: pending,
      }))
    }
  }

  const gridCols = `grid-cols-${columnsPerRow.mobile || 1} md:grid-cols-${columnsPerRow.tablet || 3} lg:grid-cols-${columnsPerRow.desktop || 3} xl:grid-cols-${columnsPerRow.xl || 6}`

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {Object.entries(statusConfig).map(([status, config]) => {
        const statusItems = itemsByStatus[status] || []
        const displayedStatusItems = displayedItems[status] || []
        const Icon = config.icon

        return (
          <Card key={status} className="bg-white shadow-lg border-0">
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
              <div
                className="space-y-2 max-h-[600px] overflow-visible pr-2 py-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-orange-500 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-orange-600 [&::-webkit-scrollbar-button]:bg-orange-500"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgb(249 115 22) transparent',
                }}
              >
                <AnimatePresence
                  mode="wait"
                  onExitComplete={() => handleExitComplete(status)}
                >
                  {Array.isArray(displayedStatusItems) &&
                    displayedStatusItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        custom={{ index }}
                        variants={{
                          hidden: ({ index: idx }: { index: number }) => ({
                            opacity: 0,
                            x: -16,
                            y: 10,
                            transition: {
                              duration: 0.24,
                              delay: idx * 0.055,
                            },
                          }),
                          show: ({ index: idx }: { index: number }) => ({
                            opacity: 1,
                            x: 0,
                            y: 0,
                            transition: {
                              duration: 0.24,
                              delay: idx * 0.055,
                            },
                          }),
                          exit: ({ index: idx }: { index: number }) => ({
                            opacity: 0,
                            y: -10,
                            transition: {
                              duration: 0.18,
                              // Stagger normal na saída (primeiro sai primeiro, de cima para baixo)
                              delay: idx * 0.04,
                            },
                          }),
                        }}
                        initial="hidden"
                        animate="show"
                        exit="exit"
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
