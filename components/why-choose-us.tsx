'use client'

import BlurText from '@/components/ui/blur-text'
import { ScrollStackBenefitCard } from '@/components/ui/scroll-stack-benefit-card'
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack'
import { usePublicSettings } from '@/hooks/use-public-settings'
import { useState } from 'react'
import { Award, Clock, Headphones, Shield, Truck, Users } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Equipamentos Certificados',
    description:
      'Todos os nossos equipamentos possuem certificação e passam por manutenção preventiva constante para garantir segurança total.',
    accentColor: 'from-blue-500 to-blue-600',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida e Eficiente',
    description:
      'Entregamos em toda região de Porto Alegre com logística própria e rastreamento dos equipamentos em tempo real.',
    accentColor: 'from-green-500 to-green-600',
  },
  {
    icon: Clock,
    title: 'Atendimento Especializado',
    description:
      'Atendimento personalizado com profissionais experientes em equipamentos para obras e serviços em altura.',
    accentColor: 'from-purple-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Parceira de Grandes Construtoras',
    description:
      'Atendemos grandes construtoras como Melnick, Cyrela, Joal Teitelbaum, UMA Incorporadora, ABF Developments e outras.',
    accentColor: 'from-orange-500 to-orange-600',
  },
  {
    icon: Award,
    title: '10 Anos de Experiência',
    description:
      'Há 10 anos oferecendo soluções em locação de equipamentos com foco em segurança, qualidade e comprometimento.',
    accentColor: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Headphones,
    title: 'Rastreamento dos Equipamentos',
    description:
      'Sistema de rastreamento que identifica onde cada equipamento está e quando foi feita a última manutenção.',
    accentColor: 'from-red-500 to-red-600',
  },
]

export default function WhyChooseUs() {
  const { settings } = usePublicSettings()
  const [secondLineReady, setSecondLineReady] = useState(false)

  return (
    <section className="bg-gray-900 text-white relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* Title and stack */}
      <div className="relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <BlurText
            text="Por que Escolher a"
            delay={150}
            animateBy="words"
            direction="top"
            className="section-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 justify-center"
            onAnimationCompleteAction={() => setSecondLineReady(true)}
          />
          <BlurText
            text="GB Locações?"
            delay={150}
            animateBy="words"
            direction="top"
            className="section-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 justify-center"
            shouldStartAnimating={secondLineReady}
          />
        </div>

        <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={300}
            itemScale={0.025}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="15%"
            baseScale={0.85}
            blurAmount={0}
            onStackComplete={() => {
              // Stack animation completed
            }}
          >
            {benefits.map((benefit, index) => (
              <ScrollStackItem
                key={benefit.title}
                itemClassName="bg-gradient-to-br from-gray-800/95 to-gray-900/98 backdrop-blur-xl border border-gray-700/50 shadow-[0_0_40px_rgba(234,88,12,0.12)]"
              >
                <ScrollStackBenefitCard
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  accentColor={benefit.accentColor}
                  index={index}
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>

      {/* CTA Section - after scroll stack */}
      <div className="relative z-20 pt-0 pb-8 md:py-16 lg:py-20 bg-gradient-to-b from-transparent via-gray-900/55 to-gray-900">
        {/* Gradient fade mask to blend with cards above - smooth transition */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900 pointer-events-none z-10 backdrop-blur-md" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div
            className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            data-scroll-reveal="true"
            style={{
              backgroundImage: 'url(/cta-background.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: '100% 95%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Badge no canto superior direito - oculta em mobile */}
            <div className="hidden md:inline-flex absolute top-6 right-6 items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
              Orçamento Grátis
            </div>

            <div className="relative z-10 max-w-3xl w-full">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg text-center md:text-left">
                Pronto para <br /> Começar seu Projeto?
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow-md text-center md:text-left mx-auto md:mx-0">
                Solicite um orçamento gratuito e receba nossa proposta
                personalizada. Atendimento com segurança, qualidade e manutenção
                constante dos equipamentos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start w-full">
                <div className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-14 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 group gap-2 shadow-lg">
                  <a
                    href={`tel:+55${settings.companyPhone.replace(/\D/g, '')}`}
                    className="hidden sm:inline"
                  >
                    {settings.companyPhone}
                  </a>
                  <span className="hidden sm:inline text-orange-400">|</span>
                  <a
                    href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                    className=""
                  >
                    {settings.whatsappNumber}
                  </a>
                </div>
                <a
                  href="/orcamento"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-14 bg-yellow-500 text-gray-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Solicitar Orçamento Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
