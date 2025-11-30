import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-slate-700 text-white border shadow-md hover:bg-slate-600 hover:scale-105 hover:shadow-lg',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:scale-105 hover:shadow-lg hover:text-orange-500 group',
        outline:
          'border bg-background shadow-md hover:text-orange-600 hover:scale-105 hover:shadow-lg',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:scale-105 hover:shadow-lg',
        ghost: 'hover:text-orange-600 hover:scale-105',
        reset:
          'border shadow-md hover:text-orange-500 hover:scale-105 hover:shadow-lg group',
        gradient: 'text-white border shadow-md hover:scale-105 hover:shadow-lg',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        compact: 'h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm',
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-10 rounded-md px-4 text-sm',
        lg: 'h-12 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
