'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useI18n } from '../../providers/I18nProvider'
import { Configuration, configDimUnit } from '@blueprint3d/core/configuration'

interface BedSizeInputProps {
  onSizeChange: (width: number, length: number) => void
  defaultWidth?: number
  defaultLength?: number
}

export function BedSizeInput({
  onSizeChange,
  defaultWidth = 150,
  defaultLength = 200
}: BedSizeInputProps) {
  const i18n = useI18n()
  const t = i18n.createT('bedSizeInput')

  // Store the actual values in cm (internal representation)
  const [widthCm, setWidthCm] = useState(defaultWidth)
  const [lengthCm, setLengthCm] = useState(defaultLength)

  // Display values in current unit
  const [width, setWidth] = useState(0)
  const [length, setLength] = useState(0)
  const [currentUnit, setCurrentUnit] = useState('inch')

  // Convert cm to display unit
  const cmToDisplay = (cm: number, unit: string): number => {
    switch (unit) {
      case 'inch':
        return cm / 2.54
      case 'm':
        return cm / 100
      case 'cm':
        return cm
      case 'mm':
        return cm * 10
      default:
        return cm / 2.54
    }
  }

  // Convert display unit to cm
  const displayToCm = (value: number, unit: string): number => {
    switch (unit) {
      case 'inch':
        return value * 2.54
      case 'm':
        return value * 100
      case 'cm':
        return value
      case 'mm':
        return value / 10
      default:
        return value * 2.54
    }
  }

  // Get unit label
  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case 'inch':
        return t('units.inches')
      case 'm':
        return t('units.meters')
      case 'cm':
        return t('units.centimeters')
      case 'mm':
        return t('units.millimeters')
      default:
        return t('units.inches')
    }
  }

  // Get decimal places for unit
  const getDecimalPlaces = (unit: string): number => {
    switch (unit) {
      case 'inch':
        return 0
      case 'm':
        return 2
      case 'cm':
        return 1
      case 'mm':
        return 0
      default:
        return 0
    }
  }

  // Initialize and listen to unit changes
  useEffect(() => {
    // Get current unit from Configuration
    const unit = Configuration.getStringValue(configDimUnit)
    setCurrentUnit(unit)

    // Update display values based on current cm values and new unit
    const decimals = getDecimalPlaces(unit)
    setWidth(Number(cmToDisplay(widthCm, unit).toFixed(decimals)))
    setLength(Number(cmToDisplay(lengthCm, unit).toFixed(decimals)))

    // Listen to localStorage changes (when unit changes in Settings)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dimensionUnit' && e.newValue) {
        const newUnit = e.newValue
        setCurrentUnit(newUnit)
        const newDecimals = getDecimalPlaces(newUnit)
        setWidth(Number(cmToDisplay(widthCm, newUnit).toFixed(newDecimals)))
        setLength(Number(cmToDisplay(lengthCm, newUnit).toFixed(newDecimals)))
      }
    }

    // Also listen to custom event for same-window changes
    const handleUnitChange = ((e: CustomEvent) => {
      const newUnit = e.detail.unit
      setCurrentUnit(newUnit)
      const newDecimals = getDecimalPlaces(newUnit)
      setWidth(Number(cmToDisplay(widthCm, newUnit).toFixed(newDecimals)))
      setLength(Number(cmToDisplay(lengthCm, newUnit).toFixed(newDecimals)))
    }) as EventListener

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('dimensionUnitChanged', handleUnitChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('dimensionUnitChanged', handleUnitChange)
    }
  }, [widthCm, lengthCm])

  const handleSizeChange = (field: 'width' | 'length', value: number) => {
    // Update display value
    if (field === 'width') {
      setWidth(value)
      const newWidthCm = displayToCm(value, currentUnit)
      setWidthCm(newWidthCm)
      // Notify parent with cm values
      onSizeChange(newWidthCm, lengthCm)
    } else {
      setLength(value)
      const newLengthCm = displayToCm(value, currentUnit)
      setLengthCm(newLengthCm)
      // Notify parent with cm values
      onSizeChange(widthCm, newLengthCm)
    }
  }

  // Get min/max values based on current unit
  const getMinMax = (minCm: number, maxCm: number) => {
    const decimals = getDecimalPlaces(currentUnit)
    return {
      min: Number(cmToDisplay(minCm, currentUnit).toFixed(decimals)),
      max: Number(cmToDisplay(maxCm, currentUnit).toFixed(decimals)),
      step: currentUnit === 'm' ? 0.01 : currentUnit === 'cm' ? 1 : 0.1
    }
  }

  const widthMinMax = getMinMax(80, 300) // Width: 80cm - 300cm
  const lengthMinMax = getMinMax(150, 300) // Length: 150cm - 300cm

  return (
    <div className="mx-5 mb-4">
      <span className="text-lg font-semibold">{t('title')}</span>
      <br />
      <br />
      <div className="border border-border rounded">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-medium">{t('bedDimensions')}</h3>
        </div>
        <div className="p-4 text-foreground">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm">{t('width')}</label>
              <Input
                type="number"
                value={width}
                onChange={(e) => handleSizeChange('width', Number(e.target.value))}
                min={widthMinMax.min}
                max={widthMinMax.max}
                step={widthMinMax.step}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-20 text-sm">{t('length')}</label>
              <Input
                type="number"
                value={length}
                onChange={(e) => handleSizeChange('length', Number(e.target.value))}
                min={lengthMinMax.min}
                max={lengthMinMax.max}
                step={lengthMinMax.step}
              />
            </div>
          </div>
          <small className="text-muted-foreground text-xs mt-3 block">
            {t('measurementsIn')} {getUnitLabel(currentUnit)}.
          </small>
        </div>
      </div>
    </div>
  )
}
