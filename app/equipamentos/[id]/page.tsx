import {
  AnimatedBenefit,
  AnimatedMainCard,
  AnimatedSection,
} from '@/components/equipment-detail-animations'
import { EquipmentImageGallery } from '@/components/equipment-image-gallery'
import { ShareButton } from '@/components/share-button'
import { SmartEquipmentPricing } from '@/components/smart-equipment-pricing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Runtime-only Prisma import for server components
async function getPrisma() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}
import * as LucideIcons from 'lucide-react'
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  Shield,
  Star,
  Tag,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

// Função para renderizar ícones Lucide a partir do nome
const renderIcon = (iconName?: keyof typeof LucideIcons, color?: string) => {
  if (!iconName || !LucideIcons[iconName])
    return <Tag className="h-3 w-3 text-gray-400" />

  const IconComponent = LucideIcons[iconName] as React.ComponentType<{
    size?: number
    color?: string
    className?: string
  }>
  return (
    <IconComponent
      size={12}
      color={color || '#3b82f6'}
      className="flex-shrink-0"
    />
  )
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const prisma = await getPrisma()
  const equipment = await prisma.equipment.findUnique({
    where: { id: params.id },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!equipment) {
    return { title: 'Equipamento não encontrado' }
  }

  return {
    title: `${equipment.name} | GB Locações`,
    description: equipment.description,
  }
}

export default async function EquipmentDetailPage(props: Props) {
  const params = await props.params
  const prisma = await getPrisma()
  const equipment = await prisma.equipment.findUnique({
    where: { id: params.id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
          iconColor: true,
          bgColor: true,
          fontColor: true,
          slug: true,
        },
      },
    },
  })

  if (!equipment) {
    notFound()
  }

  // Converter Decimal para number para cálculos
  const pricePerDay = Number(equipment.pricePerDay)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      {/* Hero Section com Background Gradient do Footer - Altura fixa 184px */}
      <div
        className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden"
        style={{ height: '184px' }}
      >
        {/* Pattern overlay sutil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-5 pt-12">
            <Link
              href="/equipamentos"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar aos Equipamentos
            </Link>
          </nav>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Equipamento Certificado</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-400" />
              <span>Entrega Gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-orange-400" />
              <span>Suporte 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        {/* Card Principal do Produto */}
        <AnimatedMainCard>
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm mb-12 hover:shadow-2xl transition-all duration-300">
            {/* Depth layers para profundidade moderna */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

            <div className="relative z-10 grid lg:grid-cols-3 gap-0">
              {/* Coluna Esquerda - Galeria de Imagens (2/3) */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <EquipmentImageGallery
                  images={equipment.images || []}
                  altText={equipment.name}
                />
              </div>

              {/* Coluna Direita - Informações do Produto (1/3) */}
              <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/40 p-8 lg:p-10 space-y-6">
                {/* Header com Categoria e Compartilhar */}
                <div className="flex items-center justify-between -mb-4">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: equipment.category.bgColor || '#EFF6FF',
                      color: equipment.category.fontColor || '#1E40AF',
                    }}
                  >
                    {equipment.category.icon && (
                      <span className="flex-shrink-0">
                        {renderIcon(
                          equipment.category.icon as keyof typeof LucideIcons,
                          equipment.category.iconColor || '#3B82F6'
                        )}
                      </span>
                    )}
                    <span className="truncate">{equipment.category.name}</span>
                  </div>
                  <ShareButton
                    title={`${equipment.name} - GB Locações`}
                    text={`Confira este equipamento para locação: ${equipment.name}`}
                  />
                </div>

                {/* Título do Equipamento */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
                    {equipment.name}
                  </h1>

                  {/* Avaliações */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="font-semibold text-sm ml-1">4.8</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      (127 avaliações)
                    </span>
                  </div>
                </div>

                {/* Status de Disponibilidade */}
                <div className="flex items-center gap-2">
                  {equipment.available ? (
                    <Badge className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1 inline-flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3 text-white flex-shrink-0" />
                      <span>Disponível</span>
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs px-2 py-1">
                      Indisponível
                    </Badge>
                  )}
                </div>

                {/* Sistema de Preços Inteligente */}
                <SmartEquipmentPricing
                  equipmentId={equipment.id}
                  equipmentName={equipment.name}
                  pricePerDay={pricePerDay}
                  isAvailable={equipment.available}
                  dailyDiscount={equipment.dailyDiscount || 0}
                  weeklyDiscount={equipment.weeklyDiscount || 0}
                  biweeklyDiscount={equipment.biweeklyDiscount || 0}
                  monthlyDiscount={equipment.monthlyDiscount || 0}
                  popularPeriod={equipment.popularPeriod || 'weekly'}
                  maxStock={equipment.maxStock}
                  description={equipment.description}
                  category={equipment.category}
                  imageUrl={equipment.imageUrl}
                  images={equipment.images}
                />

                {/* Benefícios Rápidos */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-gray-700">Certificado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-gray-700">
                      Entrega grátis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedMainCard>

        {/* Seção de Descrição e Especificações */}
        <AnimatedSection
          delay={0.1}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Descrição Principal */}
          {equipment.description && (
            <div className="lg:col-span-2">
              <Card className="relative h-full overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                {/* Depth layers para profundidade moderna */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    Sobre este equipamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                    {equipment.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Informações Rápidas */}
          <div>
            <Card className="relative h-full overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
              {/* Depth layers para profundidade moderna */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Categoria</span>
                    <span className="font-semibold text-gray-900">
                      {equipment.category.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">
                      Preço diário
                    </span>
                    <span className="font-bold text-orange-600 text-lg">
                      R$ {pricePerDay.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Status</span>
                    <Badge
                      className={`text-sm px-3 py-1 shadow-sm ${equipment.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {equipment.available ? 'Disponível' : 'Indisponível'}
                    </Badge>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <h4 className="font-semibold text-base text-gray-900">
                    Incluído na locação:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-lg border border-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700 font-medium">
                        Manutenção preventiva
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">
                        Suporte técnico 24h
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700 font-medium">
                        Entrega e retirada
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Seção de Confiança Premium */}
        <AnimatedSection delay={0.2}>
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white mb-8 hover:shadow-2xl transition-all duration-300">
            {/* Depth layers para profundidade moderna */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-transparent to-gray-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-700/10 to-slate-800/30"></div>

            <CardContent className="relative z-10 p-8 lg:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3">
                  Por que escolher a GB Locações?
                </h3>
                <p className="text-gray-300 text-sm">
                  Mais de 10 anos de experiência no mercado
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedBenefit delay={0.3} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    Equipamentos Certificados
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Todos os equipamentos passam por rigorosa inspeção e possuem
                    certificações de segurança
                  </p>
                </AnimatedBenefit>

                <AnimatedBenefit delay={0.4} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    Entrega Rápida
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Entrega no mesmo dia para região metropolitana de Porto
                    Alegre
                  </p>
                </AnimatedBenefit>

                <AnimatedBenefit delay={0.5} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    Suporte 24h
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Equipe técnica disponível 24 horas para suporte e
                    emergências
                  </p>
                </AnimatedBenefit>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </main>
  )
}
