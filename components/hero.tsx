'use client'

import { Autocomplete } from '@/components/ui/autocomplete'
import { usePublicSettings } from '@/hooks/use-public-settings'
import { ArrowRight, MapPin, Phone, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()
  const { settings } = usePublicSettings()

  const handleEquipmentSelect = (equipment: { id: string; name: string }) => {
    // Sempre que onSelect for chamado (seja por seleção ou clique na lupa com item selecionado)
    // redireciona para a página de detalhes do equipamento
    if (equipment.id) {
      router.push(`/equipamentos/${equipment.id}`)
    }
  }

  const handleSearch = (query: string) => {
    // Chamado apenas quando não há equipamento selecionado
    // Redireciona para a página de equipamentos com a busca por texto
    router.push(`/equipamentos?search=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white">
      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0">
              Locação de Equipamentos para{' '}
              <span className="text-yellow-300 relative">
                Construção Civil
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300 rounded-full transform scale-x-0 animate-scale-x"></div>
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl leading-relaxed opacity-0">
              {settings.aboutUsText ||
                'Há 10 anos oferecendo soluções em locação de equipamentos para obras e serviços em altura. Segurança, qualidade e manutenção constante.'}
            </p>
            {/* Animated Search Bar with Autocomplete */}
            <div className="hero-search bg-white rounded-2xl p-2 max-w-md border border-white/20 transition-all duration-300 relative z-[9998] opacity-0">
              <Autocomplete
                placeholder="Buscar equipamentos (ex: andaime, betoneira)"
                onSelect={handleEquipmentSelect}
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            {/* Hero Buttons - Tamanho reduzido */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 opacity-0">
              {/* Botão Ver Catálogo - Altura padronizada */}
              <Link
                href="/equipamentos"
                className="inline-flex items-center justify-center hover:bg-yellow-600 gap-2 px-6 h-12 bg-yellow-500 hover:text-white text-gray-900 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group text-sm"
              >
                Ver Catálogo de Equipamentos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Botão Solicitar Orçamento - Altura padronizada */}
              <Link
                href="/orcamento"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-white text-sm"
              >
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Solicitar Orçamento
              </Link>
            </div>
            {/* Contact Info with animations */}
            <div className="hero-contact flex flex-col sm:flex-row gap-4 pt-4 text-orange-100 opacity-0">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <Phone className="h-5 w-5 group-hover:animate-bounce" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="sm:hidden">
                    <a
                      href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                      className="hover:underline"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                  <div className="hidden sm:flex sm:items-center sm:gap-2">
                    <a
                      href={`tel:+55${settings.companyPhone.replace(/\D/g, '')}`}
                      className="hover:underline"
                    >
                      {settings.companyPhone}
                    </a>
                    <span>|</span>
                    <a
                      href={`tel:+55${settings.whatsappNumber.replace(/\D/g, '')}`}
                      className="hover:underline"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <MapPin className="h-5 w-5 group-hover:animate-pulse" />
                <span>Entregamos em toda região</span>
              </div>
            </div>
          </div>
          <div className="hero-image relative opacity-0 px-4">
            <div className="relative group bg-transparent">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Equipamentos de construção civil para locação - andaimes suspensos e cadeiras elétricas"
                width={600}
                height={500}
                priority
                className="rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Stats - Ocultos no mobile */}
              <div className="hidden sm:block absolute -bottom-2 -left-2 bg-yellow-500 text-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-bold animate-count-up">+200</div>
                <div className="text-sm font-medium">
                  Equipamentos Disponíveis
                </div>
              </div>
              <div className="hidden sm:block absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm text-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm font-medium">Anos de Experiência</div>
              </div>
              {/* Decorative elements */}
              <div className="absolute inset-[-1rem] border-2 border-white/20 rounded-2xl animate-pulse pointer-events-none transform group-hover:scale-105 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom wave */}
      <div className="relative w-full mt-2 overflow-hidden">
        <svg
          className="relative block w-full h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-gray-50"
          />
        </svg>
      </div>
    </section>
  )
}
