'use client';

import { cn } from '@/lib/utils';
import type React from 'react';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AdminPageHeader({ title, subtitle, icon, className }: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl',
        className,
      )}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>

      <div className="relative z-10 flex items-center gap-4">
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{title}</h1>
          {subtitle && <p className="text-orange-100 text-base opacity-90">{subtitle}</p>}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-2 left-2 w-16 h-16 bg-yellow-300/20 rounded-full blur-xl"></div>
    </div>
  );
}
