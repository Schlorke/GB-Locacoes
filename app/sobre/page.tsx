export default function SobrePage() {
  return (
    <main className="pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-bold text-h1 text-gray-900 mb-4">
            Sobre a GB Locações
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Há mais de 10 anos fornecendo equipamentos de qualidade para a
            construção civil em Porto Alegre e região metropolitana.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-bold text-h2 text-gray-900 mb-6">
              Nossa História
            </h2>
            <p className="text-gray-600 mb-4">
              A GB Locações nasceu da necessidade de oferecer equipamentos de
              construção civil com qualidade e confiabilidade para empresas e
              profissionais da região de Porto Alegre.
            </p>
            <p className="text-gray-600 mb-4">
              Com uma frota moderna e bem mantida, atendemos desde pequenas
              reformas até grandes obras, sempre com o compromisso de entregar
              equipamentos em perfeito estado de funcionamento.
            </p>
            <p className="text-gray-600">
              Nossa equipe especializada está sempre pronta para orientar sobre
              o melhor equipamento para cada tipo de trabalho, garantindo
              eficiência e segurança em seus projetos.
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg p-8 text-white">
            <h3 className="text-h3 font-bold mb-4">Nossos Valores</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Qualidade em primeiro lugar
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Atendimento personalizado
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Pontualidade na entrega
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Preços justos e competitivos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                Suporte técnico especializado
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-h2 font-bold text-orange-600">10+</span>
            </div>
            <h3 className="text-h3 font-semibold text-gray-900 mb-2">
              Anos de Experiência
            </h3>
            <p className="text-gray-600">
              Mais de uma década atendendo o mercado da construção civil
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-h2 font-bold text-orange-600">500+</span>
            </div>
            <h3 className="text-h3 font-semibold text-gray-900 mb-2">
              Clientes Satisfeitos
            </h3>
            <p className="text-gray-600">
              Empresas e profissionais que confiam em nossos serviços
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-h2 font-bold text-orange-600">100+</span>
            </div>
            <h3 className="text-h3 font-semibold text-gray-900 mb-2">
              Equipamentos
            </h3>
            <p className="text-gray-600">
              Ampla variedade de equipamentos para todas as necessidades
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
