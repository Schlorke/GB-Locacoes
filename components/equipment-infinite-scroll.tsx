'use client'

import { gsap } from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Equipment = {
  id: string
  name: string
  description: string
  pricePerDay: number
  images: string[]
}

type EquipmentInfiniteScrollProps = {
  className?: string
}

export function EquipmentInfiniteScroll({
  className = '',
}: EquipmentInfiniteScrollProps) {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Buscar equipamentos da API
    const fetchEquipments = async () => {
      try {
        const response = await fetch('/api/equipments')
        if (response.ok) {
          const data = await response.json()
          setEquipments(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Erro ao carregar equipamentos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipments()
  }, [])

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current || equipments.length === 0) return

    // Animação contínua linha 1 (direita → esquerda)
    const row1Animation = gsap.to(row1Ref.current, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    // Animação contínua linha 2 (esquerda → direita)
    const row2Animation = gsap.fromTo(
      row2Ref.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        duration: 40,
        ease: 'none',
        repeat: -1,
      }
    )

    return () => {
      row1Animation.kill()
      row2Animation.kill()
    }
  }, [equipments])

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-slate-600">Carregando equipamentos...</p>
      </div>
    )
  }

  // Duplicar equipamentos para criar loop infinito (limitar para performance)
  const limitedEquipments = equipments.slice(0, 15) // Máximo 15 equipamentos
  const duplicatedEquipments = [...limitedEquipments, ...limitedEquipments]

  return (
    <div
      className={`overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-12 ${className}`}
    >
      {/* Título */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Nossos Equipamentos
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          Confira nossa linha completa de equipamentos para locação
        </p>
      </div>

      {/* Container unificado para ambas as linhas */}
      <div className="relative overflow-hidden pt-8 pb-16">
        {/* Fade-out overlays laterais */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-blue-50 via-blue-50/80 to-transparent" />

        {/* Linha 1: Direita → Esquerda */}
        <div className="mb-6">
          <div
            ref={row1Ref}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {duplicatedEquipments.map((equipment, index) => (
              <EquipmentCard
                key={`row1-${equipment.id}-${index}`}
                equipment={equipment}
              />
            ))}
          </div>
        </div>

        {/* Linha 2: Esquerda → Direita */}
        <div>
          <div
            ref={row2Ref}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {duplicatedEquipments.map((equipment, index) => (
              <EquipmentCard
                key={`row2-${equipment.id}-${index}`}
                equipment={equipment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Card de Equipamento
function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <div className="group flex-shrink-0 w-[320px] overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      {/* Imagem */}
      <div className="relative h-[200px] w-full overflow-hidden bg-slate-100">
        <Image
          src={equipment.images?.[0] || '/placeholder.svg'}
          alt={equipment.name}
          fill
          className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
          sizes="320px"
          quality={75}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-slate-900 line-clamp-1">
          {equipment.name}
        </h3>
        <p className="mb-4 text-sm text-slate-600 line-clamp-2">
          {equipment.description}
        </p>

        {/* Preço */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-orange-600">
            R$ {equipment.pricePerDay?.toFixed(2) || '0.00'}
          </span>
          <span className="text-sm text-slate-500">/dia</span>
        </div>
      </div>
    </div>
  )
}
