'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  key: string
  label: string
  type: 'boolean' | 'text' | 'number'
  required?: boolean
}

interface DeliveryChecklistProps {
  checklist: Record<string, boolean | string | number> | null
  onChecklistChange: (
    _checklist: Record<string, boolean | string | number>
  ) => void
  type: 'DELIVERY' | 'PICKUP'
}

const deliveryChecklistItems: ChecklistItem[] = [
  {
    key: 'equipment_checked',
    label: 'Equipamento verificado e funcionando',
    type: 'boolean',
    required: true,
  },
  {
    key: 'accessories_complete',
    label: 'Acessórios completos',
    type: 'boolean',
    required: true,
  },
  {
    key: 'visual_inspection',
    label: 'Inspeção visual realizada',
    type: 'boolean',
    required: true,
  },
  {
    key: 'documentation_provided',
    label: 'Documentação fornecida',
    type: 'boolean',
    required: true,
  },
  {
    key: 'customer_present',
    label: 'Cliente presente na entrega',
    type: 'boolean',
    required: false,
  },
  {
    key: 'customer_signature',
    label: 'Assinatura do cliente obtida',
    type: 'boolean',
    required: true,
  },
  {
    key: 'condition_notes',
    label: 'Observações sobre condição',
    type: 'text',
    required: false,
  },
  {
    key: 'odometer_reading',
    label: 'Leitura do odômetro/horímetro',
    type: 'number',
    required: false,
  },
]

const pickupChecklistItems: ChecklistItem[] = [
  {
    key: 'equipment_returned',
    label: 'Equipamento devolvido',
    type: 'boolean',
    required: true,
  },
  {
    key: 'accessories_returned',
    label: 'Acessórios devolvidos',
    type: 'boolean',
    required: true,
  },
  {
    key: 'visual_inspection',
    label: 'Inspeção visual realizada',
    type: 'boolean',
    required: true,
  },
  {
    key: 'damage_detected',
    label: 'Danos detectados',
    type: 'boolean',
    required: false,
  },
  {
    key: 'damage_description',
    label: 'Descrição dos danos',
    type: 'text',
    required: false,
  },
  {
    key: 'customer_present',
    label: 'Cliente presente na coleta',
    type: 'boolean',
    required: false,
  },
  {
    key: 'customer_signature',
    label: 'Assinatura do cliente obtida',
    type: 'boolean',
    required: true,
  },
  {
    key: 'condition_notes',
    label: 'Observações sobre condição',
    type: 'text',
    required: false,
  },
  {
    key: 'odometer_reading',
    label: 'Leitura do odômetro/horímetro',
    type: 'number',
    required: false,
  },
]

export function DeliveryChecklist({
  checklist,
  onChecklistChange,
  type,
}: DeliveryChecklistProps) {
  const items =
    type === 'DELIVERY' ? deliveryChecklistItems : pickupChecklistItems
  const currentChecklist = checklist || {}

  const handleChange = (key: string, value: boolean | string | number) => {
    onChecklistChange({
      ...currentChecklist,
      [key]: value,
    })
  }

  const getValue = (key: string, type: string): boolean | string | number => {
    const value = currentChecklist[key]
    if (type === 'boolean') {
      return value === true || value === 'true'
    }
    if (type === 'number') {
      return value ? Number(value) : ''
    }
    return (value as string) || ''
  }

  const getBooleanValue = (key: string): boolean => {
    const value = currentChecklist[key]
    return value === true || value === 'true'
  }

  const getStringValue = (key: string): string => {
    const value = currentChecklist[key]
    return (value as string) || ''
  }

  const getNumberValue = (key: string): number | '' => {
    const value = currentChecklist[key]
    return value ? Number(value) : ''
  }

  const completedCount = items.filter((item) => {
    if (item.type === 'boolean') {
      return getValue(item.key, 'boolean')
    }
    return currentChecklist[item.key]
  }).length

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Checklist de {type === 'DELIVERY' ? 'Entrega' : 'Coleta'}</span>
          <span className="text-sm font-normal text-gray-500">
            {completedCount}/{items.length} concluídos
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.key} className="space-y-2">
            {item.type === 'boolean' ? (
              <div className="flex items-start gap-3">
                <Checkbox
                  id={item.key}
                  checked={getBooleanValue(item.key)}
                  onCheckedChange={(checked) =>
                    handleChange(item.key, checked === true)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor={item.key}
                  className={cn(
                    'flex-1 cursor-pointer',
                    item.required && 'font-medium'
                  )}
                >
                  {item.label}
                  {item.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                {getValue(item.key, 'boolean') ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                )}
              </div>
            ) : item.type === 'text' ? (
              <div className="space-y-2">
                <Label htmlFor={item.key}>
                  {item.label}
                  {item.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Textarea
                  id={item.key}
                  value={getStringValue(item.key)}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  placeholder="Digite as observações..."
                  rows={3}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor={item.key}>
                  {item.label}
                  {item.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id={item.key}
                  type="number"
                  value={getNumberValue(item.key)}
                  onChange={(e) =>
                    handleChange(
                      item.key,
                      e.target.value ? Number(e.target.value) : ''
                    )
                  }
                  placeholder="Digite o valor..."
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
