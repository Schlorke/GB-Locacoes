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
      {/*
        FIX: Previne que toasts COM descrição encolham quando toasts SEM descrição aparecem.

        PROBLEMA: Com expand={false}, o Sonner usa --initial-height para colapsar todas as toasts
        para o tamanho da menor toast visível. Isso fazia toasts com descrição (~76px) encolherem
        quando toasts sem descrição (~54px) apareciam.

        SOLUÇÃO: Forçar height: auto !important em todas as toasts para que cada uma mantenha
        sua altura natural baseada no conteúdo, sem influência mútua.

        RESULTADO:
        - ✅ Toasts COM descrição: mantêm ~76px naturais
        - ✅ Toasts SEM descrição: mantêm ~54px naturais
        - ✅ Zero influência mútua entre diferentes tipos
        - ✅ Animações expand={false} preservadas

        FIX: mantém loader das toasts promise alinhado sem aparecer após resolução

        [data-sonner-toast] .sonner-loader[data-visible='true'] {
          position: static !important;
          transform: none !important;
          margin: 0 !important;
          margin-left: 0.5rem !important;
        }
        [data-sonner-toast] .sonner-loader[data-visible='false'] {
          display: none !important;
        }

      */}
      <style jsx global>{`
        [data-sonner-toast] {
          height: auto !important;
        }
        [data-sonner-toast] .sonner-loader[data-visible='true'] {
          position: static !important;
          transform: none !important;
          margin: 0 !important;
          margin-left: 0.5rem !important;
        }
        [data-sonner-toast] .sonner-loader[data-visible='false'] {
          display: none !important;
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
            'text-sm block mt-0.5 !text-gray-500 basis-full w-full',
          // Grid layout keeps icon/content on the first row and places cancel/confirm buttons below.
          classNames: {
            toast:
              'grid grid-cols-[auto_1fr_auto] items-start gap-x-3 p-4 rounded-lg shadow-lg border w-full md:max-w-[364px]',
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
            icon: 'col-start-1 row-span-2 self-start',
            content: 'col-start-2 row-start-1 flex flex-col gap-1 min-w-0',
            title: 'font-semibold text-sm',
            actionButton:
              'col-start-3 row-start-2 mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500',
            cancelButton:
              'col-start-2 row-start-2 mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50',
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

