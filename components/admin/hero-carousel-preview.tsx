'use client'

import { Card } from '@/components/ui/card'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Phone, Play, Search } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroCarouselPreviewProps {
  images: string[]
  waveAnimation: 'none' | 'static' | 'animated'
}

export function HeroCarouselPreview({
  images = [],
  waveAnimation = 'animated',
}: HeroCarouselPreviewProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)
  const [carouselKey, setCarouselKey] = useState(0) // Separado para forçar remount do carrossel
  const hasImages = images.length > 0

  // Função para reiniciar animações (carrossel + miniatura)
  const resetAnimations = () => {
    setCurrentImage(0) // Volta para primeira imagem
    setAnimationKey((prev) => prev + 1) // Força remount da miniatura
    setCarouselKey((prev) => prev + 1) // Força remount do carrossel
  }

  // Auto-play carousel (sempre com mesmas dependências)
  useEffect(() => {
    if (!hasImages || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000) // 3 segundos no preview (mais rápido que no real)

    return () => clearInterval(interval)
  }, [hasImages, images.length])

  return (
    <Card
      className="relative overflow-hidden shadow-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'rgb(248, 250, 252)',
        borderColor: 'rgb(224, 230, 235)',
        borderWidth: '1.5px',
      }}
    >
      <div className="p-4 md:p-5 space-y-4">
        {/* Label de preview - IGUAL ao exemplo */}
        <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Preview Hero Carousel
          </span>
        </div>

        {/* Bloco do preview */}
        <div className="rounded-lg overflow-hidden border border-gray-200">
          {/* HEADER PREVIEW - Igual ao de "Informações da Empresa" */}
          <div className="bg-white rounded-t-lg border-b border-gray-200 shadow-sm overflow-hidden">
            {/* Top Bar */}
            <div className="bg-slate-700 px-3 py-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-slate-200" />
                  <div className="flex items-center gap-2 text-slate-100">
                    <span className="hidden sm:inline">(51) 2313-6262</span>
                    <span className="text-slate-300 hidden sm:inline">|</span>
                    <span>(51) 99820-5163</span>
                  </div>
                </div>
                <div className="text-slate-200 text-xs hidden md:block">
                  Atendimento especializado
                </div>
              </div>
            </div>

            {/* Main Header */}
            <div className="px-3 py-2.5 flex items-center justify-between gap-3">
              {/* Logo + Company Name */}
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white p-2.5 rounded-xl font-bold text-[15px] shadow-md">
                  GB
                </div>

                {/* Company Name */}
                <div>
                  <div className="font-bold text-sm text-slate-800">
                    GB Locações
                  </div>
                  <div className="text-xs text-slate-500">
                    Equipamentos para Construção
                  </div>
                </div>
              </div>

              {/* Botão de reset */}
              <FilterResetButton
                onClick={resetAnimations}
                title="Resetar animações"
                size="sm"
              />
            </div>
          </div>

          {/* Preview Container - Miniatura do Hero */}
          <div
            className={cn(
              'relative overflow-hidden',
              // padding-bottom para compensar altura da onda (faz onda "empurrar" conteúdo)
              waveAnimation !== 'none' ? 'pb-8' : 'pb-0',
              // Background BRANCO quando HÁ imagens (efeito "abrindo os olhos")
              // Background LARANJA apenas como fallback quando NÃO há imagens
              hasImages
                ? 'bg-slate-50'
                : 'bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800'
            )}
            style={{ height: '320px' }}
          >
            {/* Carrossel - só renderiza se houver imagens */}
            {hasImages && (
              <>
                <div key={carouselKey} className="absolute inset-0 z-0">
                  {/*
                    Transição SUAVE com animação inicial
                    - initial={true} permite fade-in no primeiro carregamento
                    - Cria efeito de "abrindo os olhos" ao carregar a página
                    - Uma imagem desaparece enquanto outra aparece (SEM flash branco)
                    - key={carouselKey} força remount ao clicar no reset
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
                        src={images[currentImage] || '/placeholder.svg'}
                        alt={`Slide ${currentImage + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Overlay gradiente - anima JUNTO com a primeira imagem (sem flash cinza) */}
                  <motion.div
                    key={`overlay-${carouselKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/30 to-black/20"
                  />
                </div>

                {/* Indicadores do carrossel */}
                {images.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
                    {images.map((_, index) => (
                      <motion.button
                        key={index}
                        className={cn(
                          'h-2 w-2 rounded-full transition-all duration-500',
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

            {/* SVG ONDULADO - CÓDIGO REFEITO E FUNCIONAL */}
            {waveAnimation !== 'none' && (
              <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden leading-none">
                <svg
                  className="relative block h-12 w-full"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {waveAnimation === 'animated' ? (
                    // ✨ MODO ANIMADO - motion.path com animações suaves
                    <>
                      {/* Onda 1 - Camada traseira com opacidade 30% */}
                      <motion.path
                        d="M0,120V73.71c47.79,-22.2,103.59,-32.17,158,-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
                        fill="rgb(248, 250, 252)"
                        opacity="0.3"
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
                          ease: 'easeInOut',
                        }}
                      />

                      {/* Onda 2 - Camada do meio com opacidade 60% */}
                      <motion.path
                        d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
                        fill="rgb(248, 250, 252)"
                        opacity="0.6"
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
                          ease: 'easeInOut',
                          delay: 1,
                        }}
                      />

                      {/* Onda 3 - Camada frontal opacidade 100% */}
                      <motion.path
                        d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
                        fill="rgb(248, 250, 252)"
                        opacity="1"
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
                          ease: 'easeInOut',
                          delay: 2,
                        }}
                      />
                    </>
                  ) : (
                    // ⏸️ MODO ESTÁTICO - paths normais sem animação
                    <>
                      <path
                        d="M0,120V73.71c47.79,-22.2,103.59,-32.17,158,-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27,-18,138.3,-24.88,209.4,-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
                        fill="rgb(248, 250, 252)"
                        opacity="0.3"
                      />
                      <path
                        d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9,-9.42,98.6,-31.56,31.77,-25.39,62.32,-62,103.63,-73,40.44,-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28,-22.88,168.9,-38.84,30.2,-8.66,59,-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
                        fill="rgb(248, 250, 252)"
                        opacity="0.6"
                      />
                      <path
                        d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48,-12.24,165.56,-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
                        fill="rgb(248, 250, 252)"
                        opacity="1"
                      />
                    </>
                  )}
                </svg>
              </div>
            )}

            {/* Miniatura FIEL dos componentes do Hero com ANIMAÇÕES */}
            <div className="absolute inset-0 z-10">
              {/* Container centralizado como no Hero real */}
              <div className="max-w-4xl mx-auto px-4 py-4 h-full">
                <div
                  key={animationKey}
                  className="grid lg:grid-cols-2 gap-6 items-center h-full"
                >
                  {/*
                    Lado esquerdo - Conteúdo vindo DA ESQUERDA

                    ⚠️ IMPORTANTE: Animação HORIZONTAL (x: -60 → 0)
                    - Container vem da ESQUERDA PARA DIREITA (x: -60)
                    - Elementos filhos usam APENAS opacity (SEM y)
                    - Motivo: Evitar soma de transformações que causaria movimento DIAGONAL
                    - Resultado: Movimento 100% RETO da esquerda
                  */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                    className="space-y-3"
                  >
                    {/*
                      Título - APENAS opacity (sem y)
                      Se usar y: 20, somaria com x: -60 do container = movimento diagonal ❌
                    */}
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-xl font-bold leading-tight text-white drop-shadow-2xl"
                    >
                      Locação de Equipamentos para{' '}
                      <span className="text-yellow-300 relative">
                        Construção Civil
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-300 rounded-full origin-left"
                        />
                      </span>
                    </motion.h1>

                    {/* Texto descritivo - APENAS opacity (herda movimento horizontal do pai) */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-[11px] leading-relaxed text-white/90 drop-shadow-lg"
                    >
                      Há 10 anos oferecendo soluções em locação de equipamentos
                      para obras e serviços em altura
                    </motion.p>

                    {/* Barra de busca - APENAS opacity (herda movimento horizontal do pai) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="bg-white rounded-xl p-1.5 max-w-[200px] shadow-lg"
                    >
                      <div className="flex items-center gap-1">
                        <input
                          className="text-[9px] flex-1 bg-transparent outline-none text-gray-500 px-1"
                          placeholder="Buscar equipamentos..."
                          disabled
                        />
                        <div className="bg-orange-600 hover:bg-orange-700 rounded-lg p-1 shadow-sm flex items-center justify-center transition-colors group">
                          <Search className="w-2 h-2 text-white group-hover:text-white/90" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Botões - APENAS opacity (herda movimento horizontal do pai) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex gap-2"
                    >
                      <div className="inline-flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 hover:text-white px-3 py-1 rounded-lg text-[9px] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                        Ver Catálogo
                        <ArrowRight className="h-2 w-2 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="inline-flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 px-3 py-1 rounded-lg text-[9px] font-semibold border-2 border-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <Play className="h-2 w-2 group-hover:scale-110 transition-transform" />
                        Orçamento
                      </div>
                    </motion.div>

                    {/* Contato - APENAS opacity (herda movimento horizontal do pai) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="flex gap-3 text-[9px] text-orange-100"
                    >
                      <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group">
                        <Phone className="h-2.5 w-2.5 group-hover:animate-bounce" />
                        <span>(51) 2313-6262 | (51) 99820-5163</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group">
                        <MapPin className="h-2.5 w-2.5 group-hover:animate-pulse" />
                        <span>Entregamos em toda região</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/*
                    Lado direito - Imagem vindo DA DIREITA

                    ⚠️ IMPORTANTE: Animação HORIZONTAL (x: 60 → 0)
                    - Container vem da DIREITA PARA ESQUERDA (x: 60)
                    - Movimento 100% RETO horizontal
                  */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    className="relative h-full flex items-center justify-center"
                  >
                    <div className="relative group w-full lg:w-60 h-auto">
                      {/* Imagem placeholder com hover scale */}
                      <div className="flex w-full h-full min-h-[180px] bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                        <span className="text-white/60 text-xs font-medium">
                          Imagem
                        </span>
                      </div>

                      {/* Badge +200 - Com hover scale FRAMER MOTION */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -bottom-1 -left-1 bg-yellow-500 text-gray-900 px-2 py-1 rounded-xl shadow-lg hover:shadow-xl cursor-pointer"
                      >
                        <div className="text-[10px] font-bold">+200</div>
                        <div className="text-[7px] font-medium leading-tight">
                          Equipamentos Disponíveis
                        </div>
                      </motion.div>

                      {/* Badge 10+ - Com hover scale FRAMER MOTION */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-1 -right-1 bg-white/90 backdrop-blur-sm text-orange-600 px-2 py-1 rounded-xl shadow-lg hover:shadow-xl cursor-pointer"
                      >
                        <div className="text-[10px] font-bold">10+</div>
                        <div className="text-[7px] font-medium leading-tight">
                          Anos de Experiência
                        </div>
                      </motion.div>

                      {/* Borda decorativa animada - Também com group-hover */}
                      <div className="absolute inset-[-0.5rem] border border-white/20 rounded-xl animate-pulse pointer-events-none transform group-hover:scale-105 transition-transform duration-500"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de status - Estilo cinza escuro com texto claro */}
          <div className="p-6" style={{ backgroundColor: '#2a2d3a' }}>
            {/* Estrutura de 2 linhas separadas */}
            <div className="space-y-2">
              {/* LINHA 1 - Títulos centralizados */}
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="flex text-gray-300 items-center justify-end text-xs font-medium">
                  Status da Onda
                </div>
                <div className="flex text-gray-300 items-center justify-start text-xs font-medium">
                  Background
                </div>
              </div>

              {/* LINHA 2 - Subtítulos com emojis (largura fixa para alinhamento) */}
              <div className="grid grid-cols-2 gap-8">
                {/* Status da Onda */}
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs w-5 flex-shrink-0 text-center">
                    {waveAnimation === 'none'
                      ? '❌'
                      : waveAnimation === 'static'
                        ? '⏸️'
                        : '✨'}
                  </span>
                  <span className="text-white font-medium text-xs">
                    {waveAnimation === 'none'
                      ? 'Desativada'
                      : waveAnimation === 'static'
                        ? 'Estática'
                        : 'Animada'}
                  </span>
                </div>

                {/* Background */}
                <div className="flex items-center justify-start gap-2">
                  <span className="text-white font-medium text-xs">
                    {hasImages
                      ? `${images.length} ${images.length > 1 ? 'imagens' : 'imagem'}`
                      : 'Padrão'}
                  </span>
                  <span className="text-xs w-5 flex-shrink-0 text-center">
                    {hasImages ? '🖼️' : '🟠'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info "Preview em Tempo Real" - FORA do bloco do preview */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            💡 <strong>Preview em Tempo Real:</strong>{' '}
            {hasImages
              ? `Carrossel ativo com ${images.length} ${images.length > 1 ? 'imagens' : 'imagem'}. `
              : 'Fundo laranja padrão (sem imagens configuradas). '}
            Veja como ficará na página inicial.
          </p>
        </div>
      </div>
    </Card>
  )
}
