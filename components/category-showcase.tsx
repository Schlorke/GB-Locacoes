'use client'

import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react'

import type { CustomIconProps } from '@/components/icons/custom'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export type CategoryItem = {
  id: string
  name: string
  icon: ComponentType<CustomIconProps>
}

export type TabConfig = {
  value: string
  label: string
  categories: CategoryItem[]
}

export type CategoryShowcaseProps = {
  tabs: TabConfig[]
  defaultTab?: string
  onCategoryClickAction?: (_category: CategoryItem) => void
  onTabChangeAction?: (_tabValue: string) => void
  className?: string
  gridCols?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
  }
  cardClassName?: string
  isDialogPreview?: boolean
}

const baseCardClasses =
  'group relative flex h-full w-full min-h-[120px] flex-col items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl'

const iconWrapperClasses =
  'relative z-10 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 shadow-lg transition-transform duration-300 transform-gpu group-hover:scale-[1.04] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'

const cardLabelClasses =
  'relative z-10 text-center text-xs font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-orange-400 whitespace-normal break-words'

function buildGridClasses(gridCols: CategoryShowcaseProps['gridCols']): string {
  const base = gridCols?.base ? `grid-cols-${gridCols.base}` : 'grid-cols-2'
  const sm = gridCols?.sm ? `sm:grid-cols-${gridCols.sm}` : 'sm:grid-cols-2'
  const md = gridCols?.md ? `md:grid-cols-${gridCols.md}` : 'md:grid-cols-3'
  const lg = gridCols?.lg ? `lg:grid-cols-${gridCols.lg}` : 'lg:grid-cols-4'

  return cn('grid gap-4', base, sm, md, lg)
}

type SwipeOverlaySnapshot = {
  items: CategoryItem[]
  direction: -1 | 1
  startX: number
  width: number
}

type SwipeOverlayLayerProps = {
  overlay: SwipeOverlaySnapshot
  gridClasses: string
  onComplete: () => void
  cardClassName?: string
}

