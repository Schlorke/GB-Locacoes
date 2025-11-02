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
 *
 * ESTILIZAÇÃO DE BOTÕES POR TIPO DE TOAST:
 * Use a sintaxe Tailwind CSS para estilizar elementos internos baseado no tipo de toast:
 *
 * Exemplo: [&_button[data-close-button]:hover]:!bg-gray-100
 *
 * Onde:
 * - [&_ ...] = Seletor filho descendente (scoped ao classNames do tipo de toast)
 * - button[data-close-button] = Seletor específico do botão close
 * - :hover = Pseudo-classe CSS
 * - :!bg-gray-100 = Classe Tailwind com !important após os dois pontos
 *
 * Esta sintaxe permite que cada TIPO de toast (success, error, warning, info, loading, default)
 * tenha cores diferentes para os MESMOS elementos (botões, ícones, textos).
 *
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
          info: <InfoIcon className="size-5 !text-gray-700" />,
          warning: <TriangleAlertIcon className="size-5 !text-orange-700" />,
          error: <OctagonXIcon className="size-5 !text-red-700" />,
          loading: (
            <Loader2Icon className="size-5 animate-spin !text-gray-700" />
          ),
        }}
        toastOptions={{
          unstyled: true,
          // Descrição ocupa 2 colunas (col-start-2 + col-span-2 = colunas 2 e 3)
          // Isso evita que a descrição fique comprimida pelos botões na linha 3
          // col-span-2: Expande a descrição para ocupar as colunas 2 e 3, ficando mais larga
          descriptionClassName:
            'col-start-2 col-span-2 row-start-2 text-sm block !text-gray-500',
          classNames: {
            toast:
              'grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1 p-4 rounded-lg shadow-lg border w-full md:max-w-[364px]',
            default:
              'bg-white border shadow-md hover:shadow-lg [&_[data-title]]:text-gray-900',
            success:
              '!bg-green-50 !border-green-100 [&_[data-title]]:!text-green-700 [&_[data-description]]:!text-green-600',
            error:
              '!bg-red-50 !border-red-100 [&_[data-title]]:!text-red-700 [&_[data-description]]:!text-red-600',
            warning:
              '!bg-yellow-50 !border-yellow-100 [&_[data-title]]:!text-orange-700 [&_[data-description]]:!text-orange-600',
            // Sintaxe para estilizar botões por tipo: [&_button[seletor]:hover]:!classe
            // Permite cada tipo de toast ter cores diferentes para os mesmos botões
            info: '!bg-gray !border-gray-100 [&_[data-title]]:!text-gray-700 [&_[data-description]]:!text-gray-600 [&_button[data-close-button]:hover]:!bg-gray-100',
            loading:
              '!bg-gray-40 !border-gray-100 [&_[data-title]]:!text-gray-700 [&_[data-description]]:!text-gray-600',
            icon: 'col-start-1 row-start-1 self-start',
            loader:
              'col-start-1 row-start-1 self-start justify-self-center data-[visible=false]:hidden ![position:static] ![transform:none]',
            content: 'contents',
            title:
              'col-start-2 row-start-1 font-semibold text-sm flex min-w-0 items-start',
            actionButton:
              'col-start-3 row-start-3 mt-4 inline-flex items-center justify-center gap-2  rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors shadow-md hover:shadow-sm active:shadow-none active:text-gray-500 !transition-all',
            cancelButton:
              'col-start-2 row-start-3 mt-4 justify-self-end w-auto inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors shadow-md hover:shadow-sm active:shadow-none active:text-gray-500 !transition-all',
            closeButton:
              'absolute top-2 right-2 rounded-md p-1 !text-gray-500 hover:!bg-white/90 !transition-colors',
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
        duration={4000}
        visibleToasts={3}
        {...props}
      />
    </>
  )
}
