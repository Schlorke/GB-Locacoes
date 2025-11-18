'use client'

import * as LucideIcons from 'lucide-react'
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Info,
  Package,
  Tag,
  X,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { HybridTooltip } from '@/components/ui/HybridTooltip'

/**
 * DIALOG DE VISUALIZAÇÃO DE EQUIPAMENTO
 *
 * Componente para visualizar detalhes completos de um equipamento.
 * Inclui carrossel de imagens, informações detalhadas e navegação para edição.
 */

export interface Equipment {
  id: string
  name: string
  description?: string
  pricePerDay: number
  isAvailable: boolean
  category?: {
    id: string
    name: string
    bgColor?: string
    fontColor?: string
    icon?: keyof typeof LucideIcons
    iconColor?: string
  }
  images: string[]
  createdAt: string
}

export interface ViewEquipmentDialogProps {
  equipment: Equipment | null
  isOpen: boolean
  onClose: () => void
  onEdit: (_equipment: Equipment) => void
}

/**
 * Renderiza ícone de categoria
 */
function renderIcon(iconName?: keyof typeof LucideIcons, color?: string) {
  if (!iconName || !LucideIcons[iconName]) return null

  const IconComponent = LucideIcons[iconName] as React.ComponentType<{
    size?: number
    color?: string
    className?: string
  }>
  return (
    <IconComponent
      size={12}
      color={color || '#3b82f6'}
      className="flex-shrink-0"
    />
  )
}

/**
 * Formata preço em formato brasileiro
 */
function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

/**
 * Formata data em formato brasileiro
 */
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

