'use client'

import React, { Children, useCallback, useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[240px] md:min-h-[280px] p-8 md:p-12 rounded-[24px] md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform overflow-hidden ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
  sectionHeightMultiplier?: number
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
  sectionHeightMultiplier = 1.5,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(
    new Map<
      number,
      {
        translateY: number
        scale: number
        rotation: number
        blur: number
      }
    >()
  )
  const isUpdatingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  // Detectar mobile apenas uma vez no mount (sem re-renders)
  const isMobileRef = useRef(
    typeof window !== 'undefined' && window.innerWidth < 768
  )

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0
      if (scrollTop > end) return 1
      return (scrollTop - start) / (end - start)
    },
    []
  )

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === 'string' && value.includes('%')) {
        return (parseFloat(value) / 100) * containerHeight
      }
      return parseFloat(value as string)
    },
    []
  )

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      }
    }

    const scroller = scrollerRef.current
    if (!scroller) {
      return { scrollTop: 0, containerHeight: 0 }
    }
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    }
  }, [useWindowScroll])

  const getElementOffset = useCallback(
    (element: HTMLElement, relativeRoot?: HTMLElement | null) => {
      let offset = 0
      let current: HTMLElement | null = element

      while (current && current !== relativeRoot) {
        offset += current.offsetTop
        current = current.offsetParent as HTMLElement | null
      }

      return offset
    },
    []
  )

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return
    const { scrollTop, containerHeight } = getScrollData()
    if (!containerHeight) return

    const relativeRoot = useWindowScroll ? null : scrollerRef.current
    const isMobile = isMobileRef.current

    isUpdatingRef.current = true

    // ⭐ MOBILE: Scroll Reveal em vez de Scroll Stack
    if (isMobile) {
      cardsRef.current.forEach((card) => {
        if (!card) return

        const cardTop = getElementOffset(card, relativeRoot)
        const cardBottom = cardTop + card.offsetHeight
        const viewportTop = scrollTop
        const viewportBottom = scrollTop + containerHeight

        // Card está visível na viewport?
        const isInView = cardBottom > viewportTop && cardTop < viewportBottom

        // ⭐ MOBILE: Progresso de entrada centralizado na viewport
        // Card atinge 100% de opacidade quando está no CENTRO da tela (50%)
        const entryStart = cardTop - containerHeight * 0.7 // Começa 70% abaixo
        const entryEnd = cardTop - containerHeight * 0.5 // Termina no CENTRO (50%)
        const entryProgress = Math.max(
          0,
          Math.min(1, (scrollTop - entryStart) / (entryEnd - entryStart))
        )

        if (isInView || entryProgress > 0) {
          // Animação de scroll reveal: fade + slide up
          const opacity = entryProgress
          const translateY = (1 - entryProgress) * 30 // Slide up 30px
          const scale = 0.95 + entryProgress * 0.05 // Escala de 0.95 para 1

          card.style.opacity = String(opacity)
          card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
          card.style.filter = 'none'
          card.style.transition =
            'opacity 0.4s ease-out, transform 0.4s ease-out'
        } else {
          // Card ainda não entrou na viewport
          card.style.opacity = '0'
          card.style.transform = 'translate3d(0, 30px, 0) scale(0.95)'
        }
      })

      isUpdatingRef.current = false
      return
    }

    // ⭐ DESKTOP: Scroll Stack original
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    )

    const endElement = useWindowScroll
      ? ((scrollerRef.current?.querySelector('.scroll-stack-end') ||
          document.querySelector('.scroll-stack-end')) as HTMLElement | null)
      : (scrollerRef.current?.querySelector(
          '.scroll-stack-end'
        ) as HTMLElement | null)
    const endElementTop = endElement
      ? getElementOffset(endElement, relativeRoot)
      : 0

    // ⭐ Thresholds otimizados para máxima velocidade (ainda imperceptível)
    const translateThreshold = 0.5 // Update apenas se > 0.5px (invisível ao olho)
    const scaleThreshold = 0.004 // Update apenas se > 0.004

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = getElementOffset(card, relativeRoot)
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      )
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCard = cardsRef.current[j]
          if (!jCard) continue
          const jCardTop = getElementOffset(jCard, relativeRoot)
          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i
          blur = Math.max(0, depthInStack * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      // ⭐ Arredondamento otimizado (conservador para evitar tremor)
      const newTransform = {
        translateY: Math.round(translateY * 10) / 10, // 1 decimal (suave)
        scale: Math.round(scale * 1000) / 1000, // 3 decimais (necessário)
        rotation: Math.round(rotation * 10) / 10, // 1 decimal
        blur: Math.round(blur * 10) / 10, // 1 decimal
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) >
          translateThreshold ||
        Math.abs(lastTransform.scale - newTransform.scale) > scaleThreshold ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
        const filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : ''

        card.style.transform = transform
        card.style.filter = filter

        lastTransformsRef.current.set(i, newTransform)
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })

    isUpdatingRef.current = false
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ])

  const handleScroll = useCallback(() => {
    updateCardTransforms()
  }, [updateCardTransforms])

  const setupLenis = useCallback(() => {
    const isMobile = isMobileRef.current

    // ⭐ MOBILE: Scroll NATIVO com RAF throttling para scroll reveal
    if (isMobile) {
      const scrollTarget = useWindowScroll ? window : scrollerRef.current
      if (scrollTarget) {
        let ticking = false
        const throttledScroll = () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              handleScroll()
              ticking = false
            })
            ticking = true
          }
        }
        scrollTarget.addEventListener('scroll', throttledScroll, {
          passive: true,
        })
      }
      return
    }

    // ⭐ DESKTOP: Lenis smooth scroll otimizado (velocidade máxima segura)
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 0.8, // ↓ Próximo ao limite (0.7s seria mínimo)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1.4, // ↑ Quase no limite (1.5x seria máximo)
        lerp: 0.15, // ↑ Mais responsivo (0.18 seria limite)
        syncTouch: true,
        syncTouchLerp: 0.11, // ↑ Touch mais responsivo
      })

      lenis.on('scroll', handleScroll)

      const raf = (time: number) => {
        lenis.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
      rafRef.current = requestAnimationFrame(raf)

      lenisRef.current = lenis
      return lenis
    } else {
      const scroller = scrollerRef.current
      if (!scroller) return

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 0.8, // ↓ Próximo ao limite
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1.4, // ↑ Quase no limite
        lerp: 0.15, // ↑ Mais responsivo
        syncTouch: true,
        syncTouchLerp: 0.11, // ↑ Touch mais responsivo
      })

      lenis.on('scroll', handleScroll)

      const raf = (time: number) => {
        lenis.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
      rafRef.current = requestAnimationFrame(raf)

      lenisRef.current = lenis
      return lenis
    }
  }, [handleScroll, useWindowScroll])

  const childrenCount = Children.count(children)

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return

    const scroller = scrollerRef.current

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scroller?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[]

    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current
    transformsCache.clear()

    cards.forEach((card, i) => {
      // ⭐ MOBILE: Usar gap-6 (24px) igual aos cards de equipamento
      // ⭐ DESKTOP: Usar itemDistance configurado (padrão 100-300px)
      if (i < cards.length - 1) {
        const mobileGap = 24 // gap-6 do Tailwind (1.5rem)
        const spacing = isMobileRef.current ? mobileGap : itemDistance
        card.style.marginBottom = `${spacing}px`
      }

      card.style.willChange = 'transform, filter, opacity'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.perspective = '1000px'
      card.style.webkitPerspective = '1000px'

      // 🆕 OTIMIZAÇÃO 5: GPU acceleration forçada
      card.style.contain = 'layout style paint' // CSS containment - isola rendering
      card.style.isolation = 'isolate' // Força stacking context próprio

      card.style.zIndex = String(i + 1)

      // ⭐ MOBILE: Inicializar com opacity 0 para scroll reveal
      if (isMobileRef.current) {
        card.style.opacity = '0'
        card.style.transform = 'translate3d(0, 30px, 0) scale(0.95)'
      } else {
        // DESKTOP: Inicializar com GPU acceleration
        card.style.transform = 'translateZ(0)' // ✅ Força layer composta
        card.style.webkitTransform = 'translateZ(0)'
        card.style.opacity = '1'
      }
    })

    // Inicializa o Lenis
    setupLenis()

    // Primeira atualização
    updateCardTransforms()

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      isUpdatingRef.current = false
    }
  }, [
    childrenCount,
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
  ])

  const containerClassName = useWindowScroll
    ? `relative w-full overflow-visible ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()

  const containerStyles: React.CSSProperties = useWindowScroll
    ? {}
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
      }

  const innerStyles: React.CSSProperties = {
    minHeight: `calc(${Math.max(sectionHeightMultiplier, 1)} * 100vh)`,
  }

  return (
    <div
      className={containerClassName}
      ref={scrollerRef}
      style={containerStyles}
    >
      <div
        className="scroll-stack-inner pt-[4vh] pb-0 md:pb-[4rem] min-h-screen overflow-visible"
        style={innerStyles}
      >
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  )
}

export default ScrollStack
