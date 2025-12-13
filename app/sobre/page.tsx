'use client'

import Equipment3DCarousel, {
  type Equipment3DModel,
} from '@/components/equipment-3d-carousel'
import { Card, CardContent } from '@/components/ui/card'
import { usePublicSettings } from '@/hooks/use-public-settings'
import {
  Award,
  Building,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Shield,
  Target,
  Users,
  Wrench,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const SOBRE_EQUIPMENT_MODELS: Equipment3DModel[] = [
  {
    id: 'compressor',
    name: 'Compressor de Ar',
    modelUrl: '/models/Compressor.glb',
    description: 'Compressores de alta pressão',
  },
  {
    id: 'betoneira',
    name: 'Betoneira',
    modelUrl: '/models/Betoneira.glb',
    description: 'Betoneiras para preparo de concreto',
  },
  {
    id: 'andaime',
    name: 'Andaime',
    modelUrl: '/models/Andaime.glb',
    description: 'Andaimes para trabalhos em altura',
  },
]

const stats = [
  {
    icon: Calendar,
    number: '10+',
    label: 'Anos de Experiência',
    description: 'Mais de uma década atendendo o mercado da construção civil',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Users,
    number: '500+',
    label: 'Clientes Satisfeitos',
    description: 'Empresas e profissionais que confiam em nossos serviços',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Wrench,
    number: '200+',
    label: 'Equipamentos',
    description: 'Ampla variedade de equipamentos para todas as necessidades',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: MapPin,
    number: '50+',
    label: 'Cidades Atendidas',
    description: 'Cobertura em Porto Alegre e região metropolitana',
    color: 'from-purple-500 to-purple-600',
  },
]

const values = [
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Equipamentos modernos e bem mantidos para máxima segurança',
    color: 'orange',
  },
  {
    icon: Clock,
    title: 'Pontualidade',
    description: 'Entregas sempre no prazo acordado',
    color: 'blue',
  },
  {
    icon: Target,
    title: 'Foco no Cliente',
    description: 'Atendimento personalizado para cada necessidade',
    color: 'green',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Comprometimento com a qualidade em todos os serviços',
    color: 'purple',
  },
]

const timeline = [
  {
    year: '2014',
    title: 'Fundação da GB Locações',
    description:
      'Início das atividades com foco em equipamentos para construção civil',
  },
  {
    year: '2017',
    title: 'Expansão da Frota',
    description: 'Ampliação significativa do catálogo de equipamentos',
  },
  {
    year: '2020',
    title: 'Modernização Digital',
    description: 'Implementação de sistemas digitais para melhor atendimento',
  },
  {
    year: '2024',
    title: 'Líder Regional',
    description: 'Consolidação como referência em locação de equipamentos',
  },
]

