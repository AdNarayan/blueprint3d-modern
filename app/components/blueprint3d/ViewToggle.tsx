'use client'

import { cn } from '@/lib/utils'

interface ViewToggleProps {
  viewMode: '2d' | '3d'
  onViewChange: (mode: '2d' | '3d') => void
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="absolute top-5 right-5 flex gap-1 bg-card border border-border rounded overflow-hidden">
      <button
        onClick={() => onViewChange('3d')}
        className={cn(
          'px-3 py-1.5 text-sm transition-colors',
          viewMode === '3d'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-foreground hover:bg-accent'
        )}
      >
        3D
      </button>
      <button
        onClick={() => onViewChange('2d')}
        className={cn(
          'px-3 py-1.5 text-sm transition-colors',
          viewMode === '2d'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-foreground hover:bg-accent'
        )}
      >
        2D
      </button>
    </div>
  )
}
