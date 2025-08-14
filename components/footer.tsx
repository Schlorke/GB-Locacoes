import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                <span className="text-base font-bold text-white">GB</span>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-orange-400">
                  GB Locações
                </div>
                <div className="text-sm text-gray-400">
                  Equipamentos para Construção
                </div>
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-300">
              Há 10 anos oferecendo soluções em locação de equipamentos para
              construção civil. Especializada em equipamentos para obras e
              serviços em altura com segurança e qualidade.
            </p>
            <div className="flex space-x-3">
              <button
                className="flex items-center justify-center p-2 rounded-md bg-transparent border-none text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600/20 hover:text-orange-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                className="flex items-center justify-center p-2 rounded-md bg-transparent border-none text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600/20 hover:text-orange-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                className="flex items-center justify-center p-2 rounded-md bg-transparent border-none text-gray-300 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600/20 hover:text-orange-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-display text-lg font-bold text-orange-400 mb-2">
              Links Rápidos
            </h3>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/catalogo"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Catálogo de Equipamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  href="/orcamento"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Solicitar Orçamento
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-display text-lg font-bold text-orange-400 mb-2">
              Equipamentos
            </h3>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/catalogo/andaimes-suspensos"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Andaimes Suspensos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/cadeiras-eletricas"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Cadeiras Elétricas
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/andaimes-tubulares"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Andaimes Tubulares
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/betoneiras"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Betoneiras
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/rompedores"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Rompedores
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/compressores"
                  className="inline-block transform transition-all duration-300 ease-in-out text-gray-300 hover:translate-x-1 hover:text-orange-400"
                >
                  Compressores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-display text-lg font-bold text-orange-400 mb-2">
              Contato
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-orange-400 mt-1" />
                <div>
                  <Link
                    href="tel:+5151231362626"
                    className="text-sm text-gray-300 transition-colors duration-300 ease-in-out hover:text-orange-400"
                  >
                    (51) 2313-6262
                  </Link>
                  <br />
                  <Link
                    href="tel:+555199820516"
                    className="text-sm text-gray-300 transition-colors duration-300 ease-in-out hover:text-orange-400"
                  >
                    (51) 99820-5163
                  </Link>
                  <p className="text-sm text-gray-400">
                    Atendimento especializado
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-400 mt-1" />
                <div>
                  <Link
                    href="mailto:contato@gblocacoes.com.br"
                    className="text-sm text-gray-300 transition-colors duration-300 ease-in-out hover:text-orange-400"
                  >
                    contato@gblocacoes.com.br
                  </Link>
                  <p className="text-sm text-gray-400">
                    Resposta rápida garantida
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-300">
                    Travessa Doutor Heinzelmann, 365
                    <br />
                    Humaitá - Porto Alegre/RS
                  </p>
                  <p className="text-sm text-gray-400">
                    Entregamos em toda região
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-orange-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-300">Seg-Sex: 8h às 18h</p>
                  <p className="text-sm text-gray-300">Sáb: 8h às 12h</p>
                  <p className="text-sm text-gray-400">
                    CNPJ: 34.780.330/0001-69
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2024 GB Locações. Todos os direitos reservados.
          </p>
          <div className="mt-4 flex space-x-8 md:mt-0">
            <Link
              href="/privacidade"
              className="text-sm text-gray-400 transition-all duration-300 ease-in-out hover:text-orange-400"
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-sm text-gray-400 transition-all duration-300 ease-in-out hover:text-orange-400"
            >
              Termos
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-400 transition-all duration-300 ease-in-out hover:text-orange-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
