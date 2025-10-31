'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import { Toaster as Sonner } from 'sonner'

export function SonnerToaster() {
  const toasterStyle = {
    '--gap': '1px',
  } as CSSProperties

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Posicionamento do toaster */
        [data-sonner-toaster] {
          position: fixed !important;
          top: 120px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 100 !important;
          max-width: 420px !important;
          width: 100% !important;
          padding: 0 1rem !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 0 !important;
        }

        /* Reset para lista OL do Sonner */
        [data-sonner-toaster] ol {
          list-style: none !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0 !important;
        }

        /* Reset para items LI do Sonner */
        [data-sonner-toaster] li {
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
        }

        /* Espaço mínimo entre os toasts */
        [data-sonner-toaster] li + li {
          margin-top: 2px !important;
        }

        body:has([class*='admin']) [data-sonner-toaster],
        .admin-body-layout [data-sonner-toaster] {
          top: 1.5rem !important;
        }

        @media (max-width: 640px) {
          [data-sonner-toaster] {
            top: 80px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            max-width: calc(100% - 2rem) !important;
          }

          body:has([class*='admin']) [data-sonner-toaster],
          .admin-body-layout [data-sonner-toaster] {
            top: 80px !important;
          }
        }

        /* Toast individual com padding e alinhamento */
        [data-sonner-toast][data-styled='true'] {
          width: 100% !important;
          margin: 0 !important;
          padding: 1rem !important;
          display: grid !important;
          grid-template-columns: auto minmax(0, 1fr) auto auto !important;
          grid-auto-flow: column !important;
          align-items: flex-start !important;
          gap: 0.75rem !important;
          transform: var(--y) scale(1) !important;
          transform-origin: top center !important;
          transition: transform 0.25s ease, opacity 0.25s ease !important;
          will-change: transform, opacity;
        }

        /* Icon aligned with title */
        [data-sonner-toast][data-styled='true'] [data-icon] {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          grid-column: 1 !important;
          grid-row: 1 !important;
          align-self: flex-start !important;
          margin-top: 0.125rem !important;
        }

        /* Content (title + description) */
        [data-sonner-toast][data-styled='true'] [data-content] {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.25rem !important;
          min-width: 0 !important;
          grid-column: 2 !important;
          grid-row: 1 !important;
          align-self: flex-start !important;
        }

        [data-sonner-toast][data-styled='true'] [data-button] {
          grid-column: 3 !important;
          grid-row: 1 !important;
          align-self: flex-start !important;
          justify-self: end !important;
          margin-left: 0 !important;
          margin-top: 0.125rem !important;
        }

        /* Close button aligned with title */
        [data-sonner-toast][data-styled='true'] [data-close-button] {
          position: relative !important;
          right: auto !important;
          top: auto !important;
          left: auto !important;
          width: 1.5rem !important;
          height: 1.5rem !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 0.5rem !important;
          background: transparent !important;
          color: rgb(148 163 184) !important;
          transition: background-color 0.2s ease, color 0.2s ease !important;
          border: none !important;
          padding: 0 !important;
          transform: none !important;
          grid-column: 4 !important;
          grid-row: 1 !important;
          justify-self: end !important;
          align-self: flex-start !important;
          margin-left: 0 !important;
          margin-top: 0.125rem !important;
        }

        [data-sonner-toast][data-styled='true'] [data-close-button]:hover {
          background-color: rgb(255 255 255 / 0.8) !important;
          color: rgb(71 85 105) !important;
          transform: none !important;
        }

        [data-sonner-toast][data-styled='true'] [data-close-button]:active {
          transform: none !important;
        }

        [data-sonner-toast][data-styled='true'] [data-close-button] svg {
          width: 0.75rem !important;
          height: 0.75rem !important;
        }

        /* Toasts antigos ficam menores gradualmente */
        [data-sonner-toast][data-styled='true'][data-index='1'] {
          transform: var(--y) scale(0.96) !important;
          opacity: 0.95 !important;
        }

        [data-sonner-toast][data-styled='true'][data-index='2'] {
          transform: var(--y) scale(0.92) !important;
          opacity: 0.9 !important;
        }

        [data-sonner-toast][data-styled='true'][data-index='3'],
        [data-sonner-toast][data-styled='true'][data-index='4'],
        [data-sonner-toast][data-styled='true'][data-index='5'],
        [data-sonner-toast][data-styled='true'][data-index='6'],
        [data-sonner-toast][data-styled='true'][data-index='7'],
        [data-sonner-toast][data-styled='true'][data-index='8'],
        [data-sonner-toast][data-styled='true'][data-index='9'] {
          display: none !important;
        }

      `,
        }}
      />
      <Sonner
        position="top-center"
        expand={true}
        richColors
        closeButton
        duration={4000}
        visibleToasts={3}
        gap={0}
        style={toasterStyle}
        icons={{
          success: <CircleCheckIcon className="size-5" />,
          info: <InfoIcon className="size-5" />,
          warning: <TriangleAlertIcon className="size-5" />,
          error: <OctagonXIcon className="size-5" />,
        }}
        toastOptions={{
          classNames: {
            toast:
              'rounded-lg shadow-xl backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300',
            title: 'text-sm font-semibold',
            description: 'text-sm opacity-90',
            success:
              'bg-gradient-to-br from-green-50/95 to-emerald-50/95 text-green-900',
            error:
              'bg-gradient-to-br from-red-50/95 to-rose-50/95 text-red-900',
            warning:
              'bg-gradient-to-br from-orange-50/95 to-amber-50/95 text-orange-900',
            info: 'bg-gradient-to-br from-blue-50/95 to-sky-50/95 text-blue-900',
            default: 'bg-white/95 text-gray-900',
            closeButton: '',
            icon: 'h-5 w-5',
          },
        }}
      />
    </>
  )
}
