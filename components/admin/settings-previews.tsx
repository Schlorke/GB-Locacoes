'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { memo } from 'react'
import { HeaderFooterPreview } from './header-footer-preview'
import { HeroCarouselPreview } from './hero-carousel-preview'

interface CompanyInfoPreviewProps {
  data: {
    name?: string
    description?: string
    address?: string
    phone?: string
    email?: string
    marketingEmail?: string
    logoUrl?: string
    businessHours?: Record<
      string,
      { open: string; close: string; isOpen: boolean }
    >
  }
}

export const CompanyInfoPreview = memo(function CompanyInfoPreview({
  data,
}: CompanyInfoPreviewProps) {
  const { name, description, address, phone, email, marketingEmail, logoUrl } =
    data

  return (
    <>
      {/* Card 1: Header & Footer Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className="relative overflow-hidden shadow-xl backdrop-blur-sm"
          style={{
            backgroundColor: 'rgb(248, 250, 252)',
            borderColor: 'rgb(224, 230, 235)',
            borderWidth: '1.5px',
          }}
        >
          <div className="p-4 md:p-5">
            <HeaderFooterPreview
              data={{
                logoUrl,
                companyPhone: phone?.split(' | ')[0],
                whatsappNumber: phone?.split(' | ')[1],
                contactEmail: email,
                marketingEmail,
                companyAddress: address,
                aboutUsText: description,
              }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Card 2: Como aparece no Google */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card
          className="relative overflow-hidden shadow-xl backdrop-blur-sm"
          style={{
            backgroundColor: 'rgb(248, 250, 252)',
            borderColor: 'rgb(224, 230, 235)',
            borderWidth: '1.5px',
          }}
        >
          <div className="p-4 md:p-5 space-y-4">
            {/* Label de preview */}
            <div className="flex items-center gap-2 pb-3 border-b border-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Como aparece no Google
              </span>
            </div>

            {/* Simulação de resultado do Google */}
            <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm">
              {/* Publisher Info */}
              <div className="flex items-center gap-3 mb-3">
                {logoUrl ? (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shadow-md bg-white border border-gray-200">
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      fill
                      className="object-contain p-0.5"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                    GB
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {name || 'GB Locações'}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <span>https://locacoesgb.com.br</span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
              </div>

              {/* Title (blue link) */}
              <h3 className="text-xl font-normal text-blue-600 mb-2 hover:underline cursor-pointer leading-tight">
                {name || 'GB Locações'} - Locação de Equipamentos para
                Construção
              </h3>

              {/* Description/Snippet */}
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {description || 'Sua descrição personalizada aparecerá aqui.'}
              </p>

              {/* Contact Info inline (Google style) */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 pt-3 border-t border-gray-100">
                {phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 min-h-4 min-w-4 flex-shrink-0 text-gray-500" />
                    <span>{phone}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 min-h-4 min-w-4 flex-shrink-0 text-gray-500" />
                    <span className="line-clamp-1">{address}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 min-h-4 min-w-4 flex-shrink-0 text-gray-500" />
                    <span>{email}</span>
                  </div>
                )}
                {marketingEmail && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 min-h-4 min-w-4 flex-shrink-0 text-gray-400" />
                    <span>{marketingEmail} · Automático</span>
                  </div>
                )}
              </div>

              {/* Rating stars (opcional - Google style) */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  4.9 · 500+ avaliações
                </span>
              </div>
            </div>

            {/* Info adicional */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                💡 <strong>Preview SEO:</strong> Este é um exemplo de como as
                informações da sua empresa aparecerão nos resultados de busca do
                Google. Mantenha descrições claras e objetivas.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  )
})

interface SocialLinksPreviewProps {
  data: {
    socialLinks?: Array<{
      platform: string
      url: string
      enabled: boolean
    }>
  }
}

export const SocialLinksPreview = memo(function SocialLinksPreview({
  data,
}: SocialLinksPreviewProps) {
  const { socialLinks = [] } = data
  const enabledLinks = socialLinks.filter((link) => link.enabled && link.url)

  return (
    <Card
      className="relative overflow-hidden shadow-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'rgb(248, 250, 252)',
        borderColor: 'rgb(224, 230, 235)',
        borderWidth: '1.5px',
      }}
    >
      <div className="p-4 md:p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Redes Sociais</h3>

        {enabledLinks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>Configure suas redes sociais</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {enabledLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {link.platform.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {link.platform}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{link.url}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
})

interface SeoPreviewProps {
  data: {
    seoTitle?: string
    seoDescription?: string
    seoKeywords?: string
    favicon?: string
  }
}

export const SeoPreview = memo(function SeoPreview({ data }: SeoPreviewProps) {
  const { seoTitle, seoDescription, seoKeywords, favicon } = data

  return (
    <Card
      className="relative overflow-hidden shadow-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'rgb(248, 250, 252)',
        borderColor: 'rgb(224, 230, 235)',
        borderWidth: '1.5px',
      }}
    >
      <div className="p-4 md:p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Preview SEO</h3>

        {/* Simulação do resultado do Google */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            {favicon && (
              <Image
                src={favicon}
                alt="Favicon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            )}
            <span className="text-green-600 text-sm">locacoesgb.com.br</span>
          </div>

          <h4 className="text-blue-600 text-lg hover:underline cursor-pointer">
            {seoTitle || 'Título SEO da página'}
          </h4>

          <p className="text-gray-600 text-sm mt-1 leading-relaxed">
            {seoDescription ||
              'Meta descrição da página aparecerá aqui. É importante que seja atrativa e contenha as palavras-chave principais...'}
          </p>

          {seoKeywords && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Palavras-chave: </span>
              <span className="text-xs text-gray-600">{seoKeywords}</span>
            </div>
          )}
        </div>

        {/* Métricas SEO */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="text-green-600 text-xs font-medium">Título</div>
            <div className="text-green-700 text-sm">
              {seoTitle?.length || 0}/60 chars
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="text-blue-600 text-xs font-medium">Descrição</div>
            <div className="text-blue-700 text-sm">
              {seoDescription?.length || 0}/160 chars
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
})

interface SystemPreviewProps {
  data: {
    maintenanceMode?: boolean
    allowRegistration?: boolean
    requireEmailVerification?: boolean
    maxQuoteItems?: number
    defaultCurrency?: string
    timezone?: string
  }
}

export const SystemPreview = memo(function SystemPreview({
  data,
}: SystemPreviewProps) {
  const {
    maintenanceMode,
    allowRegistration,
    requireEmailVerification,
    maxQuoteItems,
    defaultCurrency,
    timezone,
  } = data

  return (
    <Card
      className="relative overflow-hidden shadow-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'rgb(248, 250, 252)',
        borderColor: 'rgb(224, 230, 235)',
        borderWidth: '1.5px',
      }}
    >
      <div className="p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Status do Sistema</h3>

        {/* Status cards */}
        <div className="grid grid-cols-1 gap-3">
          <div
            className={`p-3 rounded-lg border ${
              maintenanceMode
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-green-50 border-green-200 text-green-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {maintenanceMode ? '🔧 Modo Manutenção' : '✅ Sistema Online'}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${maintenanceMode ? 'bg-red-400' : 'bg-green-400'}`}
              />
            </div>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              allowRegistration
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {allowRegistration
                  ? '👥 Cadastros Abertos'
                  : '🚫 Cadastros Fechados'}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${
                  allowRegistration ? 'bg-green-400' : 'bg-gray-400'
                }`}
              />
            </div>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              requireEmailVerification
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {requireEmailVerification
                  ? '📧 Verificação Obrigatória'
                  : '⚡ Acesso Direto'}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${
                  requireEmailVerification ? 'bg-blue-400' : 'bg-gray-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Configurações numéricas */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">
              Máx. itens por orçamento:
            </span>
            <span className="text-sm font-medium">{maxQuoteItems || 10}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Moeda padrão:</span>
            <span className="text-sm font-medium">
              {defaultCurrency || 'BRL'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Fuso horário:</span>
            <span className="text-sm font-medium">
              {timezone || 'America/Sao_Paulo'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
})

interface CustomSettingsPreviewProps {
  data: {
    customCss?: string
    customJs?: string
    gtmId?: string
    facebookPixelId?: string
  }
}

export const CustomSettingsPreview = memo(function CustomSettingsPreview({
  data,
}: CustomSettingsPreviewProps) {
  const { customCss, customJs, gtmId, facebookPixelId } = data

  return (
    <Card
      className="relative overflow-hidden shadow-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'rgb(248, 250, 252)',
        borderColor: 'rgb(224, 230, 235)',
        borderWidth: '1.5px',
      }}
    >
      <div className="p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Configurações Avançadas</h3>

        {/* Tracking codes */}
        <div className="grid grid-cols-1 gap-3">
          <div
            className={`p-3 rounded-lg border ${
              gtmId
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Google Tag Manager
              </span>
              <div
                className={`w-3 h-3 rounded-full ${gtmId ? 'bg-green-400' : 'bg-gray-300'}`}
              />
            </div>
            {gtmId && <p className="text-xs text-gray-600 mt-1">ID: {gtmId}</p>}
          </div>

          <div
            className={`p-3 rounded-lg border ${
              facebookPixelId
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Facebook Pixel
              </span>
              <div
                className={`w-3 h-3 rounded-full ${facebookPixelId ? 'bg-blue-400' : 'bg-gray-300'}`}
              />
            </div>
            {facebookPixelId && (
              <p className="text-xs text-gray-600 mt-1">
                ID: {facebookPixelId}
              </p>
            )}
          </div>
        </div>

        {/* Code snippets */}
        <div className="space-y-3">
          <div
            className={`border rounded-lg ${
              customCss
                ? 'border-purple-200 bg-purple-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="px-3 py-2 border-b border-current/20">
              <span className="text-sm font-medium">CSS Customizado</span>
            </div>
            <div className="p-3">
              {customCss ? (
                <pre className="text-xs text-gray-700 overflow-hidden">
                  {customCss.substring(0, 100)}
                  {customCss.length > 100 && '...'}
                </pre>
              ) : (
                <span className="text-xs text-gray-400">
                  Nenhum CSS customizado
                </span>
              )}
            </div>
          </div>

          <div
            className={`border rounded-lg ${
              customJs
                ? 'border-yellow-200 bg-yellow-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="px-3 py-2 border-b border-current/20">
              <span className="text-sm font-medium">
                JavaScript Customizado
              </span>
            </div>
            <div className="p-3">
              {customJs ? (
                <pre className="text-xs text-gray-700 overflow-hidden">
                  {customJs.substring(0, 100)}
                  {customJs.length > 100 && '...'}
                </pre>
              ) : (
                <span className="text-xs text-gray-400">
                  Nenhum JavaScript customizado
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
})
