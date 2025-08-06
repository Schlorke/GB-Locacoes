'use client'

import { motion } from 'framer-motion'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import { memo } from 'react'
import { MiniCarousel } from './mini-carousel'

interface CompanyInfoPreviewProps {
  data: {
    name?: string
    description?: string
    address?: string
    phone?: string
    email?: string
    businessHours?: Record<
      string,
      { open: string; close: string; isOpen: boolean }
    >
  }
}

export const CompanyInfoPreview = memo(function CompanyInfoPreview({
  data,
}: CompanyInfoPreviewProps) {
  const { name, description, address, phone, email, businessHours } = data

  const today = new Date()
    .toLocaleDateString('pt-BR', { weekday: 'long' })
    .toLowerCase()
  const _todaySchedule = businessHours?.[today]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header da empresa */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {name || 'Nome da Empresa'}
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {description || 'Descrição da empresa aparecerá aqui...'}
            </p>
          </div>
        </div>
      </div>

      {/* Informações de contato */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-700">
            {address || 'Endereço da empresa'}
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-700">
            {phone || '(00) 00000-0000'}
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-red-500" />
          <span className="text-sm text-gray-700">
            {email || 'contato@empresa.com'}
          </span>
        </div>
      </div>

      {/* Horário de funcionamento */}
      {businessHours && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">
            Horário de Funcionamento
          </h4>
          <div className="space-y-2">
            {Object.entries(businessHours).map(([day, schedule]) => (
              <div
                key={day}
                className={`flex justify-between text-sm ${
                  day === today ? 'font-medium text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="capitalize">{day}:</span>
                <span>
                  {schedule.isOpen
                    ? `${schedule.open} - ${schedule.close}`
                    : 'Fechado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
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
    </motion.div>
  )
})

interface HeroCarouselPreviewProps {
  data: {
    heroCarousel?: Array<{
      image: string
      title: string
      subtitle: string
      ctaText: string
      ctaLink: string
    }>
  }
}

export const HeroCarouselPreview = memo(function HeroCarouselPreview({
  data,
}: HeroCarouselPreviewProps) {
  const { heroCarousel = [] } = data

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-gray-900">Hero Carousel</h3>

      {heroCarousel.length === 0 ? (
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Configure o carousel principal</span>
        </div>
      ) : (
        <div className="space-y-4">
          <MiniCarousel
            images={heroCarousel.map((item) => item.image).filter(Boolean)}
            height={200}
            className="rounded-lg"
          />

          {/* Informações do slide atual */}
          {heroCarousel[0] && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-gray-900">
                {heroCarousel[0].title || 'Título do slide'}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {heroCarousel[0].subtitle || 'Subtítulo do slide'}
              </p>
              {heroCarousel[0].ctaText && (
                <div className="mt-3">
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-xs">
                    {heroCarousel[0].ctaText}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            {heroCarousel.length} slide(s) configurado(s)
          </div>
        </div>
      )}
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-gray-900">Preview SEO</h3>

      {/* Simulação do resultado do Google */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          {favicon && <img src={favicon} alt="Favicon" className="w-4 h-4" />}
          <span className="text-green-600 text-sm">gblocacoes.com.br</span>
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
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
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
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
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
            <p className="text-xs text-gray-600 mt-1">ID: {facebookPixelId}</p>
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
            <span className="text-sm font-medium">JavaScript Customizado</span>
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
    </motion.div>
  )
})
