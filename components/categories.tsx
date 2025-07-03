import { Card, CardContent } from '@/components/ui/card';
import { Hammer, Truck, Wrench, Building, Zap, Container } from 'lucide-react';

const categories = [
  {
    icon: Building,
    title: 'Andaimes Suspensos',
    description:
      'Andaimes suspensos elétricos e manuais para trabalhos em altura com segurança total.',
    color: 'from-blue-500 to-blue-600',
    count: 25,
    href: '/catalogo/andaimes-suspensos',
  },
  {
    icon: Zap,
    title: 'Cadeiras Elétricas',
    description:
      'Cadeiras elétricas e manuais para altura com tecnologia avançada e manutenção constante.',
    color: 'from-yellow-500 to-yellow-600',
    count: 18,
    href: '/catalogo/cadeiras-eletricas',
  },
  {
    icon: Wrench,
    title: 'Andaimes Tubulares',
    description: 'Andaimes tubulares para diversas alturas com certificação e estrutura robusta.',
    color: 'from-red-500 to-red-600',
    count: 35,
    href: '/catalogo/andaimes-tubulares',
  },
  {
    icon: Truck,
    title: 'Betoneiras',
    description: 'Betoneiras de diversos tamanhos para preparo de concreto com eficiência máxima.',
    color: 'from-green-500 to-green-600',
    count: 22,
    href: '/catalogo/betoneiras',
  },
  {
    icon: Hammer,
    title: 'Rompedores',
    description: 'Rompedores pneumáticos e elétricos para demolição e quebra de concreto.',
    color: 'from-purple-500 to-purple-600',
    count: 28,
    href: '/catalogo/rompedores',
  },
  {
    icon: Container,
    title: 'Compressores',
    description: 'Compressores de ar para obras com alta pressão e durabilidade comprovada.',
    color: 'from-indigo-500 to-indigo-600',
    count: 15,
    href: '/catalogo/compressores',
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4 opacity-0">
            Categorias de Equipamentos
          </h2>
          <p className="section-subtitle text-xl text-gray-600 max-w-2xl mx-auto opacity-0">
            Encontre rapidamente o equipamento especializado que você precisa para sua obra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="benefit-card bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden relative opacity-0"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardContent className="p-6 text-center relative z-10">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative">
                    <IconComponent className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />

                    {/* Pulse ring */}
                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-0 group-hover:opacity-30"></div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3">
                    {category.description}
                  </p>

                  <div className="text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                    {category.count} equipamentos disponíveis
                  </div>
                </CardContent>

                {/* Bottom accent line - sempre no fundo */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-0"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
