'use client'

import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface EquipmentInclusionItemProps {
  iconColor: 'green' | 'blue' | 'orange'
  text: string
}

export function EquipmentInclusionItem({
  iconColor,
  text,
}: EquipmentInclusionItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const iconColorClass = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
  }

  return (
    <div
      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CheckCircle className={`h-5 w-5 ${iconColorClass[iconColor]}`} />
      <span
        className="font-medium transition-colors duration-300"
        style={{ color: isHovered ? '#ea580c' : '#374151' }}
      >
        {text}
      </span>
    </div>
  )
}
