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
    <>
      {/* Mantém a altura natural das toasts mesmo com expand={false} */}
      <style jsx global>{`
        [data-sonner-toast] {
          height: auto !important;
        }
      `}</style>

      <Sonner
        theme={theme as ToasterProps['theme']}
        className="toaster group"
        icons={{
          success: <CircleCheckIcon className=" size-5 !text-green-700" />,
          info: <InfoIcon className="size-5 !text-blue-700" />,
          warning: <TriangleAlertIcon className="size-5 !text-orange-700" />,
          error: <OctagonXIcon className="size-5 !text-red-700" />,
          loading: (
            <Loader2Icon className="size-5 animate-spin !text-gray-700" />
          ),
        }}
        toastOptions={{
          unstyled: true,
          descriptionClassName:
            'col-start-2 row-start-2 text-sm block !text-gray-500',
          classNames: {
            toast:
              'grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1 p-4 rounded-lg shadow-lg border w-full md:max-w-[364px]',
            default: 'bg-white border-gray-200 [&_[data-title]]:text-gray-900 ',
            success:
              '!bg-green-50 !border-green-200 [&_[data-title]]:!text-green-700 [&_[data-description]]:!text-green-600',
            error:
              '!bg-red-50 !border-red-200 [&_[data-title]]:!text-red-700 [&_[data-description]]:!text-red-600',
            warning:
              '!bg-orange-50 !border-orange-200 [&_[data-title]]:!text-orange-700 [&_[data-description]]:!text-orange-600',
            info: '!bg-blue-50 !border-blue-200 [&_[data-title]]:!text-blue-700 [&_[data-description]]:!text-blue-600',
            loading:
              '!bg-gray-50 !border-gray-200 [&_[data-title]]:!text-gray-700 [&_[data-description]]:!text-gray-600',
            icon: 'col-start-1 row-start-1 self-start',
            loader:
              'col-start-1 row-start-1 self-start justify-self-center data-[visible=false]:hidden ![position:static] ![transform:none] !m-0',
            content: 'contents',
            title:
              'col-start-2 row-start-1 font-semibold text-sm flex min-w-0 items-start',
            actionButton:
              'col-start-3 row-start-3 mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500',
            cancelButton:
              'col-start-2 row-start-3 mt-1 inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50',
            closeButton:
              'col-start-3 row-start-1 justify-self-end rounded-md p-1 !text-gray-500 hover:!bg-white/90 !transition-colors',
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
    </>
  )
}
