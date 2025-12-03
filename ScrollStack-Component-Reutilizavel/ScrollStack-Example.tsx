/**
 * Exemplo completo de uso do ScrollStack
 *
 * Para testar, copie este código para seu App.tsx ou crie uma página específica
 */

import React, { useState } from 'react'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

// Ícones SVG simples (você pode substituir por react-icons ou outra biblioteca)
const TextIcon = () => (
  <svg
    className="w-24 h-24 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  </svg>
)

const PlayIcon = () => (
  <svg
    className="w-24 h-24 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ComponentIcon = () => (
  <svg
    className="w-24 h-24 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
    />
  </svg>
)

const ImageIcon = () => (
  <svg
    className="w-24 h-24 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const StarIcon = () => (
  <svg
    className="w-24 h-24 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

function ScrollStackExample() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [key, setKey] = useState(0)

  const handleStackComplete = () => {
    console.log('Stack animation completed!')
    setIsCompleted(true)
  }

  const handleRefresh = () => {
    setKey((prev) => prev + 1)
    setIsCompleted(false)
  }

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Botão de refresh */}
      <button
        onClick={handleRefresh}
        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        title="Reiniciar animação"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* Título superior */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-black text-white text-center transition-all duration-300">
          {isCompleted ? '🎉 Stack Completo!' : '👇 Scroll Down'}
        </h1>
      </div>

      {/* ScrollStack Component */}
      <ScrollStack
        key={key}
        itemDistance={200}
        itemStackDistance={30}
        stackPosition="20%"
        baseScale={0.85}
        rotationAmount={0}
        blurAmount={0}
        onStackComplete={handleStackComplete}
      >
        {/* Card 1 - Text Animations */}
        <ScrollStackItem itemClassName="bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-purple-400">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Text Animations
            </h3>
            <div className="flex items-center justify-center">
              <TextIcon />
            </div>
            <p className="text-white/80 text-center">
              Animações de texto incríveis
            </p>
          </div>
        </ScrollStackItem>

        {/* Card 2 - Animations */}
        <ScrollStackItem itemClassName="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Animations
            </h3>
            <div className="flex items-center justify-center">
              <PlayIcon />
            </div>
            <p className="text-white/80 text-center">
              Efeitos de animação suaves
            </p>
          </div>
        </ScrollStackItem>

        {/* Card 3 - Components */}
        <ScrollStackItem itemClassName="bg-gradient-to-br from-pink-600 to-pink-700 border-2 border-pink-400">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Components
            </h3>
            <div className="flex items-center justify-center">
              <ComponentIcon />
            </div>
            <p className="text-white/80 text-center">
              Componentes reutilizáveis
            </p>
          </div>
        </ScrollStackItem>

        {/* Card 4 - Backgrounds */}
        <ScrollStackItem itemClassName="bg-gradient-to-br from-indigo-600 to-indigo-700 border-2 border-indigo-400">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Backgrounds
            </h3>
            <div className="flex items-center justify-center">
              <ImageIcon />
            </div>
            <p className="text-white/80 text-center">
              Fundos animados elegantes
            </p>
          </div>
        </ScrollStackItem>

        {/* Card 5 - Final */}
        <ScrollStackItem itemClassName="bg-gradient-to-br from-emerald-600 to-emerald-700 border-2 border-emerald-400">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h3 className="text-3xl md:text-5xl font-black text-white text-center">
              Tudo no React Bits! 🚀
            </h3>
            <div className="flex items-center justify-center">
              <StarIcon />
            </div>
            <p className="text-white/90 text-center text-lg">
              Componentes prontos para usar
            </p>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  )
}

export default ScrollStackExample

/* ==================== VARIAÇÕES ====================

// 1. Com Rotação e Blur
<ScrollStack
  rotationAmount={2}
  blurAmount={5}
  baseScale={0.8}
>

// 2. Mais Espaçado
<ScrollStack
  itemDistance={300}
  itemStackDistance={50}
  stackPosition="30%"
>

// 3. Scroll da Janela (Fullscreen)
<ScrollStack
  useWindowScroll={true}
  className="min-h-screen"
>

// 4. Cards Menores
<ScrollStack>
  <ScrollStackItem itemClassName="h-60 p-8">
    <p>Card menor</p>
  </ScrollStackItem>
</ScrollStack>

==================== FIM DAS VARIAÇÕES ==================== */
