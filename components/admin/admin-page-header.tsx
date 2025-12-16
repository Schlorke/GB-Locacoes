'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

interface AdminPageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  infoBadge?: {
    icon: React.ReactNode
    text: string
  }
  className?: string
}

export function AdminPageHeader({
  title,
  subtitle,
  icon,
  infoBadge,
  className,
}: AdminPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl',
        className
      )}
    >
      {/* Clean depth layers without decorative elements - padrão estabelecido */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {icon && (
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-white drop-shadow-sm">
              {title}
            </h1>
            {subtitle && (
              <p className="text-orange-50 text-base font-medium">{subtitle}</p>
            )}
          </div>
        </div>
        {infoBadge && (
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit mt-2">
            <div className="text-orange-50">{infoBadge.icon}</div>
            <span className="font-semibold text-white">{infoBadge.text}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
