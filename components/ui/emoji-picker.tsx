'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Search, Smile } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmojiPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (_emoji: string) => void
  currentEmoji?: string
}

const EMOJI_CATEGORIES = {
  recent: ['🏗️', '🔨', '⚡', '🏢', '🚧', '🔧', '⚙️', '🛠️'],
  construction: [
    '🏗️',
    '🔨',
    '🔧',
    '⚙️',
    '🛠️',
    '🚧',
    '🏢',
    '🏭',
    '🏘️',
    '🏠',
    '🏡',
    '🏰',
    '🗼',
    '🌉',
    '⛽',
    '🚜',
    '🚛',
    '🚚',
    '🏗️',
    '🔩',
    '⚡',
    '🔌',
    '💡',
    '🧱',
  ],
  tools: [
    '🔨',
    '🔧',
    '🪚',
    '🔩',
    '⚙️',
    '🛠️',
    '⚒️',
    '🪓',
    '⛏️',
    '🪝',
    '🔗',
    '⛓️',
    '📏',
    '📐',
    '🧰',
    '🔬',
  ],
  vehicles: [
    '🚜',
    '🚛',
    '🚚',
    '🚐',
    '🚙',
    '🚗',
    '🏍️',
    '🚲',
    '🛴',
    '🛵',
    '🚁',
    '✈️',
    '🚀',
    '⛵',
    '🚤',
    '🛥️',
  ],
  symbols: [
    '⚡',
    '🔥',
    '💧',
    '🌪️',
    '❄️',
    '☀️',
    '🌙',
    '⭐',
    '💎',
    '🔮',
    '🎯',
    '🎪',
    '🎨',
    '🎭',
    '🎪',
    '🎡',
  ],
}

const CATEGORY_LABELS = {
  recent: 'Recentes',
  construction: 'Construção',
  tools: 'Ferramentas',
  vehicles: 'Veículos',
  symbols: 'Símbolos',
}

export function EmojiPicker({
  isOpen,
  onClose,
  onSelect,
  currentEmoji,
}: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('recent')

  const filteredEmojis = searchTerm
    ? Object.values(EMOJI_CATEGORIES)
        .flat()
        .filter((emoji) => emoji.includes(searchTerm.toLowerCase()))
    : EMOJI_CATEGORIES[selectedCategory as keyof typeof EMOJI_CATEGORIES]

  const handleEmojiSelect = (emoji: string) => {
    onSelect(emoji)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md"
        aria-labelledby="emoji-picker-title"
        aria-describedby="emoji-picker-desc"
      >
        <DialogHeader>
          <DialogTitle
            id="emoji-picker-title"
            className="flex items-center gap-2"
          >
            <Smile className="h-5 w-5" />
            Selecionar Emoji
          </DialogTitle>
          <DialogDescription id="emoji-picker-desc">
            Escolha um emoji para a categoria.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar emoji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categorias */}
          {!searchTerm && (
            <div className="grid w-full grid-cols-5 gap-2">
              {Object.keys(EMOJI_CATEGORIES).map((category) => {
                const isActive = category === selectedCategory

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'rounded-md px-2 py-2 text-xs font-semibold transition-colors duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                        : 'bg-white text-slate-500 hover:text-orange-600 hover:shadow-sm'
                    )}
                  >
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                  </button>
                )
              })}
            </div>
          )}

          {/* Grid de Emojis */}
          <div className="grid grid-cols-6 gap-2 max-h-[300px] overflow-hidden">
            {filteredEmojis.map((emoji, index) => (
              <Button
                key={`${emoji}-${index}`}
                variant={currentEmoji === emoji ? 'default' : 'ghost'}
                size="sm"
                className="h-10 w-10 text-lg hover:bg-gray-100"
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>

          {filteredEmojis.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Smile className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum emoji encontrado</p>
            </div>
          )}

          {/* Ações */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {currentEmoji && (
              <Button variant="ghost" onClick={() => handleEmojiSelect('')}>
                Remover
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