export default function SobrePage() {
  const [isReady, setIsReady] = useState(false)
  const { settings } = usePublicSettings()

  useEffect(() => {
    // Pequeno delay para garantir que tudo esteja carregado
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`sobre-page min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 transition-opacity duration-300 ${!isReady ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header com gradiente - seguindo padrão das outras páginas */}
        <div className="mb-8">
          <div
            className="sobre-header-block relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl"
            style={{ opacity: 0 }}
          >
            {/* Clean depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h1 className="section-title text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Sobre a GB Locações
              </h1>
              <p className="section-subtitle text-orange-50 mb-4 font-medium">
                Há mais de 10 anos oferecendo soluções em equipamentos para
                construção civil
              </p>
              <div className="hero-search flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit mx-auto">
                <Building className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  Referência em locação de equipamentos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <Card
                  key={stat.label}
                  className="material-card relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group rounded-2xl"
                  style={{ opacity: 0, transform: 'translateY(60px)' }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-2xl`}
                  ></div>

                  <CardContent className="p-6 text-center relative z-10">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Nossa História Section */}
        <div className="mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hero-title">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  A GB Locações nasceu da necessidade de oferecer equipamentos
                  de construção civil com qualidade e confiabilidade para
                  empresas e profissionais da região de Porto Alegre.
                </p>
                <p className="leading-relaxed">
                  Com uma frota moderna e bem mantida, atendemos desde pequenas
                  reformas até grandes obras, sempre com o compromisso de
                  entregar equipamentos em perfeito estado de funcionamento.
                </p>
                <p className="leading-relaxed">
                  Nossa equipe especializada está sempre pronta para orientar
                  sobre o melhor equipamento para cada tipo de trabalho,
                  garantindo eficiência e segurança em seus projetos.
                </p>
              </div>
            </div>

            <div className="hero-image relative px-0 sm:px-0 md:px-8">
              {/* Container do componente 3D com cards flutuantes - estilo da homepage */}
              <div className="hero-image group relative w-full lg:w-[540px] aspect-square mx-auto rounded-2xl">
                {/* Wrapper interno com backdrop-filter, opacity e scale */}
                <div
                  className="hero-image-inner relative h-full w-full rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  style={{
                    opacity: 0,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <Equipment3DCarousel
                    models={SOBRE_EQUIPMENT_MODELS}
                    autoRotate={true}
                    autoRotateInterval={6000}
                    className="transform transition-transform duration-500"
                    height="100%"
                  />
                </div>

                {/* Cards flutuantes posicionados ao redor do componente 3D */}
                {/* Card 1: +200 Equipamentos - Estilo amarelo da homepage - bottom-left */}
                <div
                  className="hero-badge-left hidden sm:block absolute -bottom-2 -left-2 bg-yellow-500 text-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer z-20"
                  style={{ opacity: 0 }}
                >
                  <div className="text-2xl font-bold animate-count-up">
                    +200
                  </div>
                  <div className="text-sm font-medium">
                    Equipamentos Disponíveis
                  </div>
                </div>

                {/* Card 2: 10+ Anos - Estilo branco/laranja da homepage - top-right */}
                <div
                  className="hero-badge-right hidden sm:block absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm text-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer z-20"
                  style={{ opacity: 0 }}
                >
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm font-medium">Anos de Experiência</div>
                </div>

                {/* Card 3: 500+ Clientes - Estilo similar ao segundo - top-left para não conflitar */}
                <div
                  className="hero-badge-top-left hidden sm:block absolute -top-2 -left-2 bg-white/90 backdrop-blur-sm text-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer z-20"
                  style={{ opacity: 0 }}
                >
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm font-medium">
                    Clientes Satisfeitos
                  </div>
                </div>

                {/* Border animado */}
                <div
                  className="hero-border absolute inset-[-1rem] border-2 border-white/20 rounded-2xl animate-pulse pointer-events-none group-hover:scale-105 transform transition-transform duration-600"
                  style={{ opacity: 0 }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Nossos Valores Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="section-subtitle text-gray-600 text-lg max-w-2xl mx-auto">
              Os princípios que nos guiam em cada projeto e relacionamento com
              nossos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={value.title}
                  className="benefit-card relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group h-full rounded-2xl"
                  style={{ opacity: 0, transform: 'translateY(60px)' }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-full bg-${value.color}-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent
                        className={`w-6 h-6 text-${value.color}-600`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl font-bold text-gray-900 mb-4">
              Nossa Jornada
            </h2>
            <p className="section-subtitle text-gray-600 text-lg">
              A evolução da GB Locações ao longo dos anos
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-300 hidden md:block"></div>

            <div className="space-y-8">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="material-card relative flex items-start"
                  style={{ opacity: 0, transform: 'translateY(60px)' }}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg mr-6 relative z-10">
                    {item.year}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden rounded-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card
            className="cta-section relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 shadow-xl"
            style={{ opacity: 0, transform: 'translateY(60px)' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            <CardContent className="relative z-10 p-12 text-center text-white">
              <Building className="w-16 h-16 mx-auto mb-6 text-orange-100" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Pronto para começar seu projeto?
              </h3>
              <p className="text-orange-100 mb-8 text-lg max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos ajudar a tornar
                sua obra mais eficiente e segura.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/orcamento"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Target className="w-5 h-5" />
                  Solicitar Orçamento
                </a>
                <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                  <Phone className="w-5 h-5" />
                  <a
                    href={`tel:+55${settings.companyPhone.replace(/\D/g, '')}`}
                    className="hidden sm:inline hover:underline"
                  >
                    {settings.companyPhone}
                  </a>
                  <span className="hidden sm:inline text-white/70">|</span>
                  <a
                    href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                    className="hover:underline"
                  >
                    {settings.whatsappNumber}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
