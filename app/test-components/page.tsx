'use client'

import {
  Bolt,
  Building2,
  Factory,
  Hammer,
  Leaf,
  Package,
  Plug,
  Sparkles,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { useRef, useState } from 'react'

import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

type CategoryItem = {
  icon: LucideIcon
  label: string
}

type TabSection = {
  id: string
  label: string
  accent: 'orange' | 'sky' | 'emerald'
  items: CategoryItem[]
}

const TAB_SECTIONS: TabSection[] = [
  {
    id: 'categorias',
    label: 'Categorias',
    accent: 'orange',
    items: [
      { icon: Package, label: 'Acesso e elevação' },
      { icon: Building2, label: 'Andaimes' },
      { icon: Truck, label: 'Compactação' },
      { icon: Factory, label: 'Concretagem' },
      { icon: Bolt, label: 'Ferramentas elétricas' },
      { icon: Hammer, label: 'Furação e demolição' },
      { icon: Leaf, label: 'Jardinagem' },
      { icon: Sparkles, label: 'Limpeza' },
      { icon: Plug, label: 'Motores' },
      { icon: Wrench, label: 'Outros' },
    ],
  },
  {
    id: 'fases-obra',
    label: 'Fases da obra',
    accent: 'sky',
    items: [
      { icon: Truck, label: 'Pré-obra nivelamento' },
      { icon: Factory, label: 'Fundação profunda' },
      { icon: Building2, label: 'Estrutura e formas' },
      { icon: Hammer, label: 'Alvenaria estrutural' },
      { icon: Plug, label: 'Instalações elétricas' },
      { icon: Package, label: 'Instalações hidráulicas' },
      { icon: Sparkles, label: 'Acabamento fino' },
      { icon: Leaf, label: 'Paisagismo e entorno' },
      { icon: Bolt, label: 'Energia temporária' },
      { icon: Wrench, label: 'Entrega e ajustes finais' },
    ],
  },
  {
    id: 'tipo-trabalho',
    label: 'Tipo de trabalho',
    accent: 'emerald',
    items: [
      { icon: Hammer, label: 'Demolição controlada' },
      { icon: Wrench, label: 'Montagem industrial' },
      { icon: Leaf, label: 'Jardinagem urbana' },
      { icon: Sparkles, label: 'Limpeza pós-obra' },
      { icon: Bolt, label: 'Energia emergencial' },
      { icon: Plug, label: 'Bombas e drenagem' },
      { icon: Truck, label: 'Transporte interno' },
      { icon: Package, label: 'Escoramento técnico' },
      { icon: Factory, label: 'Concretagem contínua' },
      { icon: Building2, label: 'Reformas estruturais' },
    ],
  },
]

const ACCENT_STYLES: Record<
  TabSection['accent'],
  {
    card: string
    icon: string
    iconContent: string
    text: string
  }
> = {
  orange: {
    card: 'bg-white text-slate-900 border border-slate-200 shadow-sm focus-visible:ring-orange-500/60',
    icon: 'bg-gradient-to-b from-orange-400 to-orange-500 text-white group-hover:scale-105',
    iconContent: 'text-white',
    text: 'text-slate-900 group-hover:text-orange-600',
  },
  sky: {
    card: 'bg-white text-slate-900 border border-slate-200 shadow-sm focus-visible:ring-sky-500/60',
    icon: 'bg-gradient-to-b from-sky-400 to-sky-500 text-white group-hover:scale-105',
    iconContent: 'text-white',
    text: 'text-slate-900 group-hover:text-sky-600',
  },
  emerald: {
    card: 'bg-white text-slate-900 border border-slate-200 shadow-sm focus-visible:ring-emerald-500/60',
    icon: 'bg-gradient-to-b from-emerald-400 to-emerald-500 text-white group-hover:scale-105',
    iconContent: 'text-white',
    text: 'text-slate-900 group-hover:text-emerald-600',
  },
}

const baseCardClasses =
  'group flex w-full h-full min-h-[168px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:-translate-y-1 hover:shadow-lg'
const gridLayoutClasses =
  'grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5'

type SwipeOverlaySnapshot = {
  items: CategoryItem[]
  accent: TabSection['accent']
  direction: -1 | 1
  startX: number
  width: number
}

type SwipeOverlayLayerProps = {
  overlay: SwipeOverlaySnapshot
  onComplete: () => void
}

function SwipeOverlayLayer({ overlay, onComplete }: SwipeOverlayLayerProps) {
  const accentStyles = ACCENT_STYLES[overlay.accent]

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className={gridLayoutClasses}
        initial={{ x: overlay.startX }}
        animate={{
          x: overlay.direction === 1 ? -overlay.width : overlay.width,
        }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        onAnimationComplete={onComplete}
      >
        {overlay.items.map((item) => {
          const Icon = item.icon

          return (
            <div key={`overlay-${item.label}`} className="h-full">
              <div className={cn(baseCardClasses, accentStyles.card)}>
                <span
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300',
                    accentStyles.icon
                  )}
                >
                  <Icon
                    className={cn('h-7 w-7', accentStyles.iconContent)}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={cn(
                    'text-sm font-medium leading-tight md:text-base',
                    accentStyles.text
                  )}
                >
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState(TAB_SECTIONS[0]?.id ?? '')
  const [displayedTabId, setDisplayedTabId] = useState(activeTab)
  const [transitionKey, setTransitionKey] = useState(0)
  const [interactionMode, setInteractionMode] = useState<'click' | 'swipe'>(
    'click'
  )
  const [pendingTab, setPendingTab] = useState<string | null>(null)
  const [swipeOverlay, setSwipeOverlay] = useState<SwipeOverlaySnapshot | null>(
    null
  )
  const [swipePhase, setSwipePhase] = useState<
    'idle' | 'animating' | 'settling'
  >('idle')
  const dragX = useMotionValue(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const activeSectionCandidate = TAB_SECTIONS.find(
    (section) => section.id === activeTab
  )
  const activeSection = activeSectionCandidate ?? TAB_SECTIONS[0]
  if (!activeSection) {
    return null
  }
  const displayedSectionCandidate = TAB_SECTIONS.find(
    (section) => section.id === displayedTabId
  )
  const displayedSection = displayedSectionCandidate ?? activeSection
  if (!displayedSection) {
    return null
  }
  const accent = ACCENT_STYLES[displayedSection.accent]

  const clearSwipeOverlay = () => {
    setSwipeOverlay(null)
  }

  const commitTabChange = (sectionId: string, mode: 'click' | 'swipe') => {
    setActiveTab(sectionId)
    setInteractionMode(mode)

    const updateGridContent = () => {
      setDisplayedTabId(sectionId)
      setTransitionKey((prev) => prev + 1)
      setInteractionMode('click')
      setSwipePhase('idle')
      clearSwipeOverlay()
    }

    if (mode === 'click') {
      updateGridContent()
    } else {
      requestAnimationFrame(() => {
        updateGridContent()
      })
    }
  }

  const handleTabClick = (sectionId: string) => {
    if (sectionId === activeTab || swipePhase === 'animating') {
      return
    }
    commitTabChange(sectionId, 'click')
  }

  const startSwipeTransition = (direction: -1 | 1, targetTabId: string) => {
    const panelWidth = panelRef.current?.offsetWidth ?? 0
    const currentItems = displayedSection.items
    const currentAccent = displayedSection.accent
    const currentX = dragX.get()

    if (panelWidth === 0) {
      commitTabChange(targetTabId, 'swipe')
      return
    }

    if (swipePhase === 'animating') {
      return
    }

    setInteractionMode('swipe')
    setSwipePhase('animating')
    setPendingTab(targetTabId)
    setSwipeOverlay({
      items: currentItems,
      accent: currentAccent,
      direction,
      startX: currentX,
      width: panelWidth,
    })

    dragX.stop()
    dragX.set(0)
  }

  const completeSwipeTransition = () => {
    if (pendingTab) {
      setSwipePhase('settling')
      commitTabChange(pendingTab, 'swipe')
    } else {
      setSwipePhase('idle')
      clearSwipeOverlay()
    }

    setPendingTab(null)
  }

  return (
    <section className="rounded-3xl bg-transparent shadow-sm overflow-hidden">
      <div>
        <nav
          className="flex border-b border-slate-200"
          role="tablist"
          aria-label="Sessões de categorias de equipamentos"
        >
          <ul className="flex w-full items-stretch text-sm font-medium text-slate-500 md:text-base">
            {TAB_SECTIONS.map((section) => {
              const isActive = section.id === activeTab

              return (
                <li key={section.id} className="flex-1">
                  <button
                    type="button"
                    id={`${section.id}-tab`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${section.id}-panel`}
                    onClick={() => handleTabClick(section.id)}
                    className={cn(
                      'group relative flex w-full items-center justify-center px-2 py-3 text-center text-sm font-semibold transition-all duration-200 md:text-base',
                      isActive ? 'text-orange-600' : 'text-slate-500',
                      !isActive && !isMobile && 'hover:text-orange-600'
                    )}
                  >
                    <span
                      className={cn(
                        'whitespace-nowrap leading-none transition-transform duration-200',
                        isMobile && isActive
                          ? '-translate-y-1'
                          : 'translate-y-0',
                        'md:translate-y-0'
                      )}
                    >
                      {section.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] origin-center transform bg-gradient-to-r from-orange-500 to-yellow-500 transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                        !isActive && !isMobile && 'group-hover:scale-x-100'
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative mt-8">
          {/* Mantém o grid oculto até a animação de swipe finalizar para evitar flick */}
          <motion.div
            ref={panelRef}
            id={`${activeSection.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeSection.id}-tab`}
            className={cn(
              gridLayoutClasses,
              'transition-opacity',
              swipePhase === 'idle'
                ? 'opacity-100 duration-150'
                : 'opacity-0 pointer-events-none duration-0'
            )}
            style={{ x: dragX }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(_event, info) => {
              const swipeThreshold = 50
              const swipeVelocityThreshold = 500

              if (
                info.offset.x < -swipeThreshold ||
                info.velocity.x < -swipeVelocityThreshold
              ) {
                const currentIndex = TAB_SECTIONS.findIndex(
                  (section) => section.id === activeTab
                )
                const nextSection = TAB_SECTIONS[currentIndex + 1]
                if (nextSection) {
                  startSwipeTransition(1, nextSection.id)
                }
              } else if (
                info.offset.x > swipeThreshold ||
                info.velocity.x > swipeVelocityThreshold
              ) {
                const currentIndex = TAB_SECTIONS.findIndex(
                  (section) => section.id === activeTab
                )
                const prevSection = TAB_SECTIONS[currentIndex - 1]
                if (prevSection) {
                  startSwipeTransition(-1, prevSection.id)
                }
              }

              animate(dragX, 0, {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              })
            }}
          >
            <AnimatePresence mode="wait">
              {displayedSection.items.map((item, index) => {
                const Icon = item.icon
                const exitAnimation =
                  interactionMode === 'click'
                    ? { opacity: 0, y: -20, scale: 0.95 }
                    : { opacity: 0, transition: { duration: 0 } }

                return (
                  <motion.div
                    key={`${displayedSection.id}-${item.label}-${transitionKey}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={exitAnimation}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                    className="h-full"
                  >
                    <button
                      type="button"
                      className={cn(baseCardClasses, accent.card)}
                    >
                      <span
                        className={cn(
                          'flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300',
                          accent.icon
                        )}
                      >
                        <Icon
                          className={cn('h-7 w-7', accent.iconContent)}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className={cn(
                          'text-sm font-medium leading-tight md:text-base',
                          accent.text
                        )}
                      >
                        {item.label}
                      </span>
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {swipeOverlay && (
            <SwipeOverlayLayer
              overlay={swipeOverlay}
              onComplete={completeSwipeTransition}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default function TestComponentsPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryShowcase />
      </div>
    </div>
  )
}
