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
    // Move continuamente sem parar - loop seamless
    const row1Animation = gsap.timeline({ repeat: -1 }).to(row1Ref.current, {
      xPercent: -33.333,
      duration: 25,
      ease: 'linear',
    })

    // Animação contínua linha 2 (esquerda → direita)
    // Começa offset e move na direção oposta
    gsap.set(row2Ref.current, { xPercent: -33.333 })
    const row2Animation = gsap.timeline({ repeat: -1 }).to(row2Ref.current, {
      xPercent: 0,
      duration: 25,
      ease: 'linear',
    })

    return () => {
      row1Animation.kill()
      row2Animation.kill()
    }
  }, [equipments])

  // Retornar null enquanto carrega (scroll reveal vai animar quando aparecer)
  if (isLoading || equipments.length === 0) {
    return null
  }

  // Dividir equipamentos entre as duas linhas para mostrar produtos diferentes
  const limitedEquipments = equipments.slice(0, 12) // Máximo 12 equipamentos
  const midPoint = Math.ceil(limitedEquipments.length / 2)

  // Linha 1: Primeira metade dos equipamentos (triplicada)
  const row1Equipments = limitedEquipments.slice(0, midPoint)
  const row1Duplicated = [
    ...row1Equipments,
    ...row1Equipments,
    ...row1Equipments,
  ]

  // Linha 2: Segunda metade dos equipamentos (triplicada)
  const row2Equipments = limitedEquipments.slice(midPoint)
  const row2Duplicated = [
    ...row2Equipments,
    ...row2Equipments,
    ...row2Equipments,
  ]

  return (
    <div
      className={`overflow-hidden ${className}`}
      data-fade-only
      style={{ opacity: 0 }}
    >
      {/* Título */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Nossos Equipamentos
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Confira nossa linha completa de equipamentos para locação
        </p>
      </div>

      {/* Container unificado para ambas as linhas */}
      <div className="relative overflow-hidden pt-8 pb-16">
        {/* Fade-out overlays laterais */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent" />

        {/* Linha 1: Direita → Esquerda */}
        <div className="mb-6">
          <div
            ref={row1Ref}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {row1Duplicated.map((equipment, index) => (
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
            {row2Duplicated.map((equipment, index) => (
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
    <div className="group flex-shrink-0 w-[270px] overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      {/* Imagem */}
      <div className="relative h-[170px] w-full overflow-hidden bg-slate-100">
        <Image
          src={equipment.images?.[0] || '/placeholder.svg'}
          alt={equipment.name}
          fill
          className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
          sizes="270px"
          quality={75}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-3">
        <h3 className="mb-1 text-base font-bold text-slate-900 line-clamp-1">
          {equipment.name}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2">
          {equipment.description}
        </p>
      </div>
    </div>
  )
}
