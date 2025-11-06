'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { animate, AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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
      className="group relative flex flex-col items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl w-full h-[120px]"
    >
      {/* Ícone */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 shadow-lg transition-all duration-300 transform-gpu group-hover:scale-[1.04] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
        <Icon size={28} color="white" className="h-7 w-7" />
      </div>

      {/* Nome da categoria */}
      <span className="relative z-10 text-center text-xs font-semibold text-white transition-colors duration-300 group-hover:text-orange-400 line-clamp-2">
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
  const [direction, setDirection] = useState(0)

  // Motion value para controlar o movimento visual durante o arrasto
  const dragX = useMotionValue(0)

  // Ref para o container das tabs
  const tabsListRef = useRef<HTMLDivElement>(null)

  // Flag para evitar animação na primeira renderização
  const hasMountedRef = useRef(false)

  // Função para rolar a tab ativa para o centro (somente eixo horizontal)
  const scrollTabIntoView = (
    tabValue: string,
    options: { smooth?: boolean } = {}
  ) => {
    const container = tabsListRef.current
    if (!container) return

    const tabElement = container.querySelector(
      `[data-value="${tabValue}"]`
    ) as HTMLElement | null

    if (!tabElement) return

    const totalScrollableWidth = container.scrollWidth - container.clientWidth
    const hasHorizontalOverflow = totalScrollableWidth > 0

    if (!hasHorizontalOverflow) return

    const containerRect = container.getBoundingClientRect()
    const tabRect = tabElement.getBoundingClientRect()

    const isFullyVisible =
      tabRect.left >= containerRect.left && tabRect.right <= containerRect.right

    // Se já estiver visível, não movimenta para evitar jitter
    if (isFullyVisible) return

    const currentScrollLeft = container.scrollLeft
    const centerOffset =
      tabRect.left -
      containerRect.left -
      (container.clientWidth - tabRect.width) / 2

    const targetScrollLeft = currentScrollLeft + centerOffset
    const clampedScrollLeft = Math.min(
      Math.max(targetScrollLeft, 0),
      totalScrollableWidth
    )

    container.scrollTo({
      left: clampedScrollLeft,
      behavior: options.smooth ? 'smooth' : 'auto',
    })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setFilterKey((prev) => prev + 1)
  }

  // Função para navegar entre tabs
  // Agora aceita dois parâmetros:
  // - navDirection: direção da navegação no array (+1 = próxima, -1 = anterior)
  // - gestureDirection: direção do gesto físico (-1 = esquerda, +1 = direita)
  const navigateTab = (navDirection: number, gestureDirection: number) => {
    const currentIndex = tabs.findIndex((t) => t.value === activeTab)
    const newIndex = currentIndex + navDirection
    const newTab = tabs[newIndex]

    if (newTab) {
      setDirection(gestureDirection) // Usa direção do GESTO para animação
      handleTabChange(newTab.value)
    }
  }

  // Centralizar tab ativa ao montar o componente (sem animação no primeiro render)
  useEffect(() => {
    scrollTabIntoView(activeTab, { smooth: hasMountedRef.current })
    hasMountedRef.current = true
  }, [activeTab])

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
        {/* Lista de Abas - Estilo Fichário com scroll horizontal no mobile */}
        <div className="relative w-full">
          {/* Gradiente indicador de scroll à esquerda (mobile) */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 md:hidden" />

          {/* Gradiente indicador de scroll à direita (mobile) */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden" />

          <TabsList
            ref={tabsListRef}
            className="w-full bg-transparent border-slate-200 p-0 h-auto overflow-x-auto md:overflow-x-visible scrollbar-hide"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-value={tab.value}
                className="relative rounded-none bg-transparent px-6 py-3 text-base font-medium transition-all duration-200 group flex-shrink-0 md:flex-1 data-[state=active]:bg-transparent data-[state=active]:text-orange-600 data-[state=active]:font-bold data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:text-orange-600"
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
        </div>

        {/* Conteúdo: Grid de Categorias com Swipe Navigation */}
        <motion.div
          className={`mt-8 ${gridClasses}`}
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_event, info) => {
            const swipeThreshold = 50
            const swipeVelocityThreshold = 500

            // Swipe left (arrasta para esquerda, gesto negativo)
            if (
              info.offset.x < -swipeThreshold ||
              info.velocity.x < -swipeVelocityThreshold
            ) {
              navigateTab(1, -1) // nav: +1 (próxima), gesto: -1 (esquerda)
            }
            // Swipe right (arrasta para direita, gesto positivo)
            else if (
              info.offset.x > swipeThreshold ||
              info.velocity.x > swipeVelocityThreshold
            ) {
              navigateTab(-1, 1) // nav: -1 (anterior), gesto: +1 (direita)
            }

            // Voltar o container ao centro após o arrasto
            animate(dragX, 0, {
              type: 'spring',
              stiffness: 300,
              damping: 30,
            })
          }}
        >
          {/* Mantém a animação original com AnimatePresence */}
          <AnimatePresence mode="wait">
            {tabs
              .find((tab) => tab.value === activeTab)
              ?.categories.map((category, index) => (
                <motion.div
                  key={`${category.id}-${filterKey}`}
                  // CORREÇÃO: Invertemos os sinais para que a animação siga o gesto
                  // - INITIAL: entra do lado oposto ao gesto (sinal negativo)
                  // - EXIT: sai seguindo o gesto (sinal positivo)
                  initial={{ opacity: 0, x: -direction * 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * 50, scale: 0.95 }}
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
        </motion.div>
      </Tabs>
    </div>
  )
}
