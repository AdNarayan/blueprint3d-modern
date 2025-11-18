'use client'

import { ITEMS } from '@/lib/constants'
import Image from 'next/image'

interface ItemsListProps {
  onItemSelect: (item: {
    name: string
    model: string
    type: string
  }) => void
}

export function ItemsList({ onItemSelect }: ItemsListProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ITEMS.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemSelect(item)}
          className="border border-gray-200 rounded hover:border-blue-500 transition-colors p-2 flex flex-col items-center gap-2 cursor-pointer bg-white"
        >
          <div className="relative w-full aspect-square">
            <img
              src={`/${item.image}`}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs text-center">{item.name}</span>
        </button>
      ))}
    </div>
  )
}
