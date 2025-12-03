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

const CATEGORIES: Array<{ value: ItemCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'bed', label: 'Beds' },
  { value: 'drawer', label: 'Drawers' },
  { value: 'wardrobe', label: 'Wardrobes' },
  { value: 'light', label: 'Lights' },
  { value: 'storage', label: 'Storage' },
  { value: 'table', label: 'Tables' },
  { value: 'chair', label: 'Chairs' },
  { value: 'sofa', label: 'Sofas' },
  { value: 'armchair', label: 'Armchairs' },
  { value: 'stool', label: 'Stools' },
  { value: 'door', label: 'Doors' },
  { value: 'window', label: 'Windows' }
]

const GENERATOR_MODE_CATEGORIES: Array<{ value: ItemCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'door', label: 'Doors' },
  { value: 'window', label: 'Windows' }
]

export function ItemsList({ onItemSelect, mode = 'normal' }: ItemsListProps) {
  const i18n = useI18n()
  const t = i18n.createT('items')

  // In generator mode, default to 'all' which will show doors and windows
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all')

  // Determine which categories to show based on mode
  const categories = mode === 'generator' ? GENERATOR_MODE_CATEGORIES : CATEGORIES

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
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
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
