import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, Clock, Users, Award, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Equipamentos Certificados",
    description:
      "Todos os nossos equipamentos possuem certificação e passam por manutenção preventiva constante para garantir segurança total.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Truck,
    title: "Entrega Rápida e Eficiente",
    description:
      "Entregamos em toda região de Porto Alegre com logística própria e rastreamento dos equipamentos em tempo real.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Clock,
    title: "Atendimento Especializado",
    description:
      "Atendimento personalizado com profissionais experientes em equipamentos para obras e serviços em altura.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Parceira de Grandes Construtoras",
    description:
      "Atendemos grandes construtoras como Melnick, Cyrela, Joal Teitelbaum, UMA Incorporadora, ABF Developments e outras.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Award,
    title: "10 Anos de Experiência",
    description:
      "Há 10 anos oferecendo soluções em locação de equipamentos com foco em segurança, qualidade e comprometimento.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Headphones,
    title: "Rastreamento dos Equipamentos",
    description:
      "Sistema de rastreamento que identifica onde cada equipamento está e quando foi feita a última manutenção.",
    color: "from-red-500 to-red-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background - constrain within bounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 opacity-0">
            Por que Escolher a GB Locações?
          </h2>
          <p className="section-subtitle text-xl text-gray-300 max-w-2xl mx-auto opacity-0">
            Especializada em locação de equipamentos para obras e serviços em
            altura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card
                key={index}
                className="benefit-card bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-750 transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden relative opacity-0"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardContent className="p-6 text-center relative z-10">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative">
                    <IconComponent className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />

                    {/* Pulse ring */}
                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-0 group-hover:opacity-30"></div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="cta-section mt-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden opacity-0">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para Começar seu Projeto?
            </h3>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Solicite um orçamento gratuito e receba nossa proposta
              personalizada. Atendimento com segurança, qualidade e manutenção
              constante dos equipamentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+5551231362"
                className="inline-flex items-center justify-center px-8 h-12 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 group"
              >
                <span className="group-hover:animate-pulse">
                  (51) 2313-6262
                </span>
              </a>
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
    </section>
  );
}
