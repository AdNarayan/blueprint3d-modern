'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface ContextMenuProps {
  selectedItem: any | null
  onDelete: () => void
  onResize: (height: number, width: number, depth: number) => void
  onFixedChange: (fixed: boolean) => void
}

export function ContextMenu({
  selectedItem,
  onDelete,
  onResize,
  onFixedChange,
}: ContextMenuProps) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [depth, setDepth] = useState(0)
  const [fixed, setFixed] = useState(false)

  const cmToIn = (cm: number) => cm / 2.54
  const inToCm = (inches: number) => inches * 2.54

  useEffect(() => {
    if (selectedItem) {
      setWidth(Number(cmToIn(selectedItem.getWidth()).toFixed(0)))
      setHeight(Number(cmToIn(selectedItem.getHeight()).toFixed(0)))
      setDepth(Number(cmToIn(selectedItem.getDepth()).toFixed(0)))
      setFixed(selectedItem.fixed || false)
    }
  }, [selectedItem])

  const handleResize = (field: 'width' | 'height' | 'depth', value: number) => {
    const newWidth = field === 'width' ? value : width
    const newHeight = field === 'height' ? value : height
    const newDepth = field === 'depth' ? value : depth

    if (field === 'width') setWidth(value)
    if (field === 'height') setHeight(value)
    if (field === 'depth') setDepth(value)

    onResize(inToCm(newHeight), inToCm(newWidth), inToCm(newDepth))
  }

  const handleFixedChange = (checked: boolean) => {
    setFixed(checked)
    onFixedChange(checked)
  }

  if (!selectedItem) {
    return null
  }

  return (
    <div className="mx-5">
      <span className="text-lg font-semibold">
        {selectedItem.metadata?.itemName}
      </span>
      <br />
      <br />
      <Button
        variant="danger"
        className="w-full flex items-center justify-center gap-2"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
        Delete Item
      </Button>
      <br />
      <div className="border border-gray-200 rounded">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium">Adjust Size</h3>
        </div>
        <div className="p-4 text-gray-900">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm">Width</label>
              <Input
                type="number"
                value={width}
                onChange={(e) =>
                  handleResize('width', Number(e.target.value))
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm">Depth</label>
              <Input
                type="number"
                value={depth}
                onChange={(e) =>
                  handleResize('depth', Number(e.target.value))
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm">Height</label>
              <Input
                type="number"
                value={height}
                onChange={(e) =>
                  handleResize('height', Number(e.target.value))
                }
              />
            </div>
          </div>
          <small className="text-gray-500 text-xs mt-3 block">
            Measurements in inches.
          </small>
        </div>
      </div>

      <label className="flex items-center gap-2 mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={fixed}
          onChange={(e) => handleFixedChange(e.target.checked)}
          className="rounded"
        />
        <span className="text-sm">Lock in place</span>
      </label>
    </div>
  )
}
