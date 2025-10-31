'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

/**
 * Toaster component seguindo 100% os padrões oficiais da biblioteca Sonner.
 * Implementação conforme documentação oficial shadcn/ui (atualizada 13/10/2025).
 * @see https://sonner.emilkowal.ski/getting-started
 * @see https://github.com/emilkowalski/sonner
 * @see https://ui.shadcn.com/docs/components/sonner
 */
export function Toaster(props: ToasterProps) {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className=" size-5 !text-green-700" />,
        info: <InfoIcon className="size-5 !text-blue-700" />,
        warning: <TriangleAlertIcon className="size-5 !text-orange-700" />,
        error: <OctagonXIcon className="size-5 !text-red-700" />,
        loading: <Loader2Icon className="size-5 animate-spin !text-gray-700" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex items-start gap-3 p-4 rounded-lg shadow-lg border w-full md:max-w-[364px]',
          success:
            'bg-green-50 border-green-200 [&_[data-title]]:!text-green-700 [&_[data-description]]:!text-green-600',
          error:
            'bg-red-50 border-red-200 [&_[data-title]]:!text-red-700 [&_[data-description]]:!text-red-600',
          warning:
            'bg-orange-50 border-orange-200 [&_[data-title]]:!text-orange-700 [&_[data-description]]:!text-orange-600',
          info: 'bg-blue-50 border-blue-200 [&_[data-title]]:!text-blue-700 [&_[data-description]]:!text-blue-600',
          loading:
            'bg-gray-50 border-gray-200 [&_[data-title]]:!text-gray-700 [&_[data-description]]:!text-gray-600 [&_.sonner-loader]:!static [&_.sonner-loader]:!transform-none [&_.sonner-loader]:!m-0 [&_.sonner-loader]:!inline-flex [&_.sonner-loader]:!align-middle [&_.sonner-loader]:!ml-2',
          icon: 'flex-shrink-0',
          content: 'flex-1',
          title: 'font-semibold text-sm',
          description: 'text-sm block mt-0.5',
          closeButton:
            'order-last ml-auto flex-shrink-0 rounded-md p-1 !text-gray-500 hover:!bg-white/90 !transition-colors',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      position="top-center"
      closeButton
      expand={false}
      duration={40000}
      visibleToasts={3}
      {...props}
    />
  )
}
