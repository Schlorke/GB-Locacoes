'use client'

import { Button } from '@/components/ui/button'
import ModelViewer from '@/components/ui/model-viewer'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { memo, useEffect, useMemo, useState } from 'react'

export interface Equipment3DModel {
  id: string
  name: string
  modelUrl: string
  description?: string
}

interface Equipment3DCarouselProps {
  models: Equipment3DModel[]
  autoRotate?: boolean
  autoRotateInterval?: number
  className?: string
  height?: number | string
}

function Equipment3DCarouselComponent({
  models,
  autoRotate = true,
  autoRotateInterval = 6000,
  className,
  height = 500,
}: Equipment3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)

  // Auto-rotate functionality
  useEffect(() => {
    if (!isAutoRotating || models.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % models.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [isAutoRotating, autoRotateInterval, models.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % models.length)
    setIsAutoRotating(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length)
    setIsAutoRotating(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoRotating(false)
  }

  const currentModel = useMemo(() => {
    if (models.length === 0) return null
    return models[currentIndex]
  }, [models, currentIndex])

  if (!currentModel) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 rounded-2xl',
          className
        )}
        style={{ height }}
      >
        <p className="text-gray-500">Nenhum modelo 3D disponível</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative group bg-white/5 backdrop-blur-[80px] backdrop-saturate-150 rounded-2xl shadow-2xl overflow-hidden w-full',
        className
      )}
      style={{ height }}
      onMouseEnter={() => setIsAutoRotating(false)}
      onMouseLeave={() => setIsAutoRotating(autoRotate)}
    >
      {/* 3D Model Viewer */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ModelViewer
              url={currentModel.modelUrl}
              width="100%"
              height="100%"
              defaultZoom={3}
              minZoomDistance={0.5}
              maxZoomDistance={15}
              enableManualRotation={true}
              enableManualZoom={true}
              ambientIntensity={0.5}
              keyLightIntensity={1.5}
              fillLightIntensity={0.8}
              rimLightIntensity={1.0}
              environmentPreset="none"
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {models.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
            aria-label="Modelo anterior"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
            aria-label="Próximo modelo"
          >
            <ChevronRight className="h-6 w-6 text-gray-900" />
          </Button>
        </>
      )}

      {/* Model Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 z-10">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-end text-right"
        >
          <h3 className="text-2xl font-bold text-white mb-1">
            {currentModel.name}
          </h3>
          {currentModel.description && (
            <p className="text-white/80 text-sm">{currentModel.description}</p>
          )}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {models.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {models.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Ir para modelo ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar (for auto-rotate) */}
      {isAutoRotating && models.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-10">
          <motion.div
            className="h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoRotateInterval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  )
}

const Equipment3DCarousel = memo(Equipment3DCarouselComponent)

Equipment3DCarousel.displayName = 'Equipment3DCarousel'

export default Equipment3DCarousel
