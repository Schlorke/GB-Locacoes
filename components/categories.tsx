import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Hammer, Truck, HardHat, Wrench, Building, Zap, Shield, Container } from "lucide-react"

const categories = [
  {
    name: "Andaimes Suspensos",
    icon: Building,
    count: 25,
    href: "/catalogo/andaimes-suspensos",
    description: "Andaimes suspensos elétricos e manuais",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Cadeiras Elétricas",
    icon: Zap,
    count: 18,
    href: "/catalogo/cadeiras-eletricas",
    description: "Cadeiras elétricas e manuais para altura",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    name: "Andaimes Tubulares",
    icon: Wrench,
    count: 35,
    href: "/catalogo/andaimes-tubulares",
    description: "Andaimes tubulares para diversas alturas",
    color: "from-red-500 to-red-600",
  },
  {
    name: "Betoneiras",
    icon: Truck,
    count: 22,
    href: "/catalogo/betoneiras",
    description: "Betoneiras de diversos tamanhos",
    color: "from-green-500 to-green-600",
  },
  {
    name: "Rompedores",
    icon: Hammer,
    count: 28,
    href: "/catalogo/rompedores",
    description: "Rompedores pneumáticos e elétricos",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Compressores",
    icon: Container,
    count: 15,
    href: "/catalogo/compressores",
    description: "Compressores de ar para obras",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Equipamentos de Segurança",
    icon: Shield,
    count: 45,
    href: "/catalogo/seguranca",
    description: "EPIs e equipamentos de proteção",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Outros Equipamentos",
    icon: HardHat,
    count: 32,
    href: "/catalogo/outros",
    description: "Diversos equipamentos para obras",
    color: "from-orange-500 to-orange-600",
  },
]

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href} className="group">
                <Card className="category-card h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-focus:ring-2 group-focus:ring-orange-500 overflow-hidden relative opacity-0">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="p-6 text-center relative z-10">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
                      <IconComponent className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />

                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-orange-200 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                      {category.description}
                    </p>

                    <div className="text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                      <span className="inline-block group-hover:scale-110 transition-transform duration-300">
                        {category.count} equipamentos disponíveis
                      </span>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
// Não há botões específicos neste componente, mas se houver no futuro, usar h-12 para padrão
