'use client'

import { useCallback, useEffect, useState } from 'react'

import { Dialog } from '@/components/ui/dialog'

import type { DialogStateUpdater } from './category-dialog'
import { CategoryDialog } from './category-dialog'

function CustomizeDialog({ onStateChange }: DialogStateUpdater) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onStateChange('customize', open)
  }, [open, onStateChange])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="-mx-1.5 -my-0.5 flex items-center justify-center rounded-sm px-1.5 py-0.5 text-base font-medium text-blue-800 transition hover:bg-blue-800/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-blue-800/10 dark:hover:bg-blue-800/15 dark:active:bg-blue-800/25">
        Customize
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Content>
            <Dialog.Body>
              <Dialog.BodyViewport style={{ scrollbarGutter: 'stable' }}>
                <Dialog.BodyContent className="space-y-6">
                  <div className="space-y-2">
                    <Dialog.Title className="-mt-1.5 text-lg font-medium">
                      Customize notification
                    </Dialog.Title>
                    <Dialog.Description className="text-base text-gray-600">
                      Review your settings here.
                    </Dialog.Description>
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <Dialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                      Close
                    </Dialog.Close>
                  </div>
                </Dialog.BodyContent>
              </Dialog.BodyViewport>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function NotificationsDialog({ onStateChange }: DialogStateUpdater) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onStateChange('notifications', open)
  }, [open, onStateChange])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        View notifications
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup variant="compact">
          <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            Notifications
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-base text-gray-600">
            You are all caught up. Good job!
          </Dialog.Description>
          <div className="flex items-center justify-end gap-4">
            <div className="mr-auto flex">
              <CustomizeDialog onStateChange={onStateChange} />
            </div>
            <Dialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default function PlaygroundPage() {
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({})

  const handleStateChange = useCallback(
    (key: string, isOpen: boolean) => {
      setDialogStates((prev) => {
        if (prev[key] === isOpen) return prev
        return { ...prev, [key]: isOpen }
      })
    },
    [setDialogStates]
  )

  useEffect(() => {
    const anyOpen = Object.values(dialogStates).some(Boolean)
    const targets = [document.documentElement, document.body]
    targets.forEach((target) => {
      if (!target) return
      if (anyOpen) {
        target.classList.add('overflow-hidden')
      } else {
        target.classList.remove('overflow-hidden')
      }
    })

    return () => {
      targets.forEach((target) => target?.classList.remove('overflow-hidden'))
    }
  }, [dialogStates])

  return (
    <main className="min-h-screen bg-slate-950/5 px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Exemplo Base — Nested Dialog
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Replica fielmente o exemplo do Base UI, mantendo o comportamento de
            nested dialogs e servindo como referência mínima de estilos.
          </p>
          <div className="mt-6 flex justify-center">
            <NotificationsDialog onStateChange={handleStateChange} />
          </div>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Fluxo — Criar/Editar Categoria
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Versão real do fluxo administrativo com preview, campos e footer
            padronizado. Edite aqui e, quando estiver pronto, mova o código para
            a página definitiva.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <CategoryDialog mode="create" onStateChange={handleStateChange} />
            <CategoryDialog mode="edit" onStateChange={handleStateChange} />
          </div>
        </section>
      </div>
    </main>
  )
}
