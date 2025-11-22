'use client'

import { Button } from '@/components/ui/button'
import { Autocomplete } from '@/components/ui/autocomplete'
import {
  usePublicSettings,
  type PublicSettings,
} from '@/hooks/use-public-settings'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Play,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useMemo, useState } from 'react'
import ScrollRevealInit from '@/components/scroll-reveal-init'

// ============================================
// EQUIPMENT 3D CAROUSEL - CÓDIGO REPLICADO
// ============================================
// Este código foi copiado de @/components/equipment-3d-carousel.tsx
// para permitir edições isoladas no playground sem afetar o componente original

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
        'relative group rounded-2xl overflow-hidden w-full',
        className
      )}
      style={{
        height,
        // CRÍTICO: backgroundColor semi-transparente é necessário para backdrop-filter funcionar
        // No Chrome/Edge, precisa ser mais transparente para o backdrop-filter funcionar
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        background: `
          radial-gradient(circle at 20% 50%, rgba(128, 128, 128, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(128, 128, 128, 0.06) 0%, transparent 50%),
          linear-gradient(135deg, rgba(128, 128, 128, 0.04) 0%, rgba(128, 128, 128, 0.02) 100%)
        `,
        // backdrop-filter precisa estar após backgroundColor para funcionar corretamente
        // IMPORTANTE: No Chrome/Edge, o backdrop-filter só funciona se houver conteúdo atrás
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        // Remover isolation para permitir que backdrop-filter veja o que está atrás
        border: '1px solid rgba(128, 128, 128, 0.15)',
        boxShadow: `
          inset 0 1px 0 0 rgba(128, 128, 128, 0.2),
          inset 0 -1px 0 0 rgba(128, 128, 128, 0.1),
          0 8px 32px 0 rgba(0, 0, 0, 0.1)
        `,
      }}
      onMouseEnter={() => setIsAutoRotating(false)}
      onMouseLeave={() => setIsAutoRotating(autoRotate)}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 45%), rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 35%, transparent 65%)',
        }}
      />
      {/* Noise Texture Layer - Glassmorphism effects */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.3,
          mixBlendMode: 'overlay',
        }}
      >
        {/* Noise Texture SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            filter: 'contrast(1.5) brightness(1.2)',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="noiseFilter" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix in="noise" type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
              </feComponentTransfer>
            </filter>
            <filter id="noiseFilter2" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.3"
                numOctaves="3"
                stitchTiles="stitch"
                result="noise2"
              />
              <feColorMatrix in="noise2" type="saturate" values="0" />
            </filter>
            <filter id="noiseFilter3" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="2.5"
                numOctaves="2"
                stitchTiles="stitch"
                result="noise3"
              />
              <feColorMatrix in="noise3" type="saturate" values="0" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter="url(#noiseFilter)"
            opacity="0.6"
          />
          <rect
            width="100%"
            height="100%"
            filter="url(#noiseFilter2)"
            opacity="0.4"
            style={{ mixBlendMode: 'multiply' }}
          />
          <rect
            width="100%"
            height="100%"
            filter="url(#noiseFilter3)"
            opacity="0.3"
            style={{ mixBlendMode: 'screen' }}
          />
        </svg>
        {/* Additional granular texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.03) 0px,
                transparent 0.5px,
                transparent 1px,
                rgba(0, 0, 0, 0.03) 1.5px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.03) 0px,
                transparent 0.5px,
                transparent 1px,
                rgba(0, 0, 0, 0.03) 1.5px
              ),
              repeating-linear-gradient(
                45deg,
                rgba(128, 128, 128, 0.02) 0px,
                transparent 0.5px,
                transparent 1px,
                rgba(128, 128, 128, 0.02) 1.5px
              )
            `,
            mixBlendMode: 'overlay',
            backgroundSize: '1.5px 1.5px, 1.5px 1.5px, 2px 2px',
          }}
        />
        {/* Condensation effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 35%, rgba(128, 128, 128, 0.2) 0%, transparent 35%),
              radial-gradient(circle at 75% 55%, rgba(128, 128, 128, 0.15) 0%, transparent 30%),
              radial-gradient(circle at 50% 75%, rgba(128, 128, 128, 0.12) 0%, transparent 25%)
            `,
          mixBlendMode: 'soft-light',
        }}
      />
      </div>

      <div className="relative z-10 h-full">
        {/* Navigation Buttons */}
        {models.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
              onClick={goToPrevious}
              aria-label="Modelo anterior"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
              onClick={goToNext}
              aria-label="Próximo modelo"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </Button>
          </>
        )}

        {/* Model Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 z-20">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-end text-right"
          >
            <h3 className="text-2xl font-bold text-yellow-500 mb-1">
              {currentModel.name}
            </h3>
            {currentModel.description && (
              <p className="text-white/80 text-sm">{currentModel.description}</p>
            )}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        {models.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
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
    </div>
  )
}

const Equipment3DCarousel = memo(Equipment3DCarouselComponent)

Equipment3DCarousel.displayName = 'Equipment3DCarousel'

// ============================================
// FIM DO EQUIPMENT 3D CAROUSEL
// ============================================

const HERO_EQUIPMENT_MODELS: Equipment3DModel[] = [
  {
    id: 'compressor',
    name: 'Compressor de Ar',
    modelUrl: '/models/Compressor.glb',
    description: 'Compressores de alta pressão para obras',
  },
  {
    id: 'betoneira',
    name: 'Betoneira',
    modelUrl: '/models/Betoneira.glb',
    description: 'Betoneiras para preparo de concreto',
  },
  {
    id: 'andaime',
    name: 'Andaime',
    modelUrl: '/models/Andaime.glb',
    description: 'Andaimes para trabalhos em altura',
  },
]

type HeroProps = {
  initialSettings?: Partial<PublicSettings> | null
}

function Hero({ initialSettings }: HeroProps = {}) {
  const router = useRouter()
  const { settings, isLoading } = usePublicSettings({
    initialData: initialSettings ?? undefined,
  })
  const [isScrollRevealReady, setIsScrollRevealReady] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const containerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

  // Aguardar scroll-reveal-init estar pronto antes de iniciar animações do flash
  useEffect(() => {
    const handleScrollRevealReady = () => {
      setIsScrollRevealReady(true)
    }

    window.addEventListener('scrollRevealReady', handleScrollRevealReady)

    return () => {
      window.removeEventListener('scrollRevealReady', handleScrollRevealReady)
    }
  }, [])

  // Extrair imagens do carousel
  const carouselImages = useMemo(() => {
    const heroCarousel = settings?.heroCarousel

    if (!Array.isArray(heroCarousel)) {
      return []
    }

    return heroCarousel
      .map((item) => item?.imageUrl)
      .filter((image): image is string => Boolean(image))
  }, [settings?.heroCarousel])
  const hasImages = carouselImages.length > 0
  const showHeroDots = hasImages && carouselImages.length > 1
  const waveAnimation =
    (settings.waveAnimation as 'none' | 'static' | 'animated' | undefined) ||
    'animated'

  const initialHeroCarousel = Array.isArray(initialSettings?.heroCarousel)
    ? initialSettings?.heroCarousel
    : undefined
  const hasInitialImages =
    Array.isArray(initialHeroCarousel) && initialHeroCarousel.length > 0
  const shouldShowWhite = hasImages
  const loadingShouldShowWhite = hasImages || hasInitialImages

  const handleEquipmentSelect = (equipment: { id: string; name: string }) => {
    // Sempre que onSelect for chamado (seja por seleção ou clique na lupa com item selecionado)
    // redireciona para a página de detalhes do equipamento
    if (equipment.id) {
      router.push(`/equipamentos/${equipment.id}`)
    }
  }

  const handleSearch = (query: string) => {
    // Chamado apenas quando não há equipamento selecionado
    // Redireciona para a página de equipamentos com a busca por texto
    router.push(`/equipamentos?search=${encodeURIComponent(query)}`)
  }

  const paddingBottomClasses =
    waveAnimation !== 'none'
      ? 'pb-12 md:pb-16 lg:pb-20'
      : 'pb-12 md:pb-16 lg:pb-20'

  const overlayOffsetClasses =
    waveAnimation !== 'none'
      ? 'bottom-12 md:bottom-16 lg:bottom-20'
      : 'bottom-0'

  useEffect(() => {
    if (!showHeroDots) return

    const interval = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [showHeroDots, carouselImages.length])

  useEffect(() => {
    if (!hasImages && currentImage !== 0) {
      setCurrentImage(0)
      return
    }

    if (hasImages && currentImage >= carouselImages.length) {
      setCurrentImage(0)
    }
  }, [hasImages, carouselImages.length, currentImage])

  // Durante loading, usa background previsto a partir de dados iniciais
  if (isLoading) {
    return (
      <section
        className={cn(
          'relative text-white overflow-hidden bg-slate-50',
          // padding-bottom para compensar altura da onda
          paddingBottomClasses
        )}
      >
        {!loadingShouldShowWhite && (
          <div
            className={cn(
              'absolute inset-x-0 top-0 pointer-events-none bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800',
              overlayOffsetClasses
            )}
          />
        )}

        {/* Loading silencioso - aguarda settings carregarem */}
      </section>
    )
  }

  return (
    <section
      className={cn(
        'relative text-white overflow-hidden bg-slate-50',
        paddingBottomClasses
      )}
      role="region"
      aria-roledescription={hasImages ? 'carousel' : undefined}
    >
      <HeroBackgroundCarousel
        images={carouselImages}
        overlayOffsetClasses={overlayOffsetClasses}
        shouldShowWhite={shouldShowWhite}
        isScrollRevealReady={isScrollRevealReady}
        currentImage={currentImage}
      />

      <div className={cn(containerClasses, 'relative z-10 w-full py-14')}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0">
              Locação de Equipamentos para{' '}
              <span className="text-yellow-300 relative">
                Construção Civil
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300 rounded-full transform scale-x-0 animate-scale-x"></div>
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl leading-relaxed opacity-0">
              {settings.aboutUsText ||
                'Há 10 anos oferecendo soluções em locação de equipamentos para obras e serviços em altura. Segurança, qualidade e manutenção constante.'}
            </p>
            <div className="hero-search bg-white rounded-2xl p-2 max-w-md border border-white/20 transition-all duration-300 relative z-[9998] opacity-0">
              <Autocomplete
                placeholder="Buscar equipamentos (ex: andaime, betoneira)"
                onSelect={handleEquipmentSelect}
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 opacity-0">
              <Link
                href="/equipamentos"
                className="inline-flex items-center justify-center hover:bg-yellow-600 gap-2 px-6 h-12 bg-yellow-500 hover:text-white text-gray-900 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group text-sm"
              >
                Ver Catálogo de Equipamentos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/orcamento"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-white text-sm"
              >
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Solicitar Orçamento
              </Link>
            </div>
            <div className="hero-contact flex flex-col sm:flex-row gap-4 pt-4 text-orange-100 opacity-0">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <Phone className="h-5 w-5 group-hover:animate-bounce" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="sm:hidden">
                    <a
                      href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                      className="hover:underline"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                  <div className="hidden sm:flex sm:items-center sm:gap-2">
                    <a
                      href={`tel:+55${settings.companyPhone.replace(/\D/g, '')}`}
                      className="hover:underline"
                    >
                      {settings.companyPhone}
                    </a>
                    <span>|</span>
                    <a
                      href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                      className="hover:underline"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <MapPin className="h-5 w-5 group-hover:animate-pulse" />
                <span>Entregamos em toda região</span>
              </div>
            </div>
          </div>
          <div className="hero-image relative opacity-0 px-4">
            <div className="relative group bg-transparent w-full">
              <div
                className="relative w-full h-[320px] sm:h-[360px] md:h-[544px] lg:h-[544px]"
                style={{
                  // Garantir que o backdrop-filter possa ver o background atrás
                  zIndex: 10,
                }}
              >
                <Equipment3DCarousel
                  models={HERO_EQUIPMENT_MODELS}
                  autoRotate={true}
                  autoRotateInterval={6000}
                  className="transform group-hover:scale-105 transition-transform duration-500"
                  height="100%"
                />
                <div className="hidden sm:block absolute -bottom-2 -left-2 bg-yellow-500 text-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer z-20">
                  <div className="text-2xl font-bold animate-count-up">
                    +200
                  </div>
                  <div className="text-sm font-medium">
                    Equipamentos Disponíveis
                  </div>
                </div>
                <div className="hidden sm:block absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm text-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer z-20">
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm font-medium">Anos de Experiência</div>
                </div>
                <div className="absolute inset-[-1rem] border-2 border-white/20 rounded-2xl animate-pulse pointer-events-none transform group-hover:scale-105 transition-transform duration-600"></div>
              </div>
            </div>
          </div>
        </div>
        {showHeroDots && (
          <div className="absolute bottom-0 -translate-x-1/2 left-1/2 z-10">
            <div className="flex justify-center space-x-3">
              {carouselImages.map((_, index) => (
                <motion.button
                  key={`hero-carousel-dot-${index}`}
                  className={cn(
                    'h-3 w-3 rounded-full transition-all duration-500',
                    currentImage === index
                      ? 'scale-125 bg-orange-500 shadow-lg'
                      : 'bg-white/60 hover:bg-white/80'
                  )}
                  onClick={() => setCurrentImage(index)}
                  aria-label={`Ir para imagem ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {waveAnimation !== 'none' && (
        <div className="pointer-events-none relative z-10 pt-3">
          <svg
            className="hero-wave relative block md:h-20 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            {waveAnimation === 'animated' ? (
              <>
                <motion.path
                  d="M0,120V73.71c47.79,-22.2,103.59,-32.17,158,-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
                  opacity="0.3"
                  fill="rgb(249, 250, 251)"
                  animate={{
                    d: [
                      'M0,120V73.71c47.79,-22.2,103.59,-32.17,158,-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z',
                      'M0,120V63.71c47.79,-15.2,103.59,-25.17,158,-21,70.36,5.37,136.33,23.31,206.8,27.5C438.64,77.57,512.34,56.33,583,37.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,85,1113,124.29,1200,57.53V120Z',
                      'M0,120V73.71c47.79,-22.2,103.59,-32.17,158,-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                <motion.path
                  d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
                  opacity="0.6"
                  fill="rgb(249, 250, 251)"
                  animate={{
                    d: [
                      'M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z',
                      'M0,120V94.19C13,73.08,27.64,53.14,47.69,37.95,99.41,-1.27,165,-1,224.58,18.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z',
                      'M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z',
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 1,
                  }}
                />
                <motion.path
                  d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
                  fill="rgb(249, 250, 251)"
                  animate={{
                    d: [
                      'M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z',
                      'M0,120V104.37C149.93,51,314.09,38.68,475.83,67.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,32.78,886,14.76,951.2,20c86.53,7,172.46,45.71,248.8,84.81V120Z',
                      'M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z',
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 2,
                  }}
                />
              </>
            ) : (
              <>
                <path
                  d="M0,120V73.71c47.79,-22.2,103.59,-32.17,158,-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
                  opacity="0.3"
                  fill="rgb(249, 250, 251)"
                />
                <path
                  d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
                  opacity="0.6"
                  fill="rgb(249, 250, 251)"
                />
                <path
                  d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
                  fill="rgb(249, 250, 251)"
                />
              </>
            )}
          </svg>
        </div>
      )}
    </section>
  )
}

type HeroBackgroundCarouselProps = {
  images: string[]
  overlayOffsetClasses: string
  shouldShowWhite: boolean
  isScrollRevealReady: boolean
  currentImage: number
}

function HeroBackgroundCarousel({
  images,
  overlayOffsetClasses,
  shouldShowWhite,
  isScrollRevealReady,
  currentImage,
}: HeroBackgroundCarouselProps) {
  const hasImages = images.length > 0

  return (
    <>
      {!shouldShowWhite && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
          className={cn(
            'absolute inset-x-0 top-0 pointer-events-none z-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800',
            overlayOffsetClasses
          )}
        />
      )}

      {hasImages && (
        <div
          className={cn(
            'absolute inset-x-0 top-0 z-0 pointer-events-none',
            overlayOffsetClasses
          )}
        >
          <div className="relative h-full overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImage] || '/placeholder.svg'}
                  alt={`Slide ${currentImage + 1}`}
                  fill
                  className="object-cover"
                  priority={currentImage < 2}
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isScrollRevealReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/30 to-black/20"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function PlaygroundPage() {
  return (
    <>
      <ScrollRevealInit />
      <Hero />
    </>
  )
}
