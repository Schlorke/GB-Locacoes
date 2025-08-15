'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Building,
  Container,
  Hammer,
  HardHat,
  Shield,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Mapeamento de ícones por categoria
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  Container,
  Hammer,
  HardHat,
  Shield,
  Truck,
  Wrench,
  Zap,
}

// Cores padrão por índice
const defaultColors = [
  'from-blue-500 to-blue-600',
  'from-yellow-500 to-yellow-600',
  'from-red-500 to-red-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-indigo-500 to-indigo-600',
  'from-emerald-500 to-emerald-600',
  'from-orange-500 to-orange-600',
]

interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  iconColor: string
  bgColor: string
  fontColor: string
  slug: string
  _count: {
    equipments: number
  }
}

interface CategoryDisplay extends Category {
  iconComponent: React.ComponentType<{ className?: string }>
  color: string
  href: string
}

export default function CategoriesWithAnimation() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [categories, setCategories] = useState<CategoryDisplay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar categorias reais da API
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/categories')

        if (!response.ok) {
          throw new Error('Erro ao carregar categorias')
        }

        const data: Category[] = await response.json()

        // Converter para formato de exibição
        const displayCategories: CategoryDisplay[] = data.map(
          (category, index) => ({
            ...category,
            iconComponent: iconMap[category.icon || 'Wrench'] || Wrench,
            color:
              defaultColors[index % defaultColors.length] ||
              'from-gray-500 to-gray-600',
            href: `/equipamentos?categoria=${category.slug}`,
          })
        )

        setCategories(displayCategories)
      } catch (err) {
        console.error('Erro ao buscar categorias:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar os cards um por vez com delay
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1'
                  card.style.transform = 'translateY(0)'
                  card.style.transition = 'all 0.8s ease-out'
                }, index * 200) // 200ms entre cada card
              }
            })

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorias de Equipamentos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre rapidamente o equipamento especializado que você precisa
            para sua obra
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-2 text-gray-600">Carregando categorias...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-orange-600 hover:text-orange-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!isLoading && !error && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma categoria encontrada.</p>
          </div>
        )}

        {!isLoading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.iconComponent
              return (
                <Link key={category.id} href={category.href} className="group">
                  <Card
                    ref={(el) => {
                      cardsRef.current[index] = el
                    }}
                    className="h-full relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                    style={{
                      opacity: 0,
                      transform: 'translateY(60px)',
                    }}
                  >
                    {/* Clean depth layers matching equipments page */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <CardContent className="p-6 text-center relative z-10 flex flex-col flex-1">
                      <div className="mb-4 flex justify-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
                          <IconComponent className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />

                          {/* Pulse effect */}
                          <div className="absolute inset-0 bg-orange-200 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {category.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300 flex-1">
                        {category.description || 'Categoria de equipamentos'}
                      </p>

                      <div className="text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors duration-300 mt-auto">
                        <span className="inline-block group-hover:scale-110 transition-transform duration-300">
                          {category._count.equipments} equipamentos disponíveis
                        </span>
                      </div>

                      {/* Hover indicator - sempre no fundo */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0"></div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
