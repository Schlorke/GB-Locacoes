import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-600 text-white p-2 rounded-lg font-bold text-h3">
                GB
              </div>
              <div>
                <div className="font-bold text-h3">GB Locações</div>
                <div className="text-small text-gray-400">
                  Equipamentos para Construção
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Há 10 anos oferecendo soluções em locação de equipamentos para
              construção civil. Especializada em equipamentos para obras e
              serviços em altura com segurança e qualidade.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-h3 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalogo"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Catálogo de Equipamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  href="/orcamento"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Solicitar Orçamento
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Equipamentos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalogo/andaimes-suspensos"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Andaimes Suspensos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/cadeiras-eletricas"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Cadeiras Elétricas
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/andaimes-tubulares"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Andaimes Tubulares
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/betoneiras"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Betoneiras
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/rompedores"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Rompedores
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/compressores"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Compressores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-300">(51) 2313-6262</p>
                  <p className="text-gray-300">(51) 99820-5163</p>
                  <p className="text-small text-gray-400">
                    Atendimento especializado
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-300">contato@gblocacoes.com.br</p>
                  <p className="text-small text-gray-400">
                    Resposta rápida garantida
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    Travessa Doutor Heinzelmann, 365
                    <br />
                    Humaitá - Porto Alegre/RS
                  </p>
                  <p className="text-small text-gray-400">
                    Entregamos em toda região
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-300">Seg-Sex: 8h às 18h</p>
                  <p className="text-gray-300">Sáb: 8h às 12h</p>
                  <p className="text-small text-gray-400">
                    CNPJ: 34.780.330/0001-69
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-small">
              © 2024 GB Locações. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacidade"
                className="text-gray-400 hover:text-orange-500 text-small transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-gray-400 hover:text-orange-500 text-small transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-orange-500 text-small transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
