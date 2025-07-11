import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Phone, MapPin, Play, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0">
              Locação de Equipamentos para{' '}
              <span className="text-yellow-300 relative">
                Construção Civil
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300 rounded-full transform scale-x-0 animate-scale-x"></div>
              </span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-orange-100 leading-relaxed opacity-0">
              Há 10 anos oferecendo soluções em locação de equipamentos para obras e serviços em
              altura. Segurança, qualidade e manutenção constante.
            </p>

            {/* Animated Search Bar */}
            <div className="hero-search bg-white rounded-2xl p-2 flex gap-2 max-w-md border border-white/20 hover:bg-white/95 transition-all duration-300 opacity-0">
              <Input
                type="search"
                placeholder="Buscar equipamentos (ex: andaime, betoneira)"
                className="border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Buscar equipamentos de construção"
              />
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl hover:scale-105 transition-transform h-10"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </div>

            {/* Hero Buttons - Tamanho reduzido */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 opacity-0">
              {/* Botão Ver Catálogo - Altura padronizada */}
              <Link
                href="/equipamentos"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Ver Catálogo de Equipamentos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Botão Solicitar Orçamento - Altura padronizada */}
              <Link
                href="/orcamento"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-white hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group border-2 border-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Solicitar Orçamento
              </Link>
            </div>

            {/* Contact Info with animations */}
            <div className="hero-contact flex flex-col sm:flex-row gap-4 pt-4 text-orange-100 opacity-0">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <Phone className="h-5 w-5 group-hover:animate-bounce" />
                <span>(51) 2313-6262</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <MapPin className="h-5 w-5 group-hover:animate-pulse" />
                <span>Entregamos em toda região de Porto Alegre</span>
              </div>
            </div>
          </div>

          <div className="hero-image relative opacity-0">
            <div className="relative group bg-transparent">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Equipamentos de construção civil para locação - andaimes suspensos e cadeiras elétricas"
                className="rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />

              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-bold animate-count-up">+200</div>
                <div className="text-sm font-medium">Equipamentos Disponíveis</div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm text-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm font-medium">Anos de Experiência</div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-white/20 rounded-2xl scale-110 animate-pulse pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative w-full overflow-hidden">
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
          ></path>
        </svg>
      </div>
    </section>
  );
}
