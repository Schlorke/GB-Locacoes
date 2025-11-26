'use client'

import BlurText from '@/components/ui/blur-text'
import ScrollRevealInit from '@/components/scroll-reveal-init'
import { usePublicSettings } from '@/hooks/use-public-settings'
import { useState } from 'react'

export default function PlaygroundPage() {
  const { settings } = usePublicSettings()
  const [secondLineReady, setSecondLineReady] = useState(false)

  return (
    <>
      <ScrollRevealInit />
      <section className="bg-gray-900 text-white relative overflow-hidden">
        <div className="relative z-20 bg-gray-900 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <BlurText
                text="Por que Escolher a"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-[1.5rem] md:text-[4rem] mb-2 text-white justify-center leading-tight"
                style={{ fontWeight: 'bolder', lineHeight: '1.2' }}
                onAnimationCompleteAction={() => setSecondLineReady(true)}
              />
              <BlurText
                text="GB Locações?"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-[1.5rem] md:text-[4rem] mb-8 text-white justify-center leading-tight"
                style={{ fontWeight: 'bolder', lineHeight: '1.2' }}
                shouldStartAnimating={secondLineReady}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 bg-gray-900 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="cta-section bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Pronto para Começar seu Projeto?
                </h3>
                <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                  Solicite um orçamento gratuito e receba nossa proposta
                  personalizada. Atendimento com segurança, qualidade e
                  manutenção constante dos equipamentos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="inline-flex items-center justify-center px-8 h-12 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 group gap-2">
                    <a
                      href={`tel:+55${settings.companyPhone.replace(/\D/g, '')}`}
                      className="hidden sm:inline group-hover:animate-pulse"
                    >
                      {settings.companyPhone}
                    </a>
                    <span className="hidden sm:inline text-orange-400">|</span>
                    <a
                      href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                      className="group-hover:animate-pulse"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                  <a
                    href="/orcamento"
                    className="inline-flex items-center justify-center px-8 h-12 bg-yellow-500 text-gray-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
                  >
                    Solicitar Orçamento Online
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
