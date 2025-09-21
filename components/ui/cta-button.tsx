'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void | Promise<void>
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  trackingId?: string
  fullWidth?: boolean
  animate?: boolean
}

export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  icon,
  iconPosition = 'right',
  trackingId,
  fullWidth = false,
  animate = true,
  ...props
}: CTAButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false)

  const handleClick = async () => {
    if (!onClick || loading || disabled) return

    // Analytics tracking
    if (trackingId && typeof window !== 'undefined') {
      // @ts-expect-error - gtag pode não existir no window object
      if (window.gtag) {
        // @ts-expect-error - gtag não tem tipagem definida no TypeScript
        window.gtag('event', 'click', {
          event_category: 'CTA',
          event_label: trackingId,
        })
      }
    }

    try {
      setInternalLoading(true)
      await onClick()
    } catch (error) {
      console.error('Error in CTA action:', error)
    } finally {
      setInternalLoading(false)
    }
  }

  const isLoading = loading || internalLoading

  const variants = {
    primary:
      'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl border-0',
    secondary:
      'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl border-0',
    outline:
      'border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent',
    ghost: 'text-orange-600 hover:bg-orange-50 bg-transparent border-0',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg font-semibold',
  }

  const buttonClasses = cn(
    'relative overflow-hidden font-medium transition-all duration-300',
    'transform hover:scale-105 active:scale-95',
    'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    (disabled || isLoading) &&
      'opacity-60 cursor-not-allowed transform-none hover:scale-100',
    className
  )

  const content = (
    <>
      {/* Animated background gradient for primary variant */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}

        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}

        {icon && iconPosition === 'right' && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </span>

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-md overflow-hidden">
        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
      </span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={animate ? { scale: 1.05 } : undefined}
        whileTap={animate ? { scale: 0.95 } : undefined}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div
      whileHover={animate ? { scale: 1.05 } : undefined}
      whileTap={animate ? { scale: 0.95 } : undefined}
    >
      <Button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {content}
      </Button>
    </motion.div>
  )
}

// Pre-configured CTA variants for common use cases
export const PrimaryCTA = (props: Omit<CTAButtonProps, 'variant'>) => (
  <CTAButton variant="primary" {...props} />
)

export const SecondaryCTA = (props: Omit<CTAButtonProps, 'variant'>) => (
  <CTAButton variant="secondary" {...props} />
)

export const OutlineCTA = (props: Omit<CTAButtonProps, 'variant'>) => (
  <CTAButton variant="outline" {...props} />
)

// Specific CTA components for common actions
export const QuoteCTA = (
  props: Omit<CTAButtonProps, 'children' | 'trackingId'>
) => (
  <CTAButton trackingId="request-quote" {...props}>
    Solicitar Orçamento
  </CTAButton>
)

export const ContactCTA = (
  props: Omit<CTAButtonProps, 'children' | 'trackingId'>
) => (
  <CTAButton trackingId="contact-us" {...props}>
    Entrar em Contato
  </CTAButton>
)

export const PhoneCTA = ({
  phone,
  ...props
}: { phone: string } & Omit<
  CTAButtonProps,
  'children' | 'href' | 'trackingId'
>) => (
  <CTAButton
    href={`tel:${phone}`}
    trackingId="call-phone"
    icon={
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    }
    {...props}
  >
    {phone}
  </CTAButton>
)

export const WhatsAppCTA = ({
  phone,
  message = 'Olá! Gostaria de solicitar um orçamento.',
  ...props
}: {
  phone: string
  message?: string
} & Omit<CTAButtonProps, 'children' | 'href' | 'trackingId' | 'className'>) => (
  <CTAButton
    href={`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`}
    trackingId="whatsapp-contact"
    className="bg-green-600 hover:bg-green-700 text-white"
    icon={
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
      </svg>
    }
    {...props}
  >
    WhatsApp
  </CTAButton>
)
