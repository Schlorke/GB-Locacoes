'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { Toaster as Sonner } from 'sonner'
import './sonner-toaster.css'

export function SonnerToaster() {
  return (
    <Sonner
      position="top-center"
      expand={true}
      richColors
      closeButton
      duration={4000}
      offset="120px"
      visibleToasts={5}
      gap={8}
      style={{
        gap: '8px', // Espaçamento vertical entre toasts
      }}
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
      }}
      toastOptions={{
        style: {
          marginBottom: '8px', // Força espaçamento entre toasts
        },
        classNames: {
          toast:
            'rounded-lg shadow-xl backdrop-blur-sm border p-4 gap-3 hover:shadow-2xl transition-all duration-300',
          title: 'text-sm font-semibold leading-tight',
          description: 'text-sm opacity-90 leading-snug',
          success:
            'border-green-200 bg-gradient-to-br from-green-50/95 to-emerald-50/95 text-green-900',
          error:
            'border-red-200 bg-gradient-to-br from-red-50/95 to-rose-50/95 text-red-900',
          warning:
            'border-orange-200 bg-gradient-to-br from-orange-50/95 to-amber-50/95 text-orange-900',
          info: 'border-blue-200 bg-gradient-to-br from-blue-50/95 to-sky-50/95 text-blue-900',
          default: 'border-gray-200 bg-white/95 text-gray-900',
          closeButton: '', // Estilos controlados via CSS global
          icon: 'h-5 w-5 mt-0.5',
        },
      }}
    />
  )
}
