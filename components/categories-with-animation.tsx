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

const iconMap = {
  Building,
  Container,
  Hammer,
  HardHat,
  Shield,
  Truck,
  Wrench,
  Zap,
}

interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  icon: string | null
  iconColor: string
  bgColor: string
  fontColor: string
  _count: {
    equipments: number
  }
}

export default function CategoriesWithAnimation() {
  const [categories, setCategories] = useState<Category[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl =
          typeof window !== 'undefined' && (window as any).__STORYBOOK__
            ? 'http://localhost:3000'
            : ''
        const res = await fetch(`${baseUrl}/api/categories`)
        if (res.ok) {
          const data = await res.json()
          setCategories(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1'
                  card.style.transform = 'translateY(0)'
                  card.style.transition = 'all 0.8s ease-out'
                }, index * 200)
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent =
              (category.icon &&
                iconMap[category.icon as keyof typeof iconMap]) ||
              Wrench
            return (
              <Link
                key={category.id}
                href={`/catalogo/${category.slug}`}
                className="group"
              >
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
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom right, ${category.iconColor}, ${category.fontColor})`,
                    }}
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
                      {category.description}
                    </p>

                    <div className="text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors duration-300 mt-auto">
                      <span className="inline-block group-hover:scale-110 transition-transform duration-300">
                        {category._count?.equipments ?? 0} equipamentos disponíveis
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
      </div>
    </section>
  )
}
