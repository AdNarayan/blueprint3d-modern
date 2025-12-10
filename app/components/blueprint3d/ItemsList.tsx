'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { ITEMS, type ItemCategory } from '@blueprint3d/constants'
import { useI18n } from '../../providers/I18nProvider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ItemsListProps {
  onItemSelect: (item: { name: string; model: string; type: string }) => void
  /** Generator mode: only show doors and windows */
  mode?: 'normal' | 'generator'
}

const CATEGORY_KEYS = {
  'all': 'all',
  'bed': 'bed',
  'drawer': 'drawer',
  'wardrobe': 'wardrobe',
  'light': 'light',
  'storage': 'storage',
  'table': 'table',
  'chair': 'chair',
  'sofa': 'sofa',
  'armchair': 'armchair',
  'stool': 'stool',
  'door': 'door',
  'window': 'window'
} as const

const CATEGORY_VALUES: Array<ItemCategory | 'all'> = ['all', 'bed', 'drawer', 'wardrobe', 'light', 'storage', 'table', 'chair', 'sofa', 'armchair', 'stool', 'door', 'window']

const GENERATOR_MODE_CATEGORY_VALUES: Array<ItemCategory | 'all'> = ['all', 'door', 'window']

export function ItemsList({ onItemSelect, mode = 'normal' }: ItemsListProps) {
  const i18n = useI18n()
  const t = i18n.createT('items')

  // In generator mode, default to 'all' which will show doors and windows
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all')

  // Determine which categories to show based on mode
  const categoryValues = mode === 'generator' ? GENERATOR_MODE_CATEGORY_VALUES : CATEGORY_VALUES

  // Build categories with translated labels
  const categories = useMemo(() => {
    return categoryValues.map(value => ({
      value,
      label: t(`categories.${CATEGORY_KEYS[value]}`)
    }))
  }, [t])

  // Filter items based on selected category and mode
  const filteredItems = useMemo(() => {
    let items = ITEMS

    // In generator mode, only show doors and windows
    if (mode === 'generator') {
      items = items.filter(item => item.category === 'door' || item.category === 'window')
    }

    // Then apply category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory)
    }

    return items
  }, [selectedCategory, mode])

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ItemCategory | 'all')}>
        <TabsList className="w-full justify-start flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value} className="whitespace-nowrap">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Items Grid */}
      <div className="grid grid-cols-4 gap-3">
        {filteredItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onItemSelect(item)}
            className="border border-border rounded hover:border-primary transition-colors p-2 flex flex-col items-center gap-2 cursor-pointer bg-card"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={item.image}
                alt={t(item.key)}
                fill
                sizes="(max-width: 768px) 25vw, 10vw"
                className="object-contain"
              />
            </div>
            <span className="text-xs text-center">{t(item.key)}</span>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No items found in this category
        </div>
      )}
    </div>
  )
}
