'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePublicSettings } from '@/hooks/use-public-settings'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactSection() {
  const { settings } = usePublicSettings()

  // Funções de formatação
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    if (numbers.length <= 12)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatCPF(e.target.value)
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatCNPJ(e.target.value)
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatCEP(e.target.value)
  }

  return (
    <section className="py-16 bg-gray-50">
      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="section-subtitle text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para atender sua necessidade de equipamentos para
            construção civil. Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="contact-form shadow-xl hover:shadow-2xl transition-all duration-500 border-0">
            <CardContent className="p-6 pt-8 lg:p-8">
              <h3 className="text-2xl font-semibold mb-6">
                Solicite um Orçamento de Equipamentos
              </h3>
              <form className="space-y-6" suppressHydrationWarning>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                    >
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Seu nome completo"
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                    >
                      Telefone *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(51) 99999-9999"
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                    >
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="cep"
                      className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                    >
                      CEP
                    </label>
                    <Input
                      id="cep"
                      name="cep"
                      placeholder="00000-000"
                      maxLength={9}
                      onChange={handleCEPChange}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                  >
                    Empresa/Construtora
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Nome da sua empresa ou construtora"
                    className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label
                      htmlFor="cpf"
                      className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                    >
                      CPF
                    </label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      maxLength={14}
                      onChange={handleCPFChange}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="cnpj"
                      className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                    >
                      CNPJ
                    </label>
                    <Input
                      id="cnpj"
                      name="cnpj"
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                      onChange={handleCNPJChange}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                  >
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Descreva sua necessidade, período de locação, local da obra, altura necessária..."
                    className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg h-12"
                >
                  Enviar Solicitação
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="contact-info space-y-8">
            <Card className="contact-card shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      Telefone
                    </h4>
                    <p className="text-gray-600 mb-1">
                      {settings.companyPhone}
                    </p>
                    <p className="text-gray-600">{settings.whatsappNumber}</p>
                    <p className="text-sm text-orange-600 mt-2">
                      Atendimento especializado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      E-mail
                    </h4>
                    <p className="text-gray-600 mb-1">
                      contato@locacoesgb.com.br
                    </p>
                    <p className="text-gray-600">comercial@locacoesgb.com.br</p>
                    <p className="text-sm text-orange-600 mt-2">
                      Resposta rápida garantida
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      Endereço
                    </h4>
                    <p className="text-gray-600 mb-1">
                      Travessa Doutor Heinzelmann, 365
                      <br />
                      Humaitá - Porto Alegre/RS
                    </p>
                    <p className="text-sm text-orange-600 mt-2">
                      Entregamos em toda região
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      Horário de Funcionamento
                    </h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Segunda a Sexta: 8h às 18h</p>
                      <p>Sábado: 8h às 12h</p>
                      <p className="text-sm text-orange-600 mt-2">
                        CNPJ: 34.780.330/0001-69
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
