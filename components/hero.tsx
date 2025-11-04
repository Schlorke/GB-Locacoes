'use client'

import { Autocomplete } from '@/components/ui/autocomplete'
import {
  usePublicSettings,
  type PublicSettings,
} from '@/hooks/use-public-settings'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Phone, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type HeroProps = {
  initialSettings?: Partial<PublicSettings> | null
}

export default function Hero({ initialSettings }: HeroProps = {}) {
  const router = useRouter()
  const { settings, isLoading } = usePublicSettings({
    initialData: initialSettings ?? undefined,
  })
  const [currentImage, setCurrentImage] = useState(0)

  // Extrair imagens do carousel
  const carouselImages =
    (settings.heroCarousel as Array<{ imageUrl: string }> | undefined)?.map(
      (item) => item.imageUrl
    ) || []
  const hasImages = carouselImages.length > 0
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

  // Auto-play carousel (HOOK SEMPRE chamado - Rules of Hooks)
  useEffect(() => {
    if (!hasImages || carouselImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 5000) // 5 segundos por imagem

    return () => clearInterval(interval)
  }, [hasImages, carouselImages.length])

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

  // Durante loading, usa background previsto a partir de dados iniciais
  if (isLoading) {
    return (
      <section
        className={cn(
          'relative min-h-[70vh] text-white overflow-hidden',
          waveAnimation !== 'none' ? 'pb-12' : 'pb-0',
          loadingShouldShowWhite
            ? 'bg-slate-50'
            : 'bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800'
        )}
      >
        {/* Loading silencioso - aguarda settings carregarem */}
      </section>
    )
  }

  return (
    <section
      className={cn(
        'relative text-white overflow-hidden',
        // padding-bottom para compensar altura da onda (h-12 = 48px)
        // Faz a onda "empurrar" conteúdo sem afetar animações
        waveAnimation !== 'none' ? 'pb-12' : 'pb-0',
        // Background BRANCO quando há imagens (efeito "abrindo os olhos")
        // Background LARANJA quando NÃO há imagens (fallback padrão)
        shouldShowWhite
          ? 'bg-slate-50'
          : 'bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800'
      )}
      role="region"
      aria-roledescription={hasImages ? 'carousel' : undefined}
    >
      {/* CONDICIONAL: Carrossel de fundo - só renderiza se houver imagens */}
      {hasImages && (
        <>
          <div className="absolute inset-0 z-0">
            {/*
              Transição SUAVE com animação inicial
              - initial={true} permite fade-in no primeiro carregamento
              - Cria efeito de "abrindo os olhos" ao carregar a página
              - Uma imagem desaparece enquanto outra aparece (SEM flash branco)
            */}
            <AnimatePresence initial={true}>
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselImages[currentImage] || '/placeholder.svg'}
                  alt={`Slide ${currentImage + 1}`}
                  fill
                  className="object-cover"
                  priority={currentImage < 2}
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay gradiente - anima JUNTO com a primeira imagem (sem flash cinza) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/30 to-black/20"
            />
          </div>

          {/* Indicadores do carrossel */}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 transform space-x-3">
              {carouselImages.map((_, index) => (
                <motion.button
                  key={index}
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
          )}
        </>
      )}

      {/* Efeito ondulado no final do carrossel - baseado em waveAnimation */}
      {waveAnimation !== 'none' && (
        <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden leading-none">
          <svg
            className="relative block h-12 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {waveAnimation === 'animated' ? (
              // Paths ANIMADOS com motion.path
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
              // Paths ESTÁTICOS sem animação
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

      {/* Container de conteúdo - MANTIDO INTACTO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10 w-full">
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
            {/* Animated Search Bar with Autocomplete */}
            <div className="hero-search bg-white rounded-2xl p-2 max-w-md border border-white/20 transition-all duration-300 relative z-[9998] opacity-0">
              <Autocomplete
                placeholder="Buscar equipamentos (ex: andaime, betoneira)"
                onSelect={handleEquipmentSelect}
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            {/* Hero Buttons - Tamanho reduzido */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 opacity-0">
              {/* Botão Ver Catálogo - Altura padronizada */}
              <Link
                href="/equipamentos"
                className="inline-flex items-center justify-center hover:bg-yellow-600 gap-2 px-6 h-12 bg-yellow-500 hover:text-white text-gray-900 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group text-sm"
              >
                Ver Catálogo de Equipamentos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Botão Solicitar Orçamento - Altura padronizada */}
              <Link
                href="/orcamento"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-white text-sm"
              >
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Solicitar Orçamento
              </Link>
            </div>
            {/* Contact Info with animations */}
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
            <div className="relative group bg-transparent">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Equipamentos de construção civil para locação - andaimes suspensos e cadeiras elétricas"
                width={600}
                height={500}
                priority
                className="rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Stats - Ocultos no mobile */}
              <div className="hidden sm:block absolute -bottom-2 -left-2 bg-yellow-500 text-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-bold animate-count-up">+200</div>
                <div className="text-sm font-medium">
                  Equipamentos Disponíveis
                </div>
              </div>
              <div className="hidden sm:block absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm text-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm font-medium">Anos de Experiência</div>
              </div>
              {/* Decorative elements */}
              <div className="absolute inset-[-1rem] border-2 border-white/20 rounded-2xl animate-pulse pointer-events-none transform group-hover:scale-105 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
