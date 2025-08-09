import { Building, Container, Hammer, Truck, Wrench, Zap } from 'lucide-react'
import type { ComponentType } from 'react'

export interface CategoryFixture {
  id: string
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  iconColor?: string
  bgColor?: string
  fontColor?: string
  color: string
  count: number
  href: string
  slug: string
}

export const categoriesFixture: CategoryFixture[] = [
  {
    id: '1',
    name: 'Andaimes Suspensos',
    description:
      'Andaimes suspensos elétricos e manuais para trabalhos em altura com segurança total.',
    icon: Building,
    color: 'from-blue-500 to-blue-600',
    count: 25,
    href: '/catalogo/andaimes-suspensos',
    slug: 'andaimes-suspensos',
  },
  {
    id: '2',
    name: 'Cadeiras Elétricas',
    description:
      'Cadeiras elétricas e manuais para altura com tecnologia avançada e manutenção constante.',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    count: 18,
    href: '/catalogo/cadeiras-eletricas',
    slug: 'cadeiras-eletricas',
  },
  {
    id: '3',
    name: 'Andaimes Tubulares',
    description:
      'Andaimes tubulares para diversas alturas com certificação e estrutura robusta.',
    icon: Wrench,
    color: 'from-red-500 to-red-600',
    count: 35,
    href: '/catalogo/andaimes-tubulares',
    slug: 'andaimes-tubulares',
  },
  {
    id: '4',
    name: 'Betoneiras',
    description:
      'Betoneiras de diversos tamanhos para preparo de concreto com eficiência máxima.',
    icon: Truck,
    color: 'from-green-500 to-green-600',
    count: 22,
    href: '/catalogo/betoneiras',
    slug: 'betoneiras',
  },
  {
    id: '5',
    name: 'Rompedores',
    description:
      'Rompedores pneumáticos e elétricos para demolição e quebra de concreto.',
    icon: Hammer,
    color: 'from-purple-500 to-purple-600',
    count: 28,
    href: '/catalogo/rompedores',
    slug: 'rompedores',
  },
  {
    id: '6',
    name: 'Compressores',
    description:
      'Compressores de ar para obras com alta pressão e durabilidade comprovada.',
    icon: Container,
    color: 'from-indigo-500 to-indigo-600',
    count: 15,
    href: '/catalogo/compressores',
    slug: 'compressores',
  },
]
