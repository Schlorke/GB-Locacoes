'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ChevronRight, FileText, Mail, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'informacoes-coletadas', title: 'Informações que Coletamos' },
  { id: 'como-usamos', title: 'Como Usamos Suas Informações' },
  { id: 'cookies', title: 'Cookies e Tecnologias' },
  { id: 'links-terceiros', title: 'Links para Terceiros' },
  { id: 'consentimento', title: 'Consentimento' },
  { id: 'alteracoes', title: 'Alterações na Política' },
  { id: 'contato', title: 'Contato' },
]

export default function PrivacidadePage() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let closestSection = sections[0]?.id || ''
      let closestDistance = Infinity

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const distanceFromTop = Math.abs(rect.top - 150)

          if (distanceFromTop < closestDistance) {
            closestDistance = distanceFromTop
            closestSection = section.id
          }
        }
      }

      setActiveSection(closestSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com Índice - Estilo Área do Cliente */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-30"></div>

                {/* Header do Índice */}
                <div className="relative z-10 p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      Índice
                    </h3>
                  </div>
                </div>

                {/* Navegação do Índice */}
                <CardContent className="p-0 relative z-10">
                  <nav className="space-y-1 p-4">
                    {sections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`group flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 ${
                            activeSection === section.id
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs ${
                                activeSection === section.id
                                  ? 'text-white'
                                  : 'text-gray-400 group-hover:text-orange-600'
                              }`}
                            >
                              {index + 1}.
                            </span>
                            <span className="text-left">{section.title}</span>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 transition-colors duration-200 ${
                              activeSection === section.id
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-orange-600'
                            }`}
                          />
                        </button>
                      </motion.div>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Conteúdo Principal - Estilo Área do Cliente */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-14 relative z-10">
                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h1 className="text-3xl font-bold leading-tight">
                        Política de Privacidade
                      </h1>
                      <p className="text-[18px] text-white leading-relaxed max-w-2xl mx-auto">
                        Conheça como protegemos e utilizamos seus dados pessoais
                      </p>
                      <p className="text-sm text-orange-100">
                        Última atualização: 23 de Junho de 2025
                      </p>
                    </div>
                  </div>

                  {/* Onda SVG */}
                  <div className="relative w-full overflow-hidden">
                    <svg
                      className="relative block w-full h-6"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        fill="#f9fafb"
                      />
                    </svg>
                  </div>
                </section>

                {/* Conteúdo */}
                <section className="py-12 md:py-16 lg:py-10 relative -mt-20 md:-mt-24">
                  <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="space-y-6">
                      {/* Card de Introdução */}
                      <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                            <p className="text-[16px] leading-relaxed text-gray-700 m-0">
                              A sua privacidade é importante para nós. É
                              política da GB Locações respeitar a sua
                              privacidade em relação a qualquer informação sua
                              que possamos coletar no site GB Locações, e outros
                              sites que possuímos e operamos.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 1 */}
                      <Card
                        id="informacoes-coletadas"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">1.</span>
                            Informações que Coletamos
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Solicitamos informações pessoais apenas quando
                              realmente precisamos delas para lhe fornecer um
                              serviço. Fazemo-lo por meios justos e legais, com
                              o seu conhecimento e consentimento. Também
                              informamos por que estamos coletando e como será
                              usado.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              Apenas retemos as informações coletadas pelo tempo
                              necessário para fornecer o serviço solicitado.
                              Quando armazenamos dados, protegemos dentro de
                              meios comercialmente aceitáveis para evitar perdas
                              e roubos, bem como acesso, divulgação, cópia, uso
                              ou modificação não autorizados.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 2 */}
                      <Card
                        id="como-usamos"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">2.</span>
                            Como Usamos Suas Informações
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Usamos as informações que coletamos de várias
                              maneiras, incluindo para:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>Fornecer, operar e manter nosso site</li>
                              <li>
                                Melhorar, personalizar e expandir nosso site
                              </li>
                              <li>
                                Entender e analisar como você usa nosso site
                              </li>
                              <li>
                                Desenvolver novos produtos, serviços, recursos e
                                funcionalidades
                              </li>
                              <li>
                                Comunicar com você, diretamente ou através de um
                                de nossos parceiros
                              </li>
                              <li>Enviar e-mails</li>
                              <li>Encontrar e prevenir fraudes</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 3 */}
                      <Card
                        id="cookies"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">3.</span>
                            Cookies e Tecnologias
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Usamos cookies e tecnologias semelhantes para
                              rastrear a atividade em nosso site e armazenar
                              certas informações. As tecnologias de rastreamento
                              usadas incluem beacons, tags e scripts para
                              coletar e rastrear informações e para melhorar e
                              analisar nosso serviço.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              Você pode instruir seu navegador a recusar todos
                              os cookies ou a indicar quando um cookie está
                              sendo enviado. No entanto, se você não aceitar
                              cookies, talvez não consiga usar algumas partes do
                              nosso serviço.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 4 */}
                      <Card
                        id="links-terceiros"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">4.</span>
                            Links para Terceiros
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Nosso serviço pode conter links para sites de
                              terceiros que não são operados por nós. Se você
                              clicar em um link de terceiros, será direcionado
                              para o site desse terceiro.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              Recomendamos fortemente que você revise a Política
                              de Privacidade de cada site que visitar. Não temos
                              controle sobre e não assumimos responsabilidade
                              pelo conteúdo, políticas de privacidade ou
                              práticas de sites ou serviços de terceiros.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 5 */}
                      <Card
                        id="consentimento"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">5.</span>
                            Consentimento
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Ao usar nosso site, você consente com nossa
                              política de privacidade e concorda com seus
                              termos. Você tem o direito de retirar seu
                              consentimento a qualquer momento.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 6 */}
                      <Card
                        id="alteracoes"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">6.</span>
                            Alterações na Política
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Podemos atualizar nossa Política de Privacidade de
                              tempos em tempos. Notificaremos você sobre
                              quaisquer alterações, publicando a nova Política
                              de Privacidade nesta página.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              Recomendamos que você revise esta Política de
                              Privacidade periodicamente para quaisquer
                              alterações. As alterações a esta Política de
                              Privacidade são efetivas quando publicadas nesta
                              página.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Seção 7 - Contato */}
                      <Card
                        id="contato"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">7.</span>
                            Contato
                          </h2>
                          <div className="space-y-4">
                            <p className="text-[16px] text-gray-700 leading-relaxed">
                              Se você tiver alguma dúvida sobre esta Política de
                              Privacidade, entre em contato conosco:
                            </p>
                            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white">
                                  <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-[20px] text-gray-900 mb-2">
                                    Entre em Contato
                                  </h3>
                                  <p className="text-[16px] text-gray-700 mb-3">
                                    Nossa equipe está pronta para esclarecer
                                    suas dúvidas sobre privacidade.
                                  </p>
                                  <div className="space-y-2">
                                    <p className="text-[16px] text-gray-700">
                                      <span className="font-medium">
                                        Email:
                                      </span>{' '}
                                      contato@locacoesgb.com.br
                                    </p>
                                    <p className="text-[16px] text-gray-700">
                                      <span className="font-medium">
                                        Telefone:
                                      </span>{' '}
                                      (51) 2313-6262
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
