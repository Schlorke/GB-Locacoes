'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

type SelectProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> & {
  modal?: boolean
}

const Select = ({ modal = false, children, ...props }: SelectProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rootProps = { ...props, modal } as any
  return <SelectPrimitive.Root {...rootProps}>{children}</SelectPrimitive.Root>
}

Select.displayName = SelectPrimitive.Root.displayName

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  // Prevenir bloqueio de scroll quando não é modal
  const contentRef = React.useRef<HTMLDivElement>(null)
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  React.useEffect(() => {
    const content = contentRef.current
    if (!content) return

    // Só aplicar fix se o select estiver em modo não-modal
    const root = content.closest('[data-radix-select-root]')
    const isNonModal =
      root?.getAttribute('data-modal') === 'false' ||
      (root && !root.hasAttribute('data-modal'))

    if (!isNonModal) return

    // Função para remover bloqueio de scroll do Radix
    const removeScrollLock = () => {
      // 1. Remover wrapper de scroll lock (causa barra branca e deslocamento)
      const scrollLockWrappers = document.querySelectorAll(
        '[data-radix-scroll-lock-wrapper]'
      )
      scrollLockWrappers.forEach((wrapper) => {
        if (
          wrapper.parentNode === document.body &&
          wrapper.children.length > 0
        ) {
          Array.from(wrapper.children).forEach((child) => {
            document.body.insertBefore(child, wrapper)
          })
        }
        try {
          wrapper.remove()
        } catch {
          const element = wrapper as HTMLElement
          element.style.display = 'none'
        }
      })

      // 2. Remover atributos e classes de bloqueio
      document.body.removeAttribute('data-scroll-locked')
      document.body.classList.remove('overflow-hidden')
      document.documentElement.removeAttribute('data-scroll-locked')
      document.documentElement.classList.remove('overflow-hidden')

      // 3. Remover estilos inline usando setProperty com !important
      const bodyStyles: Array<[string, string]> = [
        ['overflow', ''],
        ['padding-right', '0'],
        ['padding-left', '0'],
        ['padding-top', '0'],
        ['padding-bottom', '0'],
        ['margin-right', '0'],
        ['margin-left', '0'],
        ['margin-top', '0'],
        ['margin-bottom', '0'],
        ['position', 'static'],
        ['top', 'auto'],
        ['left', 'auto'],
        ['right', 'auto'],
        ['bottom', 'auto'],
        ['width', '100%'],
        ['height', 'auto'],
        ['pointer-events', ''],
        ['--removed-body-scroll-bar-size', '0'],
      ]

      bodyStyles.forEach(([prop, value]) => {
        document.body.style.setProperty(prop, value, 'important')
      })

      // 4. Limpar estilos do documentElement
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = ''
      document.documentElement.style.marginRight = ''
    }

    // Intervalo contínuo para remover scroll lock enquanto o select está aberto
    let intervalId: NodeJS.Timeout | null = null

    // Observer para monitorar mudanças no estado do content
    const observer = new MutationObserver(() => {
      const isOpen = content.getAttribute('data-state') === 'open'

      if (isOpen) {
        // Remover imediatamente
        removeScrollLock()

        // Iniciar intervalo para remover continuamente enquanto aberto (mais agressivo)
        if (!intervalId) {
          intervalId = setInterval(() => {
            if (content.getAttribute('data-state') === 'open') {
              removeScrollLock()
              // Verificar se ainda há bloqueio e forçar remoção
              if (
                document.body.getAttribute('data-scroll-locked') ||
                document.body.style.pointerEvents === 'none'
              ) {
                removeScrollLock()
              }
            } else {
              // Parar intervalo quando fechar
              if (intervalId) {
                clearInterval(intervalId)
                intervalId = null
              }
            }
          }, 10) // Aumentado para ~100fps para garantir remoção ainda mais rápida
        }
      } else {
        // Parar intervalo quando fechar
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
        // Limpar uma última vez ao fechar
        removeScrollLock()
      }
    })

    observer.observe(content, {
      attributes: true,
      attributeFilter: ['data-state'],
    })

    // Observer para monitorar mudanças no body (quando Radix adiciona overflow-hidden, data-scroll-locked, pointer-events)
    const bodyObserver = new MutationObserver(() => {
      if (content.getAttribute('data-state') === 'open') {
        removeScrollLock()
      }
    })

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-scroll-locked'], // Monitorar data-scroll-locked especificamente
      childList: true, // Monitorar adição de elementos filhos (wrappers)
      subtree: false,
    })

    bodyObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-scroll-locked'],
    })

    // Remover imediatamente se já estiver aberto
    if (content.getAttribute('data-state') === 'open') {
      // Remover múltiplas vezes para garantir
      removeScrollLock()
      requestAnimationFrame(() => {
        removeScrollLock()
        requestAnimationFrame(() => {
          removeScrollLock()
        })
      })
      intervalId = setInterval(() => {
        if (content.getAttribute('data-state') === 'open') {
          removeScrollLock()
          // Verificar se ainda há bloqueio e forçar remoção
          if (
            document.body.getAttribute('data-scroll-locked') ||
            document.body.style.pointerEvents === 'none'
          ) {
            removeScrollLock()
          }
        } else {
          if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
          }
        }
      }, 10)
    }

    return () => {
      observer.disconnect()
      bodyObserver.disconnect()
      if (intervalId) {
        clearInterval(intervalId)
      }
      // Limpar ao desmontar
      removeScrollLock()
    }
  }, [])

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={combinedRef}
        className={cn(
          'relative z-[var(--z-dropdown)] max-h-[300px] min-w-[8rem] overflow-hidden rounded-md border-0 bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        side="bottom"
        align="start"
        sideOffset={5}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1 filter-dropdown-scroll',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-left transition-colors duration-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600 focus:outline-none focus:ring-0',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
