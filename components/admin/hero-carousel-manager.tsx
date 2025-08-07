'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { HeroCarouselItem } from '@/schemas/settings.schema'
import { motion } from 'framer-motion'
import { GripVertical, Plus, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface HeroCarouselManagerProps {
  items: HeroCarouselItem[]
  onChange: (items: HeroCarouselItem[]) => void
}

export function HeroCarouselManager({
  items,
  onChange,
}: HeroCarouselManagerProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const addItem = () => {
    const newItem: HeroCarouselItem = {
      id: crypto.randomUUID(),
      imageUrl: '',
      title: '',
      description: '',
      link: '',
      order: items.length,
    }
    onChange([...items, newItem])
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onChange(newItems)
  }

  const updateItem = (index: number, updates: Partial<HeroCarouselItem>) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    )
    onChange(newItems)
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items]
    const [movedItem] = newItems.splice(fromIndex, 1)
    if (movedItem) {
      newItems.splice(toIndex, 0, movedItem)
      onChange(newItems)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      moveItem(draggedIndex, index)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Carousel do Hero
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie as imagens e conteúdo do carousel principal
          </p>
        </div>
        <Button type="button" onClick={addItem} className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Item
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Nenhum item no carousel
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Adicione imagens para criar o carousel principal do site
            </p>
            <Button onClick={addItem} className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Primeiro Item
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`border transition-all duration-200 ${
                  draggedIndex === index
                    ? 'opacity-50 scale-95'
                    : 'hover:shadow-md'
                }`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="cursor-move text-gray-400 hover:text-gray-600">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      Item do Carousel
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Coluna da Imagem */}
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor={`image-${index}`}
                          className="text-sm font-medium"
                        >
                          URL da Imagem *
                        </Label>
                        <Input
                          id={`image-${index}`}
                          value={item.imageUrl || ''}
                          onChange={(e) =>
                            updateItem(index, { imageUrl: e.target.value })
                          }
                          placeholder="https://exemplo.com/imagem.jpg"
                          className="mt-1"
                        />
                      </div>

                      {/* Preview da Imagem */}
                      {item.imageUrl && (
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                          <Image
                            src={item.imageUrl}
                            alt={item.title || `Imagem ${index + 1}`}
                            fill
                            className="object-cover"
                            onError={() => updateItem(index, { imageUrl: '' })}
                          />
                        </div>
                      )}
                    </div>

                    {/* Coluna do Conteúdo */}
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor={`title-${index}`}
                          className="text-sm font-medium"
                        >
                          Título
                        </Label>
                        <Input
                          id={`title-${index}`}
                          value={item.title || ''}
                          onChange={(e) =>
                            updateItem(index, { title: e.target.value })
                          }
                          placeholder="Título do slide"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor={`description-${index}`}
                          className="text-sm font-medium"
                        >
                          Descrição
                        </Label>
                        <Textarea
                          id={`description-${index}`}
                          value={item.description || ''}
                          onChange={(e) =>
                            updateItem(index, { description: e.target.value })
                          }
                          placeholder="Descrição ou chamada para ação"
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor={`link-${index}`}
                          className="text-sm font-medium"
                        >
                          Link de Destino
                        </Label>
                        <Input
                          id={`link-${index}`}
                          value={item.link || ''}
                          onChange={(e) =>
                            updateItem(index, { link: e.target.value })
                          }
                          placeholder="/catalogo ou https://exemplo.com"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
