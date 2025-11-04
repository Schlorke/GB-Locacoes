// components/ui/HybridTooltip.tsx
'use client'

import { useHasHover } from '@/hooks/useHasHover'
import { cn } from '@/lib/utils'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

// --- ESTILOS COMPARTILHADOS (FONTE DA VERDADE VISUAL) ---
const contentClassName = cn(
  'z-50 overflow-hidden rounded-md border border-gray-100',
  'bg-gray-50 text-gray-700', // Cores claras similar ao toast info do Sonner
  'px-3 py-1.5 text-[13px] shadow-lg', // text-[13px] para tamanho entre xs e sm
  'animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2'
)

const arrowClassName = 'fill-gray-50'

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
              <TooltipPrimitive.Arrow className={arrowClassName} />
              {content}
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
          <PopoverPrimitive.Arrow className={arrowClassName} />
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { HybridTooltip }
