'use client'

import { motion } from 'framer-motion'
import {
  FileText as FileTextIcon,
  FileText,
  ChevronRight,
  Mail,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'

const sections = [
  { id: 'introducao', title: 'Introdução' },
  { id: 'servicos', title: 'Uso dos Serviços' },
  { id: 'responsabilidades', title: 'Responsabilidades do Cliente' },
  { id: 'pagamentos', title: 'Pagamentos e Prazos' },
  { id: 'cancelamentos', title: 'Cancelamentos e Devoluções' },
  { id: 'limitacoes', title: 'Limitações de Responsabilidade' },
  { id: 'propriedade', title: 'Propriedade Intelectual' },
  { id: 'alteracoes', title: 'Alterações nos Termos' },
  { id: 'contato', title: 'Contato' },
]

export default function TermosPage() {
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
                        <FileTextIcon className="w-8 h-8 text-white" />
                      </div>
                      <h1 className="text-3xl font-bold leading-tight">
                        Termos e Condições de Uso
                      </h1>
                      <p className="text-[18px] text-white leading-relaxed max-w-2xl mx-auto">
                        Conheça as regras e condições para utilizar nossos
                        serviços
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
                              Bem-vindo aos Termos e Condições de Uso da GB
                              Locações. Ao utilizar nossos serviços, você
                              concorda com estes termos. Por favor, leia-os
                              cuidadosamente antes de utilizar nosso site e
                              serviços.
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
                              Estes Termos e Condições de Uso regulam o uso do
                              site e dos serviços oferecidos pela GB Locações.
                              Ao acessar e utilizar nossos serviços, você
                              declara ter lido, compreendido e concordado em
                              estar vinculado a estes termos.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              Se você não concordar com qualquer parte destes
                              termos, não deve utilizar nossos serviços.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="servicos"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">2.</span>
                            Uso dos Serviços
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              A GB Locações oferece serviços de locação de
                              equipamentos para construção civil. Ao utilizar
                              nossos serviços, você concorda em:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>
                                Fornecer informações verdadeiras, precisas e
                                completas
                              </li>
                              <li>
                                Manter a confidencialidade de suas credenciais
                                de acesso
                              </li>
                              <li>
                                Utilizar os equipamentos apenas para os fins
                                apropriados e legais
                              </li>
                              <li>
                                Respeitar todas as normas de segurança
                                aplicáveis aos equipamentos
                              </li>
                              <li>
                                Não violar quaisquer leis ou regulamentos
                                aplicáveis
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="responsabilidades"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">3.</span>
                            Responsabilidades do Cliente
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              O cliente é responsável por:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>
                                Conservar os equipamentos em bom estado durante
                                o período de locação
                              </li>
                              <li>
                                Devolver os equipamentos no prazo estipulado e
                                nas mesmas condições em que foram entregues
                              </li>
                              <li>
                                Comunicar imediatamente qualquer dano, defeito
                                ou problema com o equipamento
                              </li>
                              <li>
                                Arcar com custos de reparo ou substituição em
                                caso de danos causados por uso inadequado
                              </li>
                              <li>
                                Garantir que apenas pessoas qualificadas operem
                                os equipamentos
                              </li>
                              <li>
                                Manter seguro adequado para os equipamentos
                                durante o período de locação
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="pagamentos"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">4.</span>
                            Pagamentos e Prazos
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Os pagamentos devem ser realizados conforme
                              acordado no contrato de locação. As formas de
                              pagamento aceitas incluem:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>PIX</li>
                              <li>Cartão de crédito</li>
                              <li>Cartão de débito</li>
                              <li>Boleto bancário</li>
                              <li>Transferência bancária</li>
                            </ul>
                            <p className="text-[16px] text-gray-700">
                              O não pagamento dentro do prazo estabelecido pode
                              resultar em:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>
                                Cobrança de multa e juros conforme contrato
                              </li>
                              <li>Suspensão dos serviços</li>
                              <li>
                                Inclusão do nome em órgãos de proteção ao
                                crédito
                              </li>
                              <li>
                                Ações legais para recuperação do valor devido
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="cancelamentos"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">5.</span>
                            Cancelamentos e Devoluções
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Cancelamentos devem ser solicitados com
                              antecedência mínima de 48 horas. Política de
                              cancelamento:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>
                                Cancelamento com mais de 48h de antecedência:
                                reembolso integral
                              </li>
                              <li>
                                Cancelamento entre 24h e 48h: cobrança de 50% do
                                valor
                              </li>
                              <li>
                                Cancelamento com menos de 24h: cobrança integral
                              </li>
                            </ul>
                            <p className="text-[16px] text-gray-700">
                              Devoluções antecipadas não geram direito a
                              reembolso proporcional, exceto em casos de defeito
                              do equipamento comprovado.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="limitacoes"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">6.</span>
                            Limitações de Responsabilidade
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              A GB Locações não se responsabiliza por:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                              <li>
                                Danos causados por uso inadequado ou negligente
                                dos equipamentos
                              </li>
                              <li>
                                Acidentes ou lesões decorrentes da operação dos
                                equipamentos
                              </li>
                              <li>
                                Perdas ou danos indiretos, incluindo lucros
                                cessantes
                              </li>
                              <li>
                                Atrasos na entrega causados por fatores externos
                                ou força maior
                              </li>
                              <li>
                                Incompatibilidade dos equipamentos com
                                necessidades específicas não informadas
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="propriedade"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">7.</span>
                            Propriedade Intelectual
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Todo o conteúdo presente neste site, incluindo mas
                              não limitado a textos, gráficos, logos, ícones,
                              imagens, fotografias, vídeos e software, é
                              propriedade da GB Locações ou de seus fornecedores
                              de conteúdo e é protegido por leis de direitos
                              autorais.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              É proibida a reprodução, distribuição ou
                              modificação de qualquer conteúdo sem autorização
                              prévia por escrito.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        id="alteracoes"
                        className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 scroll-mt-32"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-30"></div>
                        <CardContent className="relative z-10 p-6 md:p-8">
                          <h2 className="text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="text-orange-600">8.</span>
                            Alterações nos Termos
                          </h2>
                          <div className="space-y-4 leading-relaxed">
                            <p className="text-[16px] text-gray-700">
                              Reservamo-nos o direito de modificar estes Termos
                              e Condições a qualquer momento. Alterações
                              significativas serão comunicadas aos usuários
                              registrados por e-mail.
                            </p>
                            <p className="text-[16px] text-gray-700">
                              O uso continuado dos serviços após a publicação de
                              alterações constitui aceitação dos novos termos.
                            </p>
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
                            <span className="text-orange-600">9.</span>
                            Contato
                          </h2>
                          <div className="space-y-4">
                            <p className="text-[16px] text-gray-700 leading-relaxed">
                              Para dúvidas sobre estes Termos e Condições, entre
                              em contato:
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
                                    Estamos à disposição para esclarecer
                                    quaisquer dúvidas.
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