function SwipeOverlayLayer({
  overlay,
  gridClasses,
  onComplete,
  cardClassName,
}: SwipeOverlayLayerProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      <motion.div
        className={gridClasses}
        initial={{ x: overlay.startX, opacity: 1 }}
        animate={{
          x: overlay.direction === 1 ? -overlay.width : overlay.width,
          opacity: 0,
        }}
        transition={{ duration: 0.36, ease: 'easeInOut' }}
        onAnimationComplete={onComplete}
      >
        {overlay.items.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={`overlay-${item.id}`}
              className="h-full flex justify-center"
            >
              <div className={cn(baseCardClasses, cardClassName)}>
                <span className={iconWrapperClasses}>
                  <Icon size={28} color="white" className="h-7 w-7" />
                </span>
                <span className={cardLabelClasses}>{item.name}</span>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export function CategoryShowcase({
  tabs,
  defaultTab,
  onCategoryClickAction,
  onTabChangeAction,
  className,
  gridCols,
  cardClassName,
  isDialogPreview = false,
}: CategoryShowcaseProps) {
  const safeTabs = useMemo(() => tabs ?? [], [tabs])

  const initialTab = useMemo(() => {
    if (safeTabs.length === 0) {
      return ''
    }

    if (defaultTab && safeTabs.some((tab) => tab.value === defaultTab)) {
      return defaultTab
    }

    return safeTabs[0]?.value ?? ''
  }, [defaultTab, safeTabs])

  const [activeTab, setActiveTab] = useState(initialTab)
  const [displayedTabId, setDisplayedTabId] = useState(initialTab)
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
  const sectionRef = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const [hasRevealed, setHasRevealed] = useState(false)

  const gridClasses = useMemo(() => buildGridClasses(gridCols), [gridCols])

  const activeSection =
    safeTabs.find((tab) => tab.value === activeTab) ?? safeTabs[0]
  const displayedSection =
    safeTabs.find((tab) => tab.value === displayedTabId) ?? activeSection

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const getNavigationType = (): PerformanceNavigationTiming['type'] => {
      const navigationEntries = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[]

      if (navigationEntries.length > 0 && navigationEntries[0]) {
        return navigationEntries[0].type
      }

      const legacyNavigation = performance.navigation

      if (legacyNavigation) {
        switch (legacyNavigation.type) {
          case legacyNavigation.TYPE_RELOAD:
            return 'reload'
          case legacyNavigation.TYPE_BACK_FORWARD:
            return 'back_forward'
          case legacyNavigation.TYPE_RESERVED:
            return 'navigate'
          default:
            return 'navigate'
        }
      }

      return 'navigate'
    }

    const wasInternalClick =
      window.sessionStorage.getItem('internalNavigation') === 'true'
    const hasVisitedSite =
      window.sessionStorage.getItem('hasVisitedSite') === 'true'
    const navigationType = getNavigationType()

    const isInternalNavigation =
      wasInternalClick || (navigationType === 'navigate' && hasVisitedSite)

    if (isInternalNavigation) {
      setHasRevealed(true)
      return
    }

    if (!('IntersectionObserver' in window)) {
      setHasRevealed(true)
      return
    }

    const target = sectionRef.current

    if (!target) {
      setHasRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasRevealed(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -120px 0px',
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!activeSection || !displayedSection) {
    return null
  }

  const clearSwipeOverlay = () => {
    setSwipeOverlay(null)
  }

  const commitTabChange = (sectionId: string, mode: 'click' | 'swipe') => {
    setActiveTab(sectionId)
    setInteractionMode(mode)
    onTabChangeAction?.(sectionId)

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
      requestAnimationFrame(updateGridContent)
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
    const currentItems = displayedSection.categories
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
    <section ref={sectionRef} className={cn('overflow-visible', className)}>
      <div className="overflow-visible">
        <nav
          className="flex border-b-2 border-slate-200/70"
          role="tablist"
          aria-label="Sessões de categorias de equipamentos"
        >
          <ul className="flex w-full items-stretch text-sm font-semibold text-slate-500/90 md:text-base">
            {safeTabs.map((section) => {
              const isActive = section.value === activeTab

              return (
                <li key={section.value} className="flex-1">
                  <button
                    type="button"
                    id={`${section.value}-tab`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${section.value}-panel`}
                    onClick={() => handleTabClick(section.value)}
                    className={cn(
                      'group/tab relative flex w-full items-center justify-center px-3 py-3 text-center text-sm font-semibold tracking-tight transition-colors duration-200 md:text-base',
                      isActive
                        ? 'text-orange-600'
                        : 'text-slate-500 md:hover:text-orange-600'
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
                        !isActive && !isMobile && 'group-hover/tab:scale-x-100'
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative mt-8 overflow-visible">
          <motion.div
            ref={panelRef}
            id={`${activeSection.value}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeSection.value}-tab`}
            className={cn(
              gridClasses,
              'transition-opacity',
              swipePhase === 'idle'
                ? 'opacity-100 duration-150'
                : 'opacity-0 pointer-events-none duration-0'
            )}
            style={{
              x: dragX,
              opacity: hasRevealed && swipePhase === 'idle' ? 1 : 0,
              pointerEvents:
                hasRevealed && swipePhase === 'idle' ? 'auto' : 'none',
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(_event, info) => {
              const swipeThreshold = 50
              const swipeVelocityThreshold = 500

              const currentIndex = safeTabs.findIndex(
                (section) => section.value === activeTab
              )

              if (
                info.offset.x < -swipeThreshold ||
                info.velocity.x < -swipeVelocityThreshold
              ) {
                const nextSection = safeTabs[currentIndex + 1]
                if (nextSection) {
                  startSwipeTransition(1, nextSection.value)
                }
              } else if (
                info.offset.x > swipeThreshold ||
                info.velocity.x > swipeVelocityThreshold
              ) {
                const prevSection = safeTabs[currentIndex - 1]
                if (prevSection) {
                  startSwipeTransition(-1, prevSection.value)
                }
              }

              animate(dragX, 0, {
                type: 'spring',
                stiffness: 220,
                damping: 32,
              })
            }}
          >
            <AnimatePresence mode="wait">
              {displayedSection.categories.map((item, index) => {
                const Icon = item.icon
                const exitAnimation =
                  interactionMode === 'click'
                    ? { opacity: 0, y: -20, scale: 0.95 }
                    : { opacity: 0, transition: { duration: 0 } }
                const entryTransition = hasRevealed
                  ? {
                      delay: index * 0.08,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }
                  : { duration: 0 }

                return (
                  <motion.div
                    key={`${displayedSection.value}-${item.id}-${transitionKey}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={
                      hasRevealed
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 20, scale: 0.95 }
                    }
                    exit={exitAnimation}
                    transition={entryTransition}
                    className="h-full flex justify-center"
                  >
                    <button
                      type="button"
                      className={cn(baseCardClasses, cardClassName)}
                      onClick={() => onCategoryClickAction?.(item)}
                    >
                      <div
                        className={cn(
                          iconWrapperClasses,
                          isDialogPreview &&
                            'border-none cursor-pointer transition-all duration-700 ease-in-out hover:bg-[length:280%_auto] active:scale-95 shadow-[0px_0px_20px_rgba(251,146,60,0.5),0px_5px_5px_-1px_rgba(234,88,12,0.25),inset_4px_4px_8px_rgba(255,237,213,0.5),inset_-4px_-4px_8px_rgba(234,88,12,0.35)]'
                        )}
                        style={
                          isDialogPreview
                            ? {
                                backgroundImage:
                                  'linear-gradient(325deg, rgb(255, 124, 31) 18%, rgb(255, 245, 235) 50%, rgb(255, 124, 31) 77%)',
                                backgroundSize: '580% auto',
                                backgroundPosition: 'initial',
                                color: 'hsl(0 0% 100%)',
                                transition: '0.8s',
                              }
                            : undefined
                        }
                        onMouseEnter={
                          isDialogPreview
                            ? (e) => {
                                ;(
                                  e.currentTarget as HTMLDivElement
                                ).style.backgroundPosition = 'right top'
                              }
                            : undefined
                        }
                        onMouseLeave={
                          isDialogPreview
                            ? (e) => {
                                ;(
                                  e.currentTarget as HTMLDivElement
                                ).style.backgroundPosition = 'initial'
                              }
                            : undefined
                        }
                      >
                        <Icon
                          size={28}
                          color="white"
                          className="h-7 w-7 relative z-10"
                        />
                      </div>
                      <span className={cardLabelClasses}>{item.name}</span>
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {swipeOverlay && (
            <SwipeOverlayLayer
              overlay={swipeOverlay}
              gridClasses={gridClasses}
              onComplete={completeSwipeTransition}
              cardClassName={cardClassName}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase
