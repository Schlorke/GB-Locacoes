'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  name: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
  showHome?: boolean
  homeLabel?: string
  variant?: 'default' | 'minimal' | 'pills'
}

export default function Breadcrumb({
  items,
  separator,
  className,
  showHome = true,
  homeLabel = 'Home',
  variant = 'default',
}: BreadcrumbProps) {
  // Prepare items for JSON-LD
  const allItems = showHome ? [{ name: homeLabel, href: '/' }, ...items] : items

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `https://gblocacoes.com.br${item.href}` : undefined,
    })),
  }

  const containerClasses = cn(
    'flex items-center space-x-1',
    variant === 'default' && 'text-sm text-gray-600',
    variant === 'minimal' && 'text-xs text-gray-500',
    variant === 'pills' && 'text-sm',
    className
  )

  const itemClasses = {
    default: {
      link: 'hover:text-orange-600 transition-colors duration-200',
      current: 'text-orange-400 font-medium',
      separator: 'text-gray-400',
    },
    minimal: {
      link: 'hover:text-orange-500 transition-colors duration-200',
      current: 'text-gray-700',
      separator: 'text-gray-300',
    },
    pills: {
      link: 'px-2 py-1 rounded-md hover:bg-orange-100 hover:text-orange-700 transition-all duration-200',
      current: 'px-2 py-1 bg-orange-600 text-white rounded-md font-medium',
      separator: 'text-gray-400 px-1',
    },
  }

  const currentVariant = itemClasses[variant]
  const defaultSeparator = separator || <ChevronRight className="w-4 h-4" />

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className={containerClasses}>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isHome = index === 0 && showHome

          return (
            <motion.span
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center"
            >
              {/* Breadcrumb Item */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    currentVariant.link,
                    isHome && variant !== 'pills' && 'flex items-center gap-1'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {isHome && <Home className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast ? currentVariant.current : currentVariant.link,
                    isHome && variant !== 'pills' && 'flex items-center gap-1'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isHome && <Home className="w-4 h-4" />}
                  <span>{item.name}</span>
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <span className={cn('mx-2', currentVariant.separator)}>
                  {defaultSeparator}
                </span>
              )}
            </motion.span>
          )
        })}
      </nav>
    </>
  )
}

// Utility function to generate breadcrumbs from pathname
export function generateBreadcrumbs(
  pathname: string,
  customNames?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1

    // Use custom names if provided, otherwise format the segment
    const name =
      customNames?.[segment] ||
      customNames?.[href] ||
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

    breadcrumbs.push({
      name,
      href: isLast ? undefined : href, // Don't make the current page clickable
      current: isLast,
    })
  })

  return breadcrumbs
}

// Pre-configured breadcrumb components for common pages
interface PageBreadcrumbProps extends Omit<BreadcrumbProps, 'items'> {
  currentPage: string
  parentPages?: BreadcrumbItem[]
}

export function EquipmentBreadcrumb({
  currentPage,
  categoryName,
  categorySlug,
  ...props
}: PageBreadcrumbProps & {
  categoryName?: string
  categorySlug?: string
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Equipamentos', href: '/equipamentos' },
  ]

  if (categoryName && categorySlug) {
    items.push({
      name: categoryName,
      href: `/equipamentos?categoria=${categorySlug}`,
    })
  }

  items.push({ name: currentPage, current: true })

  return <Breadcrumb items={items} {...props} />
}

export function CategoryBreadcrumb({
  currentPage,
  ...props
}: PageBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { name: 'Equipamentos', href: '/equipamentos' },
    { name: currentPage, current: true },
  ]

  return <Breadcrumb items={items} {...props} />
}

export function SimpleBreadcrumb({
  currentPage,
  parentPages = [],
  ...props
}: PageBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    ...parentPages,
    { name: currentPage, current: true },
  ]

  return <Breadcrumb items={items} {...props} />
}
