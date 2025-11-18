'use client'

import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: 'floorplan' | 'design' | 'items'
  onTabChange: (tab: 'floorplan' | 'design' | 'items') => void
  children?: React.ReactNode
}

export function Sidebar({ activeTab, onTabChange, children }: SidebarProps) {
  const tabs = [
    { id: 'floorplan' as const, label: 'Edit Floorplan' },
    { id: 'design' as const, label: 'Design' },
    { id: 'items' as const, label: 'Add Items' },
  ]

  return (
    <div className="w-1/4 border-r border-gray-200 bg-white overflow-x-hidden overflow-y-auto p-5 h-screen">
      {/* Main Navigation */}
      <ul className="space-y-0 -mx-5 mb-5">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={cn(
              'cursor-pointer transition-colors',
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            )}
          >
            <button
              onClick={() => onTabChange(tab.id)}
              className="w-full text-left px-5 py-3 flex items-center justify-between"
            >
              {tab.label}
              <ChevronRight className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <hr className="my-5 border-gray-200" />

      {/* Context Menu Content */}
      <div>{children}</div>
    </div>
  )
}
