import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  disabled?: boolean;
  'aria-label'?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

const variantClasses = {
  default:
    'border border-slate-300 bg-slate-100 text-slate-900 shadow-lg hover:bg-slate-200 hover:text-orange-500 hover:shadow-xl transition-all duration-300',
  ghost: 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300',
  outline:
    'border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-300',
};

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
  'aria-label': ariaLabel = 'Close',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-lg transition-all',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',

        // Size classes
        sizeClasses[size],

        // Variant classes
        variantClasses[variant],

        // Custom className
        className,
      )}
    >
      <X className={iconSizes[size]} />
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
};

// Export para facilitar o uso
export default CloseButton;
