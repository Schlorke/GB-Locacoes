'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import CTAButton, { QuoteCTA } from '@/components/ui/cta-button'
import { formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Clock, Eye, Star, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  description?: string | null
  pricePerDay: number | string // Pode ser number ou Decimal do Prisma
  imageUrl?: string
  images?: string[]
  category: {
    name: string
    slug?: string
  }
  available?: boolean
  isAvailable?: boolean // Para compatibilidade
  specifications?: Record<string, string | number | boolean>
  popular?: boolean
  featured?: boolean
}

interface EquipmentCardProps {
  equipment: Equipment
  variant?: 'default' | 'featured' | 'compact'
  showRating?: boolean
  className?: string
  priority?: boolean // Para otimização de imagens
  index?: number // Para animações escalonadas
}

export function EquipmentCard({
  equipment,
  variant = 'default',
  showRating = true,
  className = '',
  priority = false,
  index = 0,
}: EquipmentCardProps) {
  // Compatibilidade entre available e isAvailable
  const isAvailable = equipment.available ?? equipment.isAvailable ?? true

  // Imagem principal - usa primeira da galeria ou imageUrl
  const primaryImage = equipment.images?.[0] || equipment.imageUrl
  const imageUrl = primaryImage || '/placeholder.jpg'

  // Preço formatado
  const price =
    typeof equipment.pricePerDay === 'string'
      ? parseFloat(equipment.pricePerDay)
      : equipment.pricePerDay

  // Título SEO otimizado
  const seoTitle = `Aluguel de ${equipment.name} - GB Locações`

  // Rating simulado (em produção, viria do banco de dados)
  const rating = 4.8
  const reviewCount = Math.floor(Math.random() * 50) + 15

  const cardVariants = {
    default:
      'group overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-0 shadow-md',
    featured:
      'group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-2 border-orange-200 shadow-lg relative',
    compact:
      'group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm',
  }

  const contentPadding = {
    default: 'p-4',
    featured: 'p-5',
    compact: 'p-3',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={className}
    >
      <Card className={cardVariants[variant]}>
        {/* Featured Badge */}
        {variant === 'featured' && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-orange-600 text-white shadow-lg">
              <Star className="w-3 h-3 mr-1" fill="currentColor" />
              Destaque
            </Badge>
          </div>
        )}

        {/* Popular Badge */}
        {equipment.popular && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-green-600 text-white shadow-lg">
              <Zap className="w-3 h-3 mr-1" fill="currentColor" />
              Popular
            </Badge>
          </div>
        )}

        {/* Image Container */}
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <Image
            src={imageUrl}
            alt={`${equipment.name} para locação - GB Locações`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`/equipamentos/${equipment.id}`}>
              <CTAButton
                variant="primary"
                size="sm"
                className="shadow-lg backdrop-blur-sm"
                trackingId={`equipment-card-quick-view-${equipment.id}`}
                icon={<Eye className="w-4 h-4" />}
              >
                Ver Detalhes
              </CTAButton>
            </Link>
          </div>
        </div>

        <CardContent className={contentPadding[variant]}>
          {/* Category and Availability */}
          <div className="mb-3 flex items-center justify-between">
            <Link
              href={`/equipamentos?categoria=${equipment.category.slug || ''}`}
              className="hover:scale-105 transition-transform"
            >
              <Badge
                variant="outline"
                className="text-xs hover:bg-orange-50 hover:border-orange-200 transition-colors"
              >
                {equipment.category.name}
              </Badge>
            </Link>
            <Badge
              variant={isAvailable ? 'default' : 'destructive'}
              className={`text-xs ${
                isAvailable
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-red-100 text-red-700 border-red-300'
              }`}
            >
              {isAvailable ? 'Disponível' : 'Indisponível'}
            </Badge>
          </div>

          {/* Equipment Title */}
          <Link href={`/equipamentos/${equipment.id}`}>
            <h3
              className={`font-bold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer ${
                variant === 'compact' ? 'text-base mb-2' : 'text-lg mb-3'
              }`}
              title={seoTitle}
            >
              {equipment.name}
            </h3>
          </Link>

          {/* Description */}
          {equipment.description && variant !== 'compact' && (
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">
              {equipment.description}
            </p>
          )}

          {/* Rating */}
          {showRating && variant !== 'compact' && (
            <div className="mb-3 flex items-center gap-2 text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{rating}</span>
              <span className="text-gray-400">({reviewCount} avaliações)</span>
            </div>
          )}

          {/* Pricing */}
          <div
            className={`flex items-baseline gap-1 ${variant === 'compact' ? 'mb-3' : 'mb-4'}`}
          >
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>A partir de</span>
            </div>
          </div>

          <div className={variant === 'compact' ? 'mb-3' : 'mb-4'}>
            <span
              className={`font-bold text-orange-600 ${
                variant === 'compact' ? 'text-lg' : 'text-2xl'
              }`}
            >
              {formatCurrency(price || 0)}
            </span>
            <span className="text-sm text-gray-500">/dia</span>
            {variant !== 'compact' && (
              <div className="text-xs text-gray-400 mt-1">
                *Consulte condições para períodos maiores
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-2 ${variant === 'compact' ? 'flex-row' : 'flex-col'}`}
          >
            <Link href={`/equipamentos/${equipment.id}`} className="flex-1">
              <CTAButton
                variant="outline"
                size={variant === 'compact' ? 'sm' : 'md'}
                fullWidth
                trackingId={`equipment-card-details-${equipment.id}`}
                icon={<Eye className="w-4 h-4" />}
                iconPosition="left"
              >
                {variant === 'compact' ? 'Ver' : 'Ver Detalhes'}
              </CTAButton>
            </Link>

            <QuoteCTA
              size={variant === 'compact' ? 'sm' : 'md'}
              fullWidth
              disabled={!isAvailable}
              href={`/orcamento?equipamento=${equipment.id}`}
              className="flex-1"
            />
          </div>

          {/* Additional specs for featured variant */}
          {variant === 'featured' && equipment.specifications && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium mb-2">
                Especificações:
              </p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(equipment.specifications)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <Badge
                      key={key}
                      variant="outline"
                      className="text-xs text-gray-600 bg-gray-50"
                    >
                      {key}: {value}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  )
}
