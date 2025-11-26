'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

interface MainControlsProps {
  onNew: () => void
  onSave: () => void
  onDownload: () => void
  onLoad: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function MainControls({ onNew, onSave, onDownload, onLoad }: MainControlsProps) {
  const t = useTranslations('mainControls')

  return (
    <div className="absolute top-5 left-5 flex gap-2">
      <Button onClick={onNew} variant="outline" size="sm">
        {t('newPlan')}
      </Button>
      <Button
        onClick={onSave}
        variant="default"
        size="sm"
        className="bg-primary text-primary-foreground"
      >
        {t('savePlan')}
      </Button>
      <Button onClick={onDownload} variant="outline" size="sm">
        {t('downloadPlan')}
      </Button>
      <Button variant="outline" size="sm" asChild>
        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={onLoad} accept=".lumenfeng" />
          {t('loadPlan')}
        </label>
      </Button>
    </div>
  )
}
