'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight, Cookie, FileText, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'introducao', title: 'Introdução' },
  { id: 'tipos-cookies', title: 'Tipos de Cookies' },
  { id: 'cookies-essenciais', title: 'Cookies Essenciais' },
  { id: 'cookies-funcionalidade', title: 'Cookies de Funcionalidade' },
  { id: 'cookies-analytics', title: 'Cookies de Analytics' },
  { id: 'gerenciar-cookies', title: 'Como Gerenciar Cookies' },
  { id: 'contato', title: 'Contato' },
]

export default function CookiesPage() {
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
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-30"></div>
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

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
                <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-14 relative z-10">
                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
                        <Cookie className="w-8 h-8 text-white" />
                      </div>
                      <h1 className="text-3xl font-bold leading-tight">
                        Política de Cookies
                      </h1>
                      <p className="text-[18px] text-white leading-relaxed max-w-2xl mx-auto">
                        Entenda como utilizamos cookies para melhorar sua
                        experiência
                      </p>
                      <p className="text-sm text-orange-100">
                        Última atualização: 23 de Junho de 2025
                      </p>
                    </div>
                  </div>
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

                <section className="py-12 md:py-16 lg:py-10 relative -mt-20 md:-mt-24">
                  <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="space-y-6">
                      <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                            <p className="text-[16px] leading-relaxed text-gray-700 m-0">
                              Esta Política de Cookies explica o que são
                              cookies, como os usamos e quais são suas opções em
                              relação aos cookies que utilizamos em nosso site.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="introducao"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-50"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">1.</span>
                            Introdução
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Cookies são pequenos arquivos de texto que são
                              colocados no seu computador ou dispositivo móvel
                              quando você visita um site. Eles são amplamente
                              utilizados para fazer os sites funcionarem, ou
                              funcionarem de forma mais eficiente, bem como para
                              fornecer informações aos proprietários do site.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              Usamos cookies para melhorar sua experiência em
                              nosso site, lembrar suas preferências e entender
                              como você interage com nosso conteúdo.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="tipos-cookies"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">2.</span>
                            Tipos de Cookies
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Utilizamos os seguintes tipos de cookies em nosso
                              site:
                            </p>
                            <div className="grid grid-cols-1 gap-4 mt-6">
                              <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-green-500 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      Cookies Essenciais
                                    </h4>
                                    <p className="text-[16px] text-gray-700">
                                      Necessários para o funcionamento básico do
                                      site
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-5 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border-l-4 border-blue-500">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-blue-500 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      Cookies de Funcionalidade
                                    </h4>
                                    <p className="text-[16px] text-gray-700">
                                      Lembram suas preferências e escolhas
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border-l-4 border-purple-500">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-purple-500 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      Cookies de Analytics
                                    </h4>
                                    <p className="text-[16px] text-gray-700">
                                      Ajudam a entender como você usa o site
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="cookies-essenciais"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">3.</span>
                            Cookies Essenciais
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Estes cookies são estritamente necessários para
                              fornecer serviços disponíveis em nosso site e para
                              usar alguns de seus recursos, como acesso a áreas
                              seguras.
                            </p>
                            <div className="p-4 bg-white rounded-lg border border-green-200">
                              <p className="text-[16px] text-gray-700">
                                <span className="font-medium text-green-700">
                                  Exemplos:
                                </span>{' '}
                                Cookies de autenticação, segurança e
                                gerenciamento de sessão
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="cookies-funcionalidade"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">4.</span>
                            Cookies de Funcionalidade
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Estes cookies nos permitem lembrar as escolhas que
                              você faz quando usa nosso site, como lembrar seus
                              detalhes de login ou preferência de idioma.
                            </p>
                            <div className="p-4 bg-white rounded-lg border border-blue-200">
                              <p className="text-[16px] text-gray-700">
                                <span className="font-medium text-blue-700">
                                  Exemplos:
                                </span>{' '}
                                Preferências de idioma, configurações de
                                exibição e personalizações
                              </p>
                            </div>
                            <p className="text-[16px] text-gray-700">
                              O objetivo destes cookies é proporcionar uma
                              experiência mais personalizada e evitar que você
                              tenha que inserir novamente suas preferências toda
                              vez que usar nosso site.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="cookies-analytics"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">5.</span>
                            Cookies de Analytics
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Estes cookies nos permitem reconhecer e contar o
                              número de visitantes e ver como os visitantes se
                              movem pelo site quando o estão usando.
                            </p>
                            <div className="p-4 bg-white rounded-lg border border-purple-200">
                              <p className="text-[16px] text-gray-700">
                                <span className="font-medium text-purple-700">
                                  Exemplos:
                                </span>{' '}
                                Google Analytics, métricas de performance e
                                análise de comportamento do usuário
                              </p>
                            </div>
                            <p className="text-[16px] text-gray-700">
                              Isso nos ajuda a melhorar a forma como nosso site
                              funciona, por exemplo, garantindo que os usuários
                              encontrem facilmente o que procuram.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="gerenciar-cookies"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">6.</span>
                            Como Gerenciar Cookies
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Você pode controlar e excluir cookies conforme
                              desejar. Você pode excluir todos os cookies que já
                              estão no seu computador e pode configurar a
                              maioria dos navegadores para impedir que sejam
                              colocados.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              No entanto, se você fizer isso, talvez precise
                              ajustar manualmente algumas preferências toda vez
                              que visitar um site e alguns serviços e
                              funcionalidades podem não funcionar.
                            </p>
                            <div className="p-4 bg-white rounded-lg border border-yellow-200 mt-4">
                              <p className="text-[16px] text-gray-700">
                                <span className="font-medium text-yellow-700">
                                  Nota:
                                </span>{' '}
                                Para gerenciar cookies, acesse as configurações
                                do seu navegador
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

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
                              Se você tiver dúvidas sobre nossa Política de
                              Cookies, entre em contato:
                            </p>
                            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white">
                                  <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-[20px] text-gray-900 mb-2">
                                    Entre em Contato
                                  </h3>
                                  <p className="text-[16px] text-gray-700 mb-3">
                                    Estamos prontos para esclarecer suas dúvidas
                                    sobre cookies.
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
                                    <p className="text-[16px] text-gray-700">
                                      <span className="font-medium">
                                        Endereço:
                                      </span>{' '}
                                      Travessa Doutor Heinzelmann, 365 -
                                      Humaitá, Porto Alegre - RS - CEP 90240-100
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
