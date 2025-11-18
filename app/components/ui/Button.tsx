import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500':
              variant === 'default',
            'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500':
              variant === 'primary',
            'bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-500':
              variant === 'danger',
            'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-gray-500':
              variant === 'secondary',
            'px-2 py-1 text-xs': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
