'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

// Tipos
export type CategoryItem = {
  id: string
  name: string
  icon: React.ComponentType<{
    size?: number
    color?: string
    className?: string
  }>
}

export type TabConfig = {
  value: string
  label: string
  categories: CategoryItem[]
}

export type TabbedCategoryGridProps = {
  tabs: TabConfig[]
  defaultTab?: string
  onCategoryClickAction?: (_category: CategoryItem) => void
  className?: string
  gridCols?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
  }
}

// Componente de Card de Categoria
function CategoryCard({
  category,
  onClick,
}: {
  category: CategoryItem
  onClick?: (_category: CategoryItem) => void
}) {
  const Icon = category.icon

  return (
    <button
      onClick={() => onClick?.(category)}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl w-full"
    >
      {/* Ícone */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 p-3 shadow-lg transition-all duration-300 transform-gpu group-hover:scale-[1.04] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
        <Icon size={32} color="white" className="h-8 w-8" />
      </div>

      {/* Nome da categoria */}
      <span className="relative z-10 text-center text-sm font-semibold text-white transition-colors duration-300 group-hover:text-orange-400">
        {category.name}
      </span>
    </button>
  )
}

// Componente Principal
export function TabbedCategoryGrid({
  tabs,
  defaultTab,
  onCategoryClickAction,
  className = '',
  gridCols = {
    base: 2,
    sm: 3,
    md: 4,
    lg: 5,
  },
}: TabbedCategoryGridProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value || '')
  const [filterKey, setFilterKey] = useState(0)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setFilterKey((prev) => prev + 1)
  }

  // Grid classes baseadas nas props
  const baseClass = `grid-cols-${gridCols.base || 2}`
  const smClass = gridCols.sm ? `sm:grid-cols-${gridCols.sm}` : ''
  const mdClass = gridCols.md ? `md:grid-cols-${gridCols.md}` : ''
  const lgClass = gridCols.lg ? `lg:grid-cols-${gridCols.lg}` : ''
  const gridClasses =
    `grid gap-4 ${baseClass} ${smClass} ${mdClass} ${lgClass}`.trim()

  return (
    <div className={className}>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        {/* Lista de Abas - Estilo Fichário */}
        <TabsList className="w-full bg-transparent border-slate-200 p-0 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative rounded-none bg-transparent px-6 py-3 text-base font-medium transition-all duration-200 group flex-1 data-[state=active]:bg-transparent data-[state=active]:text-orange-600 data-[state=active]:font-bold data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:text-orange-600"
            >
              {tab.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transition-transform duration-300 origin-center ${
                  activeTab === tab.value
                    ? 'transform scale-x-100'
                    : 'transform scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Conteúdo: Grid de Categorias */}
        <div className={`mt-8 ${gridClasses}`}>
          <AnimatePresence mode="wait">
            {tabs
              .find((tab) => tab.value === activeTab)
              ?.categories.map((category, index) => (
                <motion.div
                  key={`${category.id}-${filterKey}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="group"
                >
                  <CategoryCard
                    category={category}
                    onClick={onCategoryClickAction}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  )
}
