'use client'

import { gsap } from 'gsap'
import { FC, useEffect, useRef } from 'react'

interface GridMotionProps {
  items?: (string | React.ReactNode)[]
  gradientColor?: string
}

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  gradientColor = 'black',
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseXRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  )
  const totalItems = 28
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  )
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX
    }

    const updateMotion = (): void => {
      const maxMoveAmount = 300
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration +
              (inertiaFactors[index % inertiaFactors.length] ?? 0.2),
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
      })
    }

    const removeAnimationLoop = gsap.ticker.add(updateMotion)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      removeAnimationLoop()
    }
  }, [])

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-[4] bg-[length:250px]"></div>
        <div className="relative z-[2] grid h-full w-full origin-center grid-cols-1 grid-rows-4 gap-4 flex-none">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-7 gap-4"
              style={{ willChange: 'transform, filter' }}
              ref={(el) => {
                if (el) rowRefs.current[rowIndex] = el
              }}
            >
              {Array.from({ length: 7 }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex]
                return (
                  <div key={itemIndex} className="relative">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#111] text-[1.5rem] text-white">
                      {typeof content === 'string' &&
                      content.startsWith('http') ? (
                        <div
                          className="absolute left-0 top-0 h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${content})` }}
                        ></div>
                      ) : (
                        <div className="z-[1] p-4 text-center">{content}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="pointer-events-none relative left-0 top-0 h-full w-full"></div>
      </section>
    </div>
  )
}

export default GridMotion
