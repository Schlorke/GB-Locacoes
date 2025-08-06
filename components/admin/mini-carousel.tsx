'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface MiniCarouselProps {
  images: string[]
  height?: number
  className?: string
}

export function MiniCarousel({
  images,
  height = 200,
  className = '',
}: MiniCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <span className="text-gray-400 text-sm">Nenhuma imagem</span>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    >
      <Image
        src={images[currentIndex]}
        alt={`Preview ${currentIndex + 1}`}
        fill
        className="object-cover"
        onError={() => {
          // Remove imagem com erro da lista
          const newImages = images.filter((_, index) => index !== currentIndex)
          if (newImages.length === 0) return
          if (currentIndex >= newImages.length) {
            setCurrentIndex(newImages.length - 1)
          }
        }}
      />

      {/* Navegação */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-700 rounded-full h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-700 rounded-full h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Indicadores */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Contador */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  )
}
