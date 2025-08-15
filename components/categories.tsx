'use client'

import { Card, CardContent } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface ApiCategory {
  id: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons
  iconColor?: string
  bgColor?: string
  fontColor?: string
  slug: string
  _count?: { equipments: number }
}

interface Category {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
  count: number
  href: string
}

const fallbackCategories: Category[] = [
  {
    icon: LucideIcons.Building,
    title: 'Andaimes Suspensos',
    description:
      'Andaimes suspensos elétricos e manuais para trabalhos em altura com segurança total.',
    color: 'from-blue-500 to-blue-600',
    count: 25,
    href: '/equipamentos',
  },
  {
    icon: LucideIcons.Zap,
    title: 'Cadeiras Elétricas',
    description:
      'Cadeiras elétricas e manuais para altura com tecnologia avançada e manutenção constante.',
    color: 'from-yellow-500 to-yellow-600',
    count: 18,
    href: '/equipamentos',
  },
  {
    icon: LucideIcons.Wrench,
    title: 'Andaimes Tubulares',
    description:
      'Andaimes tubulares para diversas alturas com certificação e estrutura robusta.',
    color: 'from-red-500 to-red-600',
    count: 35,
    href: '/equipamentos',
  },
  {
    icon: LucideIcons.Truck,
    title: 'Betoneiras',
    description:
      'Betoneiras de diversos tamanhos para preparo de concreto com eficiência máxima.',
    color: 'from-green-500 to-green-600',
    count: 22,
    href: '/equipamentos',
  },
  {
    icon: LucideIcons.Hammer,
    title: 'Rompedores',
    description:
      'Rompedores pneumáticos e elétricos para demolição e quebra de concreto.',
    color: 'from-purple-500 to-purple-600',
    count: 28,
    href: '/equipamentos',
  },
  {
    icon: LucideIcons.Container,
    title: 'Compressores',
    description:
      'Compressores de ar para obras com alta pressão e durabilidade comprovada.',
    color: 'from-indigo-500 to-indigo-600',
    count: 15,
    href: '/equipamentos',
  },
]

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        if (!res.ok) return
        const data: ApiCategory[] = await res.json()
        const mapped: Category[] = data.map((cat: ApiCategory) => ({
          icon:
            (cat.icon &&
              (
                LucideIcons as unknown as Record<
                  string,
                  React.ComponentType<{ className?: string }>
                >
              )[cat.icon]) ||
            LucideIcons.Package,
          title: cat.name,
          description: cat.description || '',
          color: 'from-orange-500 to-orange-600',
          count: cat._count?.equipments ?? 0,
          href: `/catalogo/${cat.slug}`,
        }))
        setCategories(mapped)
      } catch (err) {
        console.error('Erro ao buscar categorias', err)
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
                }, index * 150)
              }
            })
            observer.unobserve(entry.target)
          }
        })
      },

      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
  }, [categories])

  return (
    <section id="categorias" ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4 opacity-0"
            style={{ opacity: 0, transform: 'translateY(60px)' }}
          >
            Categorias de Equipamentos
          </h2>
          <p
            className="section-subtitle text-xl text-gray-600 max-w-2xl mx-auto opacity-0"
            style={{ opacity: 0, transform: 'translateY(60px)' }}
          >
            Encontre rapidamente o equipamento especializado que você precisa
            para sua obra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, _index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="benefit-card category-card relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 group opacity-0 flex flex-col h-full"
              >
                {/* Clean depth layers matching equipments page */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardContent className="p-6 text-center relative z-10 flex flex-col flex-1">
                  <div className="mb-4 flex justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative">
                      <IconComponent className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-0 group-hover:opacity-30"></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3 flex-1">
                    {category.description}
                  </p>

                  <div className="text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors duration-300 mt-auto">
                    {category.count} equipamentos disponíveis
                  </div>
                </CardContent>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-0"></div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
