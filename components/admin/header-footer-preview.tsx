'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { memo } from 'react'

interface HeaderFooterPreviewProps {
  data: {
    logoUrl?: string
    companyPhone?: string
    whatsappNumber?: string
    contactEmail?: string
    marketingEmail?: string
    companyAddress?: string
    aboutUsText?: string
  }
}

export const HeaderFooterPreview = memo(function HeaderFooterPreview({
  data,
}: HeaderFooterPreviewProps) {
  const {
    logoUrl,
    companyPhone,
    whatsappNumber,
    contactEmail,
    marketingEmail,
    companyAddress,
    aboutUsText,
  } = data

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {/* Label de preview */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Preview Header & Footer
        </span>
      </div>

      {/* HEADER PREVIEW */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Top Bar */}
        <div className="bg-slate-700 px-3 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-slate-200" />
              <div className="flex items-center gap-2 text-slate-100">
                <span className="hidden sm:inline">
                  {companyPhone || '(51) 2313-6262'}
                </span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span>{whatsappNumber || '(51) 99820-5163'}</span>
              </div>
            </div>
            <div className="text-slate-200 text-xs hidden md:block">
              Atendimento especializado
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-3 py-2.5 flex items-center gap-3">
          {/* Logo */}
          {logoUrl ? (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
              <Image
                src={logoUrl}
                alt="Logo"
                fill
                className="object-contain p-1"
                unoptimized
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white p-2.5 rounded-xl font-bold text-[15px] shadow-md">
              GB
            </div>
          )}

          {/* Company Name */}
          <div>
            <div className="font-bold text-sm text-slate-800">GB Locações</div>
            <div className="text-xs text-slate-500">
              Equipamentos para Construção
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER PREVIEW */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-lg border border-gray-700 shadow-sm p-4 md:p-5">
        {/* Logo + Nome */}
        <div className="flex items-center gap-3 mb-4">
          {logoUrl ? (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-white">
              <Image
                src={logoUrl}
                alt="Logo"
                fill
                className="object-contain p-1"
                unoptimized
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white p-2.5 rounded-xl font-bold text-[15px] shadow-lg">
              GB
            </div>
          )}
          <div>
            <div className="font-display text-base font-bold text-orange-500">
              GB Locações
            </div>
            <div className="text-xs text-gray-400">
              Equipamentos para Construção
            </div>
          </div>
        </div>

        {/* Grid de Duas Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* COLUNA ESQUERDA: Sobre Nós */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-orange-500">Sobre Nós</h4>
            <p className="text-sm leading-relaxed text-gray-300 line-clamp-3">
              {aboutUsText || 'Sua descrição personalizada aparecerá aqui.'}
            </p>
          </div>

          {/* COLUNA DIREITA: Contato */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-orange-500">Contato</h4>

            <div className="space-y-2.5">
              {/* Telefones */}
              <div className="flex items-start gap-2 group transition-colors duration-300 ease-in-out hover:text-orange-500 cursor-default">
                <Phone className="w-4 h-4 min-w-4 min-h-4 text-orange-500 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-300 text-xs transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                    {companyPhone || '(51) 2313-6262'}
                  </span>
                  <span className="text-gray-300 text-xs transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                    {whatsappNumber || '(51) 99820-5163'}
                  </span>
                </div>
              </div>

              {/* E-mails */}
              <div className="flex items-start gap-2 group transition-colors duration-300 ease-in-out hover:text-orange-500 cursor-default">
                <Mail className="w-4 h-4 min-w-4 min-h-4 text-orange-500 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-300 text-xs truncate transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                    {contactEmail || 'contato@locacoesgb.com.br'}
                  </span>
                  {marketingEmail && (
                    <span className="text-gray-300 text-xs truncate transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                      {marketingEmail}
                    </span>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-2 group transition-colors duration-300 ease-in-out hover:text-orange-500 cursor-default">
                <MapPin className="w-4 h-4 min-w-4 min-h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-xs line-clamp-2 transition-colors duration-300 ease-in-out group-hover:text-orange-500">
                    {companyAddress ||
                      'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            © 2024 GB Locações. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Info adicional */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          💡 <strong>Preview em Tempo Real:</strong> Veja como as informações
          aparecerão no Header (topo do site) e Footer (rodapé) do site. As
          alterações são atualizadas automaticamente.
        </p>
      </div>
    </motion.div>
  )
})
