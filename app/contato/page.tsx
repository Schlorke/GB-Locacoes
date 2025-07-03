import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export default function ContatoPage() {
  return (
    <main className="pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-bold text-h1 text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender você. Entre em contato conosco e solicite seu orçamento.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-bold text-h2 text-gray-900 mb-8">Informações de Contato</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefone</h3>
                  <p className="text-gray-600">(51) 2313-6262</p>
                  <p className="text-small text-gray-500">Atendimento de segunda a sexta</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">E-mail</h3>
                  <p className="text-gray-600">contato@gblocacoes.com.br</p>
                  <p className="text-small text-gray-500">Resposta em até 24 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Endereço</h3>
                  <p className="text-gray-600">
                    Travessa Doutor Heinzelmann, 365
                    <br />
                    Humaitá - Porto Alegre/RS
                    <br />
                    CEP: 91040-020
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Horário de Funcionamento</h3>
                  <p className="text-gray-600">
                    Segunda a Sexta: 8h às 18h
                    <br />
                    Sábado: 8h às 12h
                    <br />
                    Domingo: Fechado
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg text-white">
              <h3 className="text-h3 font-bold mb-2">Atendimento Especializado</h3>
              <p className="mb-4">
                Nossa equipe técnica está pronta para orientar sobre o melhor equipamento para seu
                projeto.
              </p>
              <p className="text-small opacity-90">
                Entrega em toda região metropolitana de Porto Alegre
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="font-bold text-h2 text-gray-900 mb-6">Solicite um Orçamento</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
