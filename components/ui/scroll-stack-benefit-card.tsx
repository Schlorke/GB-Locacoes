'use client'

import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface ScrollStackBenefitCardProps {
  icon: LucideIcon
  title: string
  description: string
  accentColor?: string
  index?: number
  children?: ReactNode
}

export function ScrollStackBenefitCard({
  icon: Icon,
  title,
  description,
  accentColor = 'from-orange-500 to-orange-600',
  index = 0,
}: ScrollStackBenefitCardProps) {
  // Alternating layout based on index
  const isReversed = index % 2 === 1

  return (
    <div className="relative h-full w-full flex items-center overflow-visible">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <div className="absolute inset-6 rounded-[inherit] overflow-visible">
          <div
            className={cn(
              'absolute w-[200px] h-[200px] rounded-full blur-[70px] opacity-[0.03]',
              `bg-gradient-to-br ${accentColor}`,
              isReversed ? 'top-6 left-6' : 'bottom-6 right-6'
            )}
            style={{
              animationDelay: `${index * 200}ms`,
              animation: 'pulse-slow 6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-[140px] h-[140px] bg-yellow-400/8 rounded-full blur-[56px] opacity-[0.02]"
            style={{
              top: isReversed ? 'auto' : '22%',
              bottom: isReversed ? '22%' : 'auto',
              left: isReversed ? 'auto' : '14%',
              right: isReversed ? '14%' : 'auto',
              animationDelay: `${index * 150 + 300}ms`,
              animation: 'pulse-slow 7s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Content container */}
      <div
        className={cn(
          'relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full',
          isReversed && 'md:flex-row-reverse'
        )}
      >
        {/* Icon section */}
        <div className="flex-shrink-0 overflow-visible">
          <div className="relative group overflow-visible">
            {/* Outer glow ring */}
            <div
              className={cn(
                'absolute -inset-3 rounded-full opacity-30 blur-lg',
                `bg-gradient-to-br ${accentColor}`
              )}
            />

            {/* Icon container */}
            <div
              className={cn(
                'relative w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center',
                'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700',
                'shadow-[0_0_30px_rgba(234,88,12,0.4)]',
                'transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3',
                'overflow-hidden'
              )}
            >
              {/* Inner pattern */}
              <div className="absolute inset-0 rounded-[inherit] opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_50%)]" />
              </div>

              <Icon className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating particles */}
            <div
              className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-50"
              style={{ animationDelay: '200ms' }}
            />
          </div>
        </div>

        {/* Text content */}
        <div
          className={cn(
            'flex-1 text-center',
            isReversed ? 'md:text-right' : 'md:text-left'
          )}
        >
          {/* Title with gradient accent */}
          <div className="relative inline-block mb-3">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {title}
            </h3>
            {/* Pencil stroke effect - pressure-sensitive line */}
            <div className="absolute -bottom-1 left-0 md:left-auto md:right-auto h-2 pointer-events-none" style={{ width: '100%', left: isReversed ? 'auto' : '0', right: isReversed ? '0' : 'auto' }}>
              {/* Main stroke with gradient opacity */}
              <div
                className={cn(
                  'absolute inset-0 rounded-full',
                  `bg-gradient-to-${isReversed ? 'l' : 'r'} ${accentColor}`
                )}
                style={{
                  maskImage: isReversed
                    ? 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: isReversed
                    ? 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
                }}
              />
              {/* Secondary glow layer for depth */}
              <div
                className={cn(
                  'absolute inset-0 rounded-full blur-[1px]',
                  `bg-gradient-to-${isReversed ? 'l' : 'r'} ${accentColor}`
                )}
                style={{
                  opacity: 0.4,
                  maskImage: isReversed
                    ? 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: isReversed
                    ? 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                }}
              />
              {/* Height variation to simulate pressure */}
              <div
                className={cn(
                  'absolute rounded-full',
                  `bg-gradient-to-${isReversed ? 'l' : 'r'} ${accentColor}`
                )}
                style={{
                  left: isReversed ? 'auto' : '0',
                  right: isReversed ? '0' : 'auto',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: '100%',
                  width: '100%',
                  maskImage: isReversed
                    ? 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: isReversed
                    ? 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
                  filter: 'blur(0.5px)',
                }}
              />
            </div>
          </div>

          {/* Description */}
          <p
            className={cn(
              "text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl",
              isReversed && "md:ml-auto"
            )}
          >
            {description}
          </p>

          {/* Stats or badge (optional visual element) */}
          <div
            className={cn(
              'mt-4 flex items-center gap-3 justify-center',
              isReversed ? 'md:justify-end' : 'md:justify-start'
            )}
          >
            <div
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                'bg-gradient-to-r from-gray-700/50 to-gray-800/50',
                'border border-gray-600/30'
              )}
            >
              <div
                className={cn(
                  'w-2 h-2 rounded-full animate-pulse',
                  `bg-gradient-to-r ${accentColor}`
                )}
              />
              <span className="text-sm text-gray-400 font-medium">
                GB Locacoes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollStackBenefitCard
