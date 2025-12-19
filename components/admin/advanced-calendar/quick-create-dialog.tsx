'use client'

import { useState } from 'react'
import { format, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Clock } from 'lucide-react'
import type { CalendarEvent } from './types'

interface QuickCreateDialogProps {
  open: boolean
  onOpenChange: (_open: boolean) => void
  defaultDate: Date
  defaultStartTime?: Date
  defaultEndTime?: Date
  onCreate?: (_event: Partial<CalendarEvent>) => void
  onMoreDetails?: (_event: Partial<CalendarEvent>) => void
}

const EVENT_TYPES: Array<{
  value: CalendarEvent['type']
  label: string
}> = [
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'rental', label: 'Locação' },
  { value: 'delivery', label: 'Entrega' },
  { value: 'pickup', label: 'Retirada' },
]

export function QuickCreateDialog({
  open,
  onOpenChange,
  defaultDate,
  defaultStartTime,
  defaultEndTime,
  onCreate,
  onMoreDetails,
}: QuickCreateDialogProps) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<CalendarEvent['type']>('maintenance')
  const [startHour, setStartHour] = useState(
    defaultStartTime ? format(defaultStartTime, 'HH') : format(new Date(), 'HH')
  )
  const [startMinute, setStartMinute] = useState(
    defaultStartTime ? format(defaultStartTime, 'mm') : '00'
  )
  const [endHour, setEndHour] = useState(
    defaultEndTime
      ? format(defaultEndTime, 'HH')
      : String((parseInt(format(new Date(), 'HH')) + 1) % 24).padStart(2, '0')
  )
  const [endMinute, setEndMinute] = useState(
    defaultEndTime ? format(defaultEndTime, 'mm') : '00'
  )

  const handleCreate = () => {
    if (!title.trim()) return

    const start = setMinutes(
      setHours(defaultDate, parseInt(startHour)),
      parseInt(startMinute)
    )
    const end = setMinutes(
      setHours(defaultDate, parseInt(endHour)),
      parseInt(endMinute)
    )

    // Garante que o fim é depois do início
    const finalEnd =
      end <= start ? new Date(start.getTime() + 60 * 60 * 1000) : end

    const event: Partial<CalendarEvent> = {
      title: title.trim(),
      type,
      start,
      end: finalEnd,
      color: '#ea580c', // Cor primária do projeto
      status: 'Pendente',
    }

    onCreate?.(event)
    handleClose()
  }

  const handleMoreDetails = () => {
    if (!title.trim()) return

    const start = setMinutes(
      setHours(defaultDate, parseInt(startHour)),
      parseInt(startMinute)
    )
    const end = setMinutes(
      setHours(defaultDate, parseInt(endHour)),
      parseInt(endMinute)
    )

    const finalEnd =
      end <= start ? new Date(start.getTime() + 60 * 60 * 1000) : end

    const event: Partial<CalendarEvent> = {
      title: title.trim(),
      type,
      start,
      end: finalEnd,
      color: '#ea580c',
      status: 'Pendente',
    }

    onMoreDetails?.(event)
    handleClose()
  }

  const handleClose = () => {
    setTitle('')
    setType('maintenance')
    onOpenChange(false)
  }

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup variant="compact">
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.HeaderIcon>
                <Calendar className="h-5 w-5" />
              </Dialog.HeaderIcon>
              <Dialog.Title>Novo Evento</Dialog.Title>
              <Dialog.CloseButton />
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.BodyContent>
                <div className="space-y-4">
                  {/* Título */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Manutenção Preventiva"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                    />
                  </div>

                  {/* Tipo */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={type}
                      onValueChange={(v) => setType(v as CalendarEvent['type'])}
                    >
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EVENT_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data */}
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
                      {format(defaultDate, "EEEE, d 'de' MMMM, yyyy", {
                        locale: ptBR,
                      })}
                    </div>
                  </div>

                  {/* Horário */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horário
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label
                          htmlFor="start-hour"
                          className="text-xs text-gray-600"
                        >
                          Início
                        </Label>
                        <div className="flex gap-1">
                          <Select
                            value={startHour}
                            onValueChange={setStartHour}
                          >
                            <SelectTrigger id="start-hour" className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {hours.map((h) => (
                                <SelectItem key={h} value={h}>
                                  {h}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={startMinute}
                            onValueChange={setStartMinute}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {minutes.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="end-hour"
                          className="text-xs text-gray-600"
                        >
                          Fim
                        </Label>
                        <div className="flex gap-1">
                          <Select value={endHour} onValueChange={setEndHour}>
                            <SelectTrigger id="end-hour" className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {hours.map((h) => (
                                <SelectItem key={h} value={h}>
                                  {h}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={endMinute}
                            onValueChange={setEndMinute}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {minutes.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.BodyContent>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              {onMoreDetails && (
                <Button variant="outline" onClick={handleMoreDetails}>
                  Mais Detalhes
                </Button>
              )}
              <Button onClick={handleCreate} disabled={!title.trim()}>
                Criar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