export function ViewEquipmentDialog({
  equipment,
  isOpen,
  onClose,
  onEdit,
}: ViewEquipmentDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  // Funções do carrossel
  const nextImage = useCallback(() => {
    if (equipment?.images && equipment.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === equipment.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [equipment?.images])

  const prevImage = useCallback(() => {
    if (equipment?.images && equipment.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? equipment.images.length - 1 : prev - 1
      )
    }
  }, [equipment?.images])

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  // Reset do carrossel quando equipamento muda
  useEffect(() => {
    if (equipment) {
      setCurrentImageIndex(0)
      setIsImageZoomed(false)
    }
  }, [equipment])

  // Navegação por teclado no carrossel
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!equipment?.images || equipment.images.length <= 1) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevImage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextImage()
      } else if (e.key === 'Escape') {
        setIsImageZoomed(false)
      }
    }

    if (isOpen && equipment) {
      document.addEventListener('keydown', handleKeyPress)
      return () => document.removeEventListener('keydown', handleKeyPress)
    }

    return undefined
  }, [isOpen, equipment, nextImage, prevImage])

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup variant="default">
          <Dialog.Content>
            <Dialog.Header data-dialog-section="header">
              <Dialog.HeaderIcon>
                <Eye className="h-4 w-4" />
              </Dialog.HeaderIcon>
              <Dialog.Title className="text-xl font-semibold text-gray-800">
                Visualizar Equipamento
              </Dialog.Title>
              <Dialog.CloseButton aria-label="Fechar dialog" />
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.BodyViewport style={{ scrollbarGutter: 'stable' }}>
                <Dialog.BodyContent>
                  {equipment && (
                    <>
                      {/* Preview do Equipamento com Carrossel */}
                      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-3 xs:rounded-md">
                        <div className="flex items-center justify-between mb-4 w-full">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-700">
                              Preview do Equipamento
                            </h3>
                            <HybridTooltip
                              content={
                                <div className="max-w-xs leading-relaxed">
                                  <span className="inline-flex items-start gap-1">
                                    <span>💡</span>
                                    <span>
                                      <strong className="font-semibold">
                                        Background Padrão:
                                      </strong>{' '}
                                      Quando nenhuma imagem estiver configurada,
                                      o fundo laranja atual será exibido
                                      automaticamente.
                                    </span>
                                  </span>
                                </div>
                              }
                            >
                              <Info
                                className="size-5 !text-gray-700 cursor-help transition-colors hover:!text-orange-600"
                                aria-hidden="true"
                              />
                            </HybridTooltip>
                          </div>
                          {equipment.images && equipment.images.length > 1 && (
                            <div className="text-xs text-slate-500 bg-white/70 px-2 py-1 rounded-full">
                              {currentImageIndex + 1} de{' '}
                              {equipment.images.length}
                            </div>
                          )}
                        </div>

                        {equipment.images && equipment.images.length > 0 ? (
                          <div className="relative group">
                            <div
                              className={`w-full h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 ${
                                isImageZoomed ? 'transform scale-105' : ''
                              }`}
                              onClick={() => setIsImageZoomed(!isImageZoomed)}
                            >
                              <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="w-full h-full"
                              >
                                <Image
                                  src={
                                    equipment.images[currentImageIndex] || ''
                                  }
                                  alt={`${equipment.name} - Imagem ${currentImageIndex + 1}`}
                                  width={500}
                                  height={300}
                                  className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                                    isImageZoomed
                                      ? 'object-contain bg-black/90'
                                      : ''
                                  }`}
                                />
                              </motion.div>

                              {equipment.images.length > 1 && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      prevImage()
                                    }}
                                    aria-label="Imagem anterior"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/85 hover:scale-110 backdrop-blur-sm rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center z-10"
                                  >
                                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      nextImage()
                                    }}
                                    aria-label="Próxima imagem"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/85 hover:scale-110 backdrop-blur-sm rounded-full p-2.5 shadow-md opacity-0 group-hover:opacity-80 transition-all duration-300 flex items-center justify-center z-10"
                                  >
                                    <ChevronRight className="w-5 h-5 text-gray-700" />
                                  </button>
                                </>
                              )}

                              {equipment.images.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                  {equipment.images.map((_, index) => (
                                    <motion.button
                                      key={index}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        goToImage(index)
                                      }}
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label={`Ir para imagem ${index + 1}`}
                                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex
                                          ? 'bg-white shadow-lg scale-125'
                                          : 'bg-white/60 hover:bg-white/80'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {equipment.images.length > 1 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                              >
                                {equipment.images.map((image, index) => (
                                  <motion.button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`Selecionar imagem ${index + 1}`}
                                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                      index === currentImageIndex
                                        ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                  >
                                    <Image
                                      src={image}
                                      alt={`Thumbnail ${index + 1}`}
                                      width={64}
                                      height={48}
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-64 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Package className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">
                                Sem imagens disponíveis
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="text-center">
                          <h4 className="text-lg font-semibold text-slate-800 mb-2">
                            {equipment.name}
                          </h4>
                          <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                            {equipment.description || 'Sem descrição'}
                          </p>
                        </div>
                      </div>

                      {/* Informações Detalhadas */}
                      <div className="space-y-4 w-full max-w-full">
                        <div
                          className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm relative"
                          style={{
                            borderLeft: `4px solid ${equipment.category?.bgColor || '#3b82f6'}`,
                          }}
                        >
                          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Informações do Equipamento
                          </h3>
                          <div className="grid grid-cols-2 gap-4 max-w-full">
                            <div className="space-y-4 min-w-0 max-w-full">
                              <div className="flex items-start gap-3">
                                <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Nome
                                  </div>
                                  <div className="font-medium text-sm">
                                    {equipment.name}
                                  </div>
                                </div>
                              </div>

                              {equipment.description && (
                                <div className="flex items-start gap-3">
                                  <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1 min-w-0 max-w-full">
                                    <div className="text-xs text-gray-500">
                                      Descrição
                                    </div>
                                    <div
                                      className="font-medium text-sm break-words hyphens-auto leading-relaxed"
                                      title={equipment.description}
                                      style={{
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        hyphens: 'auto',
                                      }}
                                    >
                                      {equipment.description}
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Criado em
                                  </div>
                                  <div className="font-medium text-sm">
                                    {formatDate(equipment.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4 min-w-0 max-w-full">
                              {equipment.category && (
                                <div className="flex items-start gap-3">
                                  <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
                                  <div>
                                    <div className="text-xs text-gray-500">
                                      Categoria
                                    </div>
                                    <Badge
                                      style={{
                                        backgroundColor:
                                          equipment.category.bgColor ||
                                          '#f0f9ff',
                                        color:
                                          equipment.category.fontColor ||
                                          '#0c4a6e',
                                      }}
                                      className="text-xs inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-full border-0"
                                    >
                                      {equipment.category.icon &&
                                        renderIcon(
                                          equipment.category.icon,
                                          equipment.category.iconColor
                                        )}
                                      {equipment.category.name}
                                    </Badge>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-start gap-3">
                                <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Preço por dia
                                  </div>
                                  <div className="font-medium text-sm text-green-600">
                                    {formatPrice(equipment.pricePerDay)}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                {equipment.isAvailable ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                                )}
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Status
                                  </div>
                                  <div
                                    className={`font-medium text-sm ${equipment.isAvailable ? 'text-green-600' : 'text-red-600'}`}
                                  >
                                    {equipment.isAvailable
                                      ? 'Disponível'
                                      : 'Indisponível'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.BodyContent>
              </Dialog.BodyViewport>
            </Dialog.Body>

            <Dialog.Footer data-dialog-section="footer">
              <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-10 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    if (equipment) {
                      onClose()
                      onEdit(equipment)
                    }
                  }}
                  className="flex-1 h-10 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <Edit className="w-4 h-4 mr-2 transition-colors duration-200" />
                  Editar Equipamento
                </Button>
              </div>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
