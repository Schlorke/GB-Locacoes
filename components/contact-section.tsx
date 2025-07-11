import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      {/* Container com largura consistente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="section-subtitle text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para atender sua necessidade de equipamentos para construção civil. Fale
            conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="contact-form hover:shadow-xl transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Solicite um Orçamento de Equipamentos</h3>
              <form className="space-y-6">
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

                <div className="group">
                  <label
                    htmlFor="materials"
                    className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors"
                  >
                    Equipamentos de Interesse
                  </label>
                  <Input
                    id="materials"
                    name="materials"
                    placeholder="Ex: andaime suspenso, cadeira elétrica, betoneira"
                    className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                  />
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
            <Card className="contact-card hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      Telefone
                    </h4>
                    <p className="text-gray-600 mb-1">(51) 2313-6262</p>
                    <p className="text-gray-600">(51) 99820-5163</p>
                    <p className="text-sm text-orange-600 mt-2">Atendimento especializado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card hover:shadow-xl transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      E-mail
                    </h4>
                    <p className="text-gray-600 mb-1">contato@gblocacoes.com.br</p>
                    <p className="text-gray-600">comercial@gblocacoes.com.br</p>
                    <p className="text-sm text-orange-600 mt-2">Resposta rápida garantida</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card hover:shadow-xl transition-all duration-500 hover:scale-105 group">
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
                      Entregamos em toda região de Porto Alegre
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card hover:shadow-xl transition-all duration-500 hover:scale-105 group">
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
                      <p className="text-sm text-orange-600 mt-2">CNPJ: 34.780.330/0001-69</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
