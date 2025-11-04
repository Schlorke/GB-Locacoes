// components/ui/HybridTooltip.tsx
'use client'

import { useHasHover } from '@/hooks/useHasHover'
import { cn } from '@/lib/utils'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

// --- ESTILOS COMPARTILHADOS (FONTE DA VERDADE VISUAL) ---
const contentClassName = cn(
  'group',
  'z-50 overflow-hidden rounded-md',
  'bg-white text-gray-700', // Background branco com texto escuro
  'px-4 py-2 text-[13px] shadow-lg', // text-xs = 12px (compacto)
  'max-w-xs', // FORÇA quebra de linha
  'transition-all duration-100 animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-4',
  'data-[side=left]:slide-in-from-right-4',
  'data-[side=right]:slide-in-from-left-4',
  'data-[side=top]:slide-in-from-bottom-4'
)

// --- INTERFACE ---
interface HybridTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  [key: string]: unknown
}

// --- COMPONENTE HÍBRIDO ---
const HybridTooltip: React.FC<HybridTooltipProps> = ({
  children,
  content,
  ...props
}) => {
  const hasHover = useHasHover()

  // --- DESKTOP: RENDERIZA TOOLTIP ---
  if (hasHover) {
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root delayDuration={500}>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side="top" // Garante posicionamento acima
              align="center"
              sideOffset={5}
              className={contentClassName}
              {...props}
            >
              {content}
              <TooltipPrimitive.Arrow className="fill-white" />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    )
  }

  // --- MOBILE: RENDERIZA POPOVER ---
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="top" // CRÍTICO: Força o Popover a abrir para cima
          align="center"
          sideOffset={5}
          className={contentClassName}
          {...props}
        >
          {content}
          <PopoverPrimitive.Arrow className="fill-white" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { HybridTooltip }
