import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-slate-700 text-white border border-slate-700 shadow-md hover:bg-slate-600 hover:border-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-200',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:scale-105 hover:shadow-lg hover:text-orange-500 group transition-all duration-200',
        outline:
          'border border-gray-300 bg-background shadow-md hover:text-orange-600 hover:border-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-200',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:scale-105 hover:shadow-lg transition-all duration-200',
        ghost:
          'border border-transparent hover:text-orange-600 hover:scale-105 transition-all duration-200',
        reset:
          'border border-gray-300 shadow-md hover:text-orange-500 hover:border-orange-500 hover:scale-105 hover:shadow-lg group transition-all duration-200',
        gradient:
          'text-white border border-transparent shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200',
        link: 'text-primary underline-offset-4 hover:underline transition-colors duration-200',
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
