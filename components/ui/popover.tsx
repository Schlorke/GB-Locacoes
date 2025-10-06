'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Dialog,
  DialogContent as UIDialogContent,
  DialogTitle,
  DialogTrigger as UIDialogTrigger,
} from '@/components/ui/dialog'

type PopoverRootProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Root
>

interface PopoverContextValue {
  isMobile: boolean
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

const usePopoverContext = () => {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) return { isMobile: false }
  return ctx
}

const Popover = ({ children, ...props }: PopoverRootProps) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <PopoverContext.Provider value={{ isMobile }}>
        <Dialog open={props.open} defaultOpen={props.defaultOpen} onOpenChange={props.onOpenChange}>
          {children}
        </Dialog>
      </PopoverContext.Provider>
    )
  }

  return (
    <PopoverContext.Provider value={{ isMobile }}>
      <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  const { isMobile } = usePopoverContext()

  if (isMobile) {
    return (
      <UIDialogTrigger asChild {...props} ref={ref as unknown as React.Ref<HTMLButtonElement>}>
        {children}
      </UIDialogTrigger>
    )
  }

  return (
    <PopoverPrimitive.Trigger asChild {...props} ref={ref}>
      {children}
    </PopoverPrimitive.Trigger>
  )
})
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    { className, align = 'center', sideOffset = 4, children, ...props },
    ref
  ) => {
    const { isMobile } = usePopoverContext()

    if (isMobile) {
      return (
        <UIDialogContent
          data-popover-dialog
          className={cn(
            'z-[99999] w-full max-w-[calc(100vw-1rem)] p-0 sm:rounded-lg h-auto max-h-fit overflow-visible',
            className
          )}
          closeButtonClassName="hidden"
        >
          <DialogTitle className="sr-only">Popover Content</DialogTitle>
          {children}
        </UIDialogContent>
      )
    }

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'h-auto max-h-fit overflow-visible',
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    )
  }
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
