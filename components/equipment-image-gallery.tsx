'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface EquipmentImageGalleryProps {
  images: string[]
  altText: string
  className?: string
}

export function EquipmentImageGallery({
  images,
  altText,
  className,
}: EquipmentImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  // Garantir que sempre temos pelo menos uma imagem placeholder
  const displayImages =
    images && images.length > 0
      ? images
      : ['/placeholder.svg?height=600&width=800&text=Equipamento']

  const currentImage = displayImages[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Imagem Principal */}
      <Card className="relative overflow-hidden group shadow-2xl border-0 hover:shadow-3xl transition-all duration-500">
        {/* Depth layers para profundidade moderna */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-gray-50/30"></div>

        <CardContent className="relative z-10 p-0">
          <div
            className="relative aspect-[4/3] w-full bg-gradient-to-br from-gray-50 to-gray-100 cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={currentImage || '/placeholder.svg'}
              alt={altText}
              fill
              className={cn(
                'object-contain transition-all duration-500 ease-out',
                isZoomed && 'scale-150'
              )}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : undefined
              }
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />

            {/* Indicador de Zoom */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-medium shadow-lg">
                <ZoomIn className="h-3.5 w-3.5" />
                Zoom para ampliar
              </div>
            </div>

            {/* Navegação entre imagens */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white/90"
                  onClick={prevImage}
                  aria-label="Imagem anterior"
                  title="Imagem anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white/90"
                  onClick={nextImage}
                  aria-label="Próxima imagem"
                  title="Próxima imagem"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Indicadores de posição */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      index === currentImageIndex
                        ? 'bg-orange-600 w-6'
                        : 'bg-white/60 hover:bg-white/80'
                    )}
                    onClick={() => goToImage(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                    title={`Imagem ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Miniaturas */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.slice(0, 8).map((image, index) => (
            <button
              key={index}
              className={cn(
                'relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-orange-300',
                index === currentImageIndex
                  ? 'border-orange-600 ring-2 ring-orange-200'
                  : 'border-gray-200'
              )}
              onClick={() => goToImage(index)}
              aria-label={`Selecionar imagem ${index + 1}`}
              title={`Visualizar imagem ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${altText} - imagem ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}

          {/* Indicador de mais imagens */}
          {displayImages.length > 8 && (
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                +{displayImages.length - 8}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
