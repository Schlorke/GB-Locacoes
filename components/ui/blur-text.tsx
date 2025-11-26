'use client'

import { motion, type Transition, type Easing } from 'motion/react'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

type BlurTextProps = {
  text?: string
  delay?: number
  initialDelay?: number
  className?: string
  style?: React.CSSProperties
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: Easing | Easing[]
  onAnimationCompleteAction?: () => void
  stepDuration?: number
  shouldStartAnimating?: boolean
}

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ])

  const keyframes: Record<string, Array<string | number>> = {}

  keys.forEach((k) => {
    const fromValue = from[k]
    const stepValues = steps
      .map((s) => s[k])
      .filter((v): v is string | number => v !== undefined)
    if (fromValue !== undefined) {
      keyframes[k] = [fromValue, ...stepValues]
    }
  })

  return keyframes
}

export default function BlurText({
  text = '',
  delay = 200,
  initialDelay = 0,
  className = '',
  style,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationCompleteAction,
  stepDuration = 0.35,
  shouldStartAnimating = true,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')

  const [inView, setInView] = useState(false)

  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return

    if (!shouldStartAnimating) {
      setInView(false)
      return
    }

    // Se já está visível na viewport, iniciar animação imediatamente
    const rect = ref.current.getBoundingClientRect()
    const isInViewport =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0

    if (isInViewport) {
      setInView(true)
      return
    }

    // Caso contrário, observar quando entrar na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current as Element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold, rootMargin, shouldStartAnimating])

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  )

  return (
    <p
      ref={ref}
      className={cn('blur-text flex flex-wrap gap-x-2', className)}
      style={style}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (initialDelay + index * delay) / 1000,
          ease: easing,
        }

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1
                ? onAnimationCompleteAction
                : undefined
            }
            className="inline-block will-change-[transform,filter,opacity] whitespace-nowrap"
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
          </motion.span>
        )
      })}
    </p>
  )
}
