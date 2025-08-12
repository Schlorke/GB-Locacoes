'use client'

import ContactForm from '@/components/contact-form'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  Award,
  Building2,
  Calendar,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'

export default function ContatoPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      main: '(51) 2313-6262',
      subtitle: 'Atendimento de segunda a sexta',
      color: 'orange',
      delay: 0.1,
    },
    {
      icon: Mail,
      title: 'E-mail',
      main: 'contato@gblocacoes.com.br',
      subtitle: 'Resposta em até 24 horas',
      color: 'blue',
      delay: 0.2,
    },
    {
      icon: MapPin,
      title: 'Endereço',
      main: 'Travessa Doutor Heinzelmann, 365',
      subtitle: 'Humaitá - Porto Alegre/RS - CEP: 91040-020',
      color: 'green',
      delay: 0.3,
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      main: 'Segunda a Sexta: 8h às 18h',
      subtitle: 'Sábado: 8h às 12h • Domingo: Fechado',
      color: 'purple',
      delay: 0.4,
    },
  ]

  const services = [
    {
      icon: Headphones,
      title: 'Atendimento Especializado',
      description: 'Consultoria técnica para escolha dos equipamentos ideais',
    },
    {
      icon: Calendar,
      title: 'Agendamento Flexível',
      description: 'Entrega e coleta nos horários que funcionam para você',
    },
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Equipamentos revisados e com certificação de segurança',
    },
  ]

  const stats = [
    { number: '10+', label: 'Anos de Experiência' },
    { number: '500+', label: 'Projetos Realizados' },
    { number: '50+', label: 'Equipamentos Disponíveis' },
    { number: '24h', label: 'Suporte Técnico' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header com gradiente - seguindo padrão das outras páginas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MessageCircle className="w-6 h-6 text-orange-100" />
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
                  Entre em Contato
                </h1>
              </div>
              <p className="text-orange-100 mb-6 font-medium text-base max-w-2xl mx-auto leading-relaxed">
                Estamos prontos para atender você e tornar seu projeto
                realidade. Fale conosco e descubra as melhores soluções em
                locação de equipamentos.
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {stats.map((stat, _index) => (
                  <div
                    key={stat.label}
                    className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                  >
                    <div className="text-white font-bold text-base">
                      {stat.number}
                    </div>
                    <div className="text-orange-100 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primeira linha - Formulário e Informações de Contato com mesma altura */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
          {/* Formulário de Contato - Coluna Principal Esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                  Solicite um Orçamento
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Preencha o formulário e receba nossa melhor proposta
                </p>
              </CardHeader>
              <CardContent className="relative z-10">
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>

          {/* Informações de Contato - Sidebar Direita */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  Informações de Contato
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Múltiplos canais para facilitar seu atendimento
                </p>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 gap-4">
                  {contactInfo.map((info, _index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: info.delay }}
                      className="relative overflow-hidden bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group border border-gray-100"
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/20"></div>

                      <div className="relative z-10 flex items-start space-x-3">
                        <div
                          className={`bg-gradient-to-br from-${info.color}-100 to-${info.color}-50 p-2.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300`}
                        >
                          <info.icon
                            className={`h-5 w-5 text-${info.color}-600`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 text-lg group-hover:text-orange-600 transition-colors">
                            {info.title}
                          </h3>
                          <p className="text-gray-800 font-medium text-sm leading-relaxed">
                            {info.main}
                          </p>
                          <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                            {info.subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Segunda linha - Outros blocos empilhados */}
        <div className="space-y-6">
          {/* Nossos Diferenciais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Users className="h-5 w-5 text-orange-600" />
                  Nossos Diferenciais
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  O que nos torna únicos no mercado de locação
                </p>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((service, _index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + _index * 0.1 }}
                      className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-25 rounded-lg hover:from-orange-100 hover:to-orange-50 transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg group-hover:text-orange-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Área de Atendimento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

              <CardContent className="relative z-10 p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-orange-100" />
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  Atendimento Especializado em Toda Região
                </h3>
                <p className="text-orange-100 mb-4 text-base max-w-xl mx-auto leading-relaxed">
                  Nossa equipe técnica está pronta para orientar sobre o melhor
                  equipamento para seu projeto, com entrega em toda região
                  metropolitana de Porto Alegre.
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-3 py-1"
                  >
                    Consultoria Gratuita
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-3 py-1"
                  >
                    Entrega Rápida
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-3 py-1"
                  >
                    Suporte 24h
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
