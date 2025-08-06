'use client'

import { toast } from '@/hooks/use-toast'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Link,
  Upload,
} from 'lucide-react'
import Image from 'next/image'
import type * as React from 'react'
import { useState } from 'react'
import { Button } from './button'
import { CloseButton } from './close-button'
import { Input } from './input'
import { Label } from './label'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (_images: string[]) => void
  maxImages?: number
  currentImageIndex?: number
  onImageIndexChange?: (index: number) => void
  onImageZoom?: () => void
  nextImage?: () => void
  prevImage?: () => void
  goToImage?: (index: number) => void
}

interface SortableImageProps {
  id: string
  url: string
  index: number
  onRemove: () => void
  isPrincipal: boolean
  isDragActive: boolean
}

function DropIndicator() {
  return (
    <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center z-30 animate-pulse">
      <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg">
        Solte aqui para reordenar
      </div>
    </div>
  )
}

function SortableImage({
  id,
  url,
  index,
  onRemove,
  isPrincipal,
  isDragActive: _isDragActive,
}: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
    scale: isDragging ? '1.05' : '1',
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Main Container */}
      <div
        className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isDragging ? 'shadow-xl border-blue-500' : ''}`}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className={`absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-black/20 backdrop-blur-sm rounded p-1 ${isDragging ? 'opacity-100' : ''}`}
        >
          <GripVertical className="h-4 w-4 text-white" />
        </div>

        {/* Image Container */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={url || '/placeholder.svg'}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder.svg?height=120&width=200'
            }}
          />
        </div>

        {/* Principal Badge */}
        {isPrincipal && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
            Principal
          </div>
        )}

        {/* Order Number */}
        <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded-md font-medium z-10">
          #{index + 1}
        </div>

        {/* Drop Indicator - shown when dragging over this item */}
        {_isDragActive && isOver && !isDragging && <DropIndicator />}
      </div>

      {/* Remove Button - Outside the overflow-hidden container */}
      <CloseButton
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white hover:bg-red-600 z-20"
        onClick={onRemove}
        size="sm"
      />
    </div>
  )
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  currentImageIndex = 0,
  onImageIndexChange: _onImageIndexChange,
  onImageZoom,
  nextImage,
  prevImage,
  goToImage,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex(
        (_url, index) => `image-${index}` === active.id
      )
      const newIndex = images.findIndex(
        (_url, index) => `image-${index}` === over?.id
      )

      if (oldIndex !== -1 && newIndex !== -1) {
        onImagesChange(arrayMove(images, oldIndex, newIndex))
      }
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > maxImages) {
      toast({
        title: 'Limite excedido',
        description: `Máximo de ${maxImages} imagens permitidas`,
        variant: 'destructive',
      })
      return
    }

    setIsUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          uploadedUrls.push(data.url)
        } else {
          const error = await response.json()
          throw new Error(error.error || 'Erro no upload')
        }
      }

      onImagesChange([...images, ...uploadedUrls])
      toast({
        title: 'Upload concluído',
        description: `${uploadedUrls.length} imagem(ns) enviada(s) com sucesso`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Erro no upload',
        description:
          error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      // Reset input
      event.target.value = ''
    }
  }

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return

    if (images.length >= maxImages) {
      toast({
        title: 'Limite excedido',
        description: `Máximo de ${maxImages} imagens permitidas`,
        variant: 'destructive',
      })
      return
    }

    // Validação básica de URL
    try {
      new URL(urlInput)
      onImagesChange([...images, urlInput.trim()])
      setUrlInput('')
    } catch {
      toast({
        title: 'URL inválida',
        description: 'Por favor, insira uma URL válida',
        variant: 'destructive',
      })
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div
      className="space-y-4 rounded-xl p-6 border shadow-xl backdrop-blur-sm min-h-[200px] transition-all duration-300 hover:shadow-2xl"
      style={{
        backgroundColor: 'hsl(210, 40%, 98%)',
        borderColor: 'hsl(210, 20%, 90%)',
        borderWidth: '1.5px',
        boxShadow:
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      }}
    >
      {/* Carrossel de Imagens Atuais */}
      {images && images.length > 0 && (
        <div className="space-y-4 mb-6">
          {/* Header com indicador */}
          {images.length > 1 && (
            <div className="flex items-center justify-between mb-4 w-full">
              <h3 className="text-sm font-semibold text-slate-700">
                Preview do Equipamento
              </h3>
              <div className="text-xs text-slate-500 bg-white/70 px-2 py-1 rounded-full">
                {currentImageIndex + 1} de {images.length}
              </div>
            </div>
          )}

          {/* Imagem Principal */}
          <div className="relative bg-gray-50 rounded-lg overflow-hidden group border border-gray-200">
            <div className="aspect-[16/10] relative">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex] || '/placeholder.jpg'}
                  alt={`Equipamento - Imagem ${currentImageIndex + 1}`}
                  fill
                  className="object-cover cursor-pointer transition-all duration-500"
                  onClick={() => onImageZoom?.()}
                />
              </motion.div>

              {/* Navegação entre imagens */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (prevImage) {
                        prevImage()
                      } else if (currentImageIndex > 0) {
                        // Fallback interno caso a função não seja passada
                        const newIndex = currentImageIndex - 1
                        if (_onImageIndexChange) _onImageIndexChange(newIndex)
                      }
                    }}
                    title="Imagem anterior"
                    aria-label="Navegar para imagem anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/85 hover:scale-110 backdrop-blur-sm rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center z-10 focus:outline-none"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (nextImage) {
                        nextImage()
                      } else if (currentImageIndex < images.length - 1) {
                        // Fallback interno caso a função não seja passada
                        const newIndex = currentImageIndex + 1
                        if (_onImageIndexChange) _onImageIndexChange(newIndex)
                      }
                    }}
                    title="Próxima imagem"
                    aria-label="Navegar para próxima imagem"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/85 hover:scale-110 backdrop-blur-sm rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center z-10 focus:outline-none"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Indicadores */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_: string, index: number) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (goToImage) {
                          goToImage(index)
                        } else {
                          if (_onImageIndexChange) _onImageIndexChange(index)
                        }
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={`Ir para imagem ${index + 1}`}
                      aria-label={`Navegar para imagem ${index + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                        index === currentImageIndex
                          ? 'bg-white shadow-lg scale-125'
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            >
              {images.slice(0, 6).map((image: string, index: number) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (goToImage) {
                      goToImage(index)
                    } else {
                      if (_onImageIndexChange) _onImageIndexChange(index)
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Visualizar imagem ${index + 1}`}
                  aria-label={`Selecionar imagem ${index + 1}`}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                    index === currentImageIndex
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
              {images.length > 6 && (
                <div className="flex-shrink-0 w-16 h-12 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">
                    +{images.length - 6}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Upload de arquivos */}
      <div>
        <Label htmlFor="file-upload" className="block text-sm font-medium mb-2">
          Upload de Imagens
        </Label>
        <div className="flex items-start">
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading || images.length >= maxImages}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading || images.length >= maxImages}
            className="w-fit px-4 bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
          >
            <Upload className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
            <span className="group-hover:text-orange-500 transition-colors duration-200">
              {isUploading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Escolher Arquivos'
              )}
            </span>
          </Button>
        </div>
        <p
          className="text-xs text-muted-foreground mt-3"
          style={{ lineHeight: '0.5rem' }}
        >
          JPG, PNG ou WebP. Máximo 5MB por arquivo.
        </p>
      </div>

      {/* URL de imagem */}
      <div>
        <Label htmlFor="url-input" className="block text-sm font-medium mb-2">
          Ou adicionar por URL
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleUrlAdd}
            disabled={!urlInput.trim() || images.length >= maxImages}
            className="w-fit px-4 bg-transparent border-gray-200  hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
          >
            <Link className="h-4 w-4 mr-2 group-hover:text-orange-500 transition-colors duration-200" />
            <span className="group-hover:text-orange-500 transition-colors duration-200">
              Adicionar
            </span>
          </Button>
          <Input
            id="url-input"
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={images.length >= maxImages}
            className="flex-1  border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Preview das imagens com drag and drop */}
      {images.length > 0 && (
        <div className="space-y-2">
          <Label className="block text-sm font-medium">
            Imagens ({images.length}/{maxImages})
          </Label>
          <p className="text-xs text-muted-foreground">
            Arraste as imagens para reordenar. A primeira imagem será a
            principal.
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((_, index) => `image-${index}`)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((url, index) => (
                  <SortableImage
                    key={`image-${index}`}
                    id={`image-${index}`}
                    url={url}
                    index={index}
                    onRemove={() => removeImage(index)}
                    isPrincipal={index === 0}
                    isDragActive={activeId !== null}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  )
}
