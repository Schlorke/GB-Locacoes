'use client'

import { getSettings, updateSettings } from '@/app/api/admin/settings/actions'
import { SettingsBlock } from '@/components/admin/settings-block'
import { SettingsNavigationBar } from '@/components/admin/settings-navigation-bar'
import {
  CompanyInfoPreview,
  CustomSettingsPreview,
  HeroCarouselPreview,
  SeoPreview,
  SocialLinksPreview,
  SystemPreview,
} from '@/components/admin/settings-previews'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useToastSonner } from '@/hooks/use-toast-sonner'
import { SettingsInput } from '@/schemas/settings.schema'
import { motion } from 'framer-motion'
import {
  Building2,
  Code,
  Images,
  Loader2,
  Search,
  Settings,
  Share2,
  Upload,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_COMPANY_PHONE = '(51) 2313-6262'
const DEFAULT_WHATSAPP_NUMBER = '(51) 99820-5163'
const DEFAULT_CONTACT_EMAIL = 'contato@locacoesgb.com.br'
const DEFAULT_MARKETING_EMAIL = 'comercial@locacoesgb.com.br'
const DEFAULT_COMPANY_ADDRESS =
  'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100'
const DEFAULT_ABOUT_US_TEXT =
  'Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura.'
const DEFAULT_SEO_TITLE = 'GB Locações - Equipamentos para Construção'
const DEFAULT_SEO_DESCRIPTION =
  'Locação de equipamentos para construção civil com qualidade e segurança'

export default function SettingsPage() {
  const { success, error: errorToast } = useToastSonner()
  // const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [activeSection, setActiveSection] = useState<string>('company')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)

  // Estados de loading por seção
  const [sectionLoading, setSectionLoading] = useState({
    company: false,
    hero: false,
    social: false,
    seo: false,
    system: false,
    custom: false,
  })

  // Estados de reset por seção
  const [sectionResetting, setSectionResetting] = useState({
    company: false,
    hero: false,
    social: false,
    seo: false,
    system: false,
    custom: false,
  })

  const [formData, setFormData] = useState<SettingsInput>({
    companyPhone: DEFAULT_COMPANY_PHONE,
    companyIconUrl: '',
    aboutUsText: DEFAULT_ABOUT_US_TEXT,
    companyAddress: DEFAULT_COMPANY_ADDRESS,
    heroCarousel: [],
    contactEmail: DEFAULT_CONTACT_EMAIL,
    marketingEmail: DEFAULT_MARKETING_EMAIL,
    socialLinks: {},
    seoTitle: DEFAULT_SEO_TITLE,
    seoDescription: DEFAULT_SEO_DESCRIPTION,
    themeColorPrimary: '#ea580c',
    maintenanceMode: false,
    analyticsTrackingId: '',
    footerText: '',
    businessHours: {},
    supportChat: true,
    whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
    favicon: '',
    logoSecondary: '',
    defaultLanguage: 'pt-BR',
    baseCurrency: 'BRL',
    maintenanceMessage: '',
    smtpConfig: {},
    uploadLimits: {},
    securityConfig: {},
    customCss: '',
    customJs: '',
  })

  // Carregar dados iniciais
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await getSettings()
        if (result.success && result.data) {
          setFormData({
            companyPhone: result.data.companyPhone || DEFAULT_COMPANY_PHONE,
            companyIconUrl: result.data.companyIconUrl || '',
            aboutUsText: result.data.aboutUsText || DEFAULT_ABOUT_US_TEXT,
            companyAddress:
              result.data.companyAddress || DEFAULT_COMPANY_ADDRESS,
            heroCarousel:
              (result.data.heroCarousel as Array<{
                imageUrl: string
                id?: string
                title?: string
                description?: string
                link?: string
                order?: number
              }>) || [],
            contactEmail: result.data.contactEmail || DEFAULT_CONTACT_EMAIL,
            marketingEmail:
              result.data.marketingEmail || DEFAULT_MARKETING_EMAIL,
            socialLinks:
              (result.data.socialLinks as {
                facebook?: string
                instagram?: string
                linkedin?: string
                whatsapp?: string
                youtube?: string
                twitter?: string
              }) || {},
            seoTitle: result.data.seoTitle || DEFAULT_SEO_TITLE,
            seoDescription:
              result.data.seoDescription || DEFAULT_SEO_DESCRIPTION,
            themeColorPrimary: result.data.themeColorPrimary || '#ea580c',
            maintenanceMode: result.data.maintenanceMode || false,
            analyticsTrackingId: result.data.analyticsTrackingId || '',
            footerText: result.data.footerText || '',
            businessHours:
              (result.data.businessHours as {
                monday?: { closed: boolean; open?: string; close?: string }
                tuesday?: { closed: boolean; open?: string; close?: string }
                wednesday?: { closed: boolean; open?: string; close?: string }
                thursday?: { closed: boolean; open?: string; close?: string }
                friday?: { closed: boolean; open?: string; close?: string }
                saturday?: { closed: boolean; open?: string; close?: string }
                sunday?: { closed: boolean; open?: string; close?: string }
              }) || {},
            supportChat: result.data.supportChat !== false,
            whatsappNumber:
              result.data.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
            favicon: result.data.favicon || '',
            logoSecondary: result.data.logoSecondary || '',
            defaultLanguage: result.data.defaultLanguage || 'pt-BR',
            baseCurrency: result.data.baseCurrency || 'BRL',
            maintenanceMessage: result.data.maintenanceMessage || '',
            smtpConfig:
              (result.data.smtpConfig as {
                host?: string
                port?: number
                secure?: boolean
                username?: string
                password?: string
                fromEmail?: string
                fromName?: string
              }) || {},
            uploadLimits:
              (result.data.uploadLimits as {
                maxFileSize?: number
                allowedTypes?: string[]
                maxFiles?: number
              }) || {},
            securityConfig:
              (result.data.securityConfig as {
                enableRecaptcha?: boolean
                recaptchaSiteKey?: string
                recaptchaSecretKey?: string
                enable2FA?: boolean
                sessionTimeout?: number
                maxLoginAttempts?: number
              }) || {},
            customCss: result.data.customCss || '',
            customJs: result.data.customJs || '',
          })
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
        errorToast('Erro', 'Não foi possível carregar as configurações.')
      } finally {
        setIsLoadingData(false)
      }
    }

    loadSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // setIsLoading(true)

  //   try {
  //     const result = await updateSettings(formData)

  //     if (result.success) {
  //       toast({
  //         title: 'Sucesso!',
  //         description:
  //           result.message || 'Configurações atualizadas com sucesso.',
  //       })
  //     } else {
  //       toast({
  //         title: 'Erro',
  //         description: result.error || 'Erro ao atualizar configurações.',
  //         variant: 'destructive',
  //       })
  //     }
  //   } catch (error) {
  //     console.error('Erro ao salvar:', error)
  //     toast({
  //       title: 'Erro',
  //       description: 'Erro interno do servidor.',
  //       variant: 'destructive',
  //     })
  //   } finally {
  //     // setIsLoading(false)
  //   }
  // }

  const updateField = (field: keyof SettingsInput, value: unknown) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [field]: value,
      }

      if (field === 'aboutUsText') {
        const textValue =
          typeof value === 'string' && value.trim().length > 0
            ? value
            : DEFAULT_ABOUT_US_TEXT
        const shouldSyncSeoDescription =
          !prev.seoDescription ||
          prev.seoDescription === prev.aboutUsText ||
          prev.seoDescription === DEFAULT_SEO_DESCRIPTION
        if (shouldSyncSeoDescription) {
          next.seoDescription = textValue
        }
      }

      return next
    })
  }

  // Função para formatar número de telefone
  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '')

    // Limita a 11 dígitos (DDD + 9 dígitos para celular)
    const limitedNumbers = numbers.slice(0, 11)

    // Aplica a máscara
    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`
    }
  }

  // Handler específico para campos de telefone
  const handlePhoneChange = (field: keyof SettingsInput, value: string) => {
    const formattedValue = formatPhoneNumber(value)
    updateField(field, formattedValue)
  }

  // Função para fazer upload do logo
  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      errorToast('Erro', 'Por favor, selecione um arquivo de imagem válido.')
      return
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      errorToast('Erro', 'A imagem deve ter no máximo 5MB.')
      return
    }

    setIsUploadingLogo(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'logo')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro ao fazer upload')
      }

      const data = await response.json()

      // Atualizar URL do logo
      updateField('companyIconUrl', data.url)

      success('Sucesso!', 'Logo enviado com sucesso.')
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      errorToast('Erro', 'Não foi possível fazer upload da imagem.')
    } finally {
      setIsUploadingLogo(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Função para remover logo
  const handleRemoveLogo = () => {
    updateField('companyIconUrl', '')
    success('Logo removido', 'O logo foi removido com sucesso.')
  }

  // Funções específicas para salvar cada seção
  const saveSection = async (section: keyof typeof sectionLoading) => {
    setSectionLoading((prev) => ({ ...prev, [section]: true }))

    try {
      const result = await updateSettings(formData)

      if (result.success) {
        success(
          'Sucesso!',
          `Configurações de ${getSectionName(section)} atualizadas com sucesso.`
        )
      } else {
        errorToast('Erro', result.error || 'Erro ao atualizar configurações.')
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      errorToast('Erro', 'Erro interno do servidor.')
    } finally {
      setSectionLoading((prev) => ({ ...prev, [section]: false }))
    }
  }

  const getSectionName = (section: string) => {
    const names = {
      company: 'empresa',
      hero: 'carrossel',
      social: 'redes sociais',
      seo: 'SEO',
      system: 'sistema',
      custom: 'personalização',
    }
    return names[section as keyof typeof names] || section
  }

  // Funções de reset por seção
  const resetSection = async (section: keyof typeof sectionResetting) => {
    setSectionResetting((prev) => ({ ...prev, [section]: true }))

    try {
      // Simula um delay para mostrar a animação
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const defaults = getDefaultValues(section)
      setFormData((prev) => ({ ...prev, ...defaults }))

      success(
        'Configurações resetadas',
        `Configurações de ${getSectionName(section)} foram restauradas para os valores padrão.`
      )
    } catch {
      errorToast(
        'Erro ao resetar',
        'Ocorreu um erro ao restaurar as configurações.'
      )
    } finally {
      setSectionResetting((prev) => ({ ...prev, [section]: false }))
    }
  }

  const getDefaultValues = (section: string): Partial<SettingsInput> => {
    switch (section) {
      case 'company':
        return {
          companyPhone: DEFAULT_COMPANY_PHONE,
          whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
          contactEmail: DEFAULT_CONTACT_EMAIL,
          marketingEmail: DEFAULT_MARKETING_EMAIL,
          companyAddress: DEFAULT_COMPANY_ADDRESS,
          aboutUsText: DEFAULT_ABOUT_US_TEXT,
          companyIconUrl: '', // Vazio = volta para logo padrão "GB"
        }
      case 'hero':
        return {
          heroCarousel: [],
        }
      case 'social':
        return {
          whatsappNumber: '',
          socialLinks: {},
        }
      case 'seo':
        return {
          seoTitle: DEFAULT_SEO_TITLE,
          seoDescription: DEFAULT_SEO_DESCRIPTION,
          favicon: '',
        }
      case 'system':
        return {
          maintenanceMode: false,
          supportChat: true,
          defaultLanguage: 'pt-BR',
          baseCurrency: 'BRL',
        }
      case 'custom':
        return {
          analyticsTrackingId: '',
          customCss: '',
          customJs: '',
        }
      default:
        return {}
    }
  }

  // Funções específicas de save para cada seção
  const saveCompanySettings = () => saveSection('company')
  const saveHeroSettings = () => saveSection('hero')
  const saveSocialSettings = () => saveSection('social')
  const saveSeoSettings = () => saveSection('seo')
  const saveSystemSettings = () => saveSection('system')
  const saveCustomSettings = () => saveSection('custom')

  // Função para mudar seção e fazer scroll automático no mobile
  const handleSectionChange = (sectionId: string) => {
    // Mudar a seção ativa
    setActiveSection(sectionId)

    // Fazer scroll para o container de configurações (mobile-friendly)
    const container = document.getElementById('settings-content-container')
    if (container) {
      container.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  if (isLoadingData) {
    return (
      <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            <div className="relative z-10">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                  Configurações do Sistema
                </h1>
                <p className="text-orange-50 font-medium">
                  Gerencie as configurações gerais da plataforma com preview em
                  tempo real
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Settings className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  Configurações Globais
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Barra de Navegação das Configurações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <SettingsNavigationBar
            onSectionSelect={handleSectionChange}
            activeSection={activeSection}
          />
        </motion.div>

        {/* Conteúdo das configurações */}
        <div id="settings-content-container" className="space-y-8">
          {/* Renderização condicional das seções */}
          {activeSection === 'company' && (
            <motion.div
              id="section-company"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsBlock
                title="Informações da Empresa"
                description="Dados básicos da empresa e informações de contato"
                icon={Building2}
                form={
                  <div className="space-y-6">
                    {/* Logo Upload - TOPO */}
                    <div className="space-y-4">
                      {/* Título no topo - CENTRALIZADO */}
                      <Label className="text-base font-semibold block text-center">
                        Logo da Empresa
                      </Label>

                      {/* Preview do Logo - CENTRALIZADO */}
                      {formData.companyIconUrl && (
                        <div className="flex justify-center">
                          <div className="relative inline-block">
                            <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                              <Image
                                src={formData.companyIconUrl}
                                alt="Logo da empresa"
                                fill
                                className="object-contain p-2"
                                unoptimized
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveLogo}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* URL Input - EM CIMA */}
                      <div>
                        <Label htmlFor="companyIconUrl" className="text-sm">
                          URL do Logo
                        </Label>
                        <Input
                          id="companyIconUrl"
                          value={formData.companyIconUrl || ''}
                          onChange={(e) =>
                            updateField('companyIconUrl', e.target.value)
                          }
                          placeholder="https://exemplo.com/logo.png"
                          className="mt-1"
                        />
                        <p className="input-description mt-1">
                          Cole a URL do logo ou faça upload de uma imagem
                        </p>
                      </div>

                      {/* Separador "ou" */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-500">ou</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>

                      {/* Upload Button - EMBAIXO */}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploadingLogo}
                          className="w-full"
                        >
                          {isUploadingLogo ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Fazer Upload de Imagem
                            </>
                          )}
                        </Button>
                        <p className="input-description mt-1">
                          Tamanho recomendado: 512x512px • Formatos: PNG, JPG,
                          SVG
                        </p>
                      </div>
                    </div>

                    {/* Demais campos */}
                    <div>
                      <Label htmlFor="companyPhone">Telefone Fixo</Label>
                      <Input
                        id="companyPhone"
                        value={formData.companyPhone || ''}
                        onChange={(e) =>
                          handlePhoneChange('companyPhone', e.target.value)
                        }
                        placeholder="(51) 2313-6262"
                        className="mt-1"
                      />
                      <p className="input-description mt-1">
                        Telefone fixo da empresa exibido em todo o site
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="whatsappNumber">WhatsApp / Celular</Label>
                      <Input
                        id="whatsappNumber"
                        value={formData.whatsappNumber || ''}
                        onChange={(e) =>
                          handlePhoneChange('whatsappNumber', e.target.value)
                        }
                        placeholder="(51) 99820-5163"
                        className="mt-1"
                      />
                      <p className="input-description mt-1">
                        Número WhatsApp/celular exibido em todo o site
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">E-mail de Contato</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail || ''}
                        onChange={(e) =>
                          updateField('contactEmail', e.target.value)
                        }
                        placeholder="contato@locacoesgb.com.br"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketingEmail">
                        E-mail Comercial / No-reply
                      </Label>
                      <Input
                        id="marketingEmail"
                        type="email"
                        value={formData.marketingEmail || ''}
                        onChange={(e) =>
                          updateField('marketingEmail', e.target.value)
                        }
                        placeholder="comercial@locacoesgb.com.br"
                        className="mt-1"
                      />
                      <p className="input-description mt-1">
                        Endereço usado para disparos automáticos e comunicações
                        comerciais.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="companyAddress">Endereço</Label>
                      <Textarea
                        id="companyAddress"
                        value={formData.companyAddress || ''}
                        onChange={(e) =>
                          updateField('companyAddress', e.target.value)
                        }
                        placeholder="Endereço completo da empresa"
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="aboutUsText">
                        Sobre Nós / Descrição SEO
                      </Label>
                      <Textarea
                        id="aboutUsText"
                        value={formData.aboutUsText || ''}
                        onChange={(e) =>
                          updateField('aboutUsText', e.target.value)
                        }
                        placeholder="Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura."
                        className="mt-1"
                        rows={4}
                      />
                      <p className="input-description mt-1">
                        Esta descrição será usada para SEO e exibida nos
                        resultados de busca do Google
                      </p>
                    </div>
                  </div>
                }
                preview={
                  <CompanyInfoPreview
                    data={{
                      name: 'GB Locações',
                      description: formData.aboutUsText,
                      address: formData.companyAddress,
                      phone: `${formData.companyPhone || '(51) 2313-6262'} | ${formData.whatsappNumber || '(51) 99820-5163'}`,
                      email: formData.contactEmail,
                      marketingEmail: formData.marketingEmail,
                      logoUrl: formData.companyIconUrl,
                    }}
                  />
                }
                onSave={saveCompanySettings}
                onReset={() => resetSection('company')}
                isSaving={sectionLoading.company}
                isResetting={sectionResetting.company}
              />
            </motion.div>
          )}

          {/* Hero Carousel */}
          {activeSection === 'hero' && (
            <motion.div
              id="section-hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsBlock
                title="Carousel Principal"
                description="Configure as imagens e conteúdo do carousel da página inicial"
                icon={Images}
                form={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Gerencie as imagens e conteúdo do carousel principal da
                      página inicial.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500">
                        Componente de gerenciamento do carousel em
                        desenvolvimento
                      </p>
                    </div>
                  </div>
                }
                preview={<HeroCarouselPreview data={{ heroCarousel: [] }} />}
                onSave={saveHeroSettings}
                onReset={() => resetSection('hero')}
                isSaving={sectionLoading.hero}
                isResetting={sectionResetting.hero}
              />
            </motion.div>
          )}

          {/* Redes Sociais */}
          {activeSection === 'social' && (
            <motion.div
              id="section-social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsBlock
                title="Redes Sociais"
                description="Configure os links das redes sociais da empresa"
                icon={Share2}
                form={
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="whatsappNumber">WhatsApp</Label>
                      <Input
                        id="whatsappNumber"
                        value={formData.whatsappNumber || ''}
                        onChange={(e) =>
                          handlePhoneChange('whatsappNumber', e.target.value)
                        }
                        placeholder="(51) 99820-5163"
                        className="mt-1"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">
                        Campos para Instagram, Facebook, LinkedIn em
                        desenvolvimento
                      </p>
                    </div>
                  </div>
                }
                preview={<SocialLinksPreview data={{ socialLinks: [] }} />}
                onSave={saveSocialSettings}
                onReset={() => resetSection('social')}
                isSaving={sectionLoading.social}
                isResetting={sectionResetting.social}
              />
            </motion.div>
          )}

          {/* SEO */}
          {activeSection === 'seo' && (
            <motion.div
              id="section-seo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsBlock
                title="SEO e Metadados"
                description="Configure informações para otimização de motores de busca"
                icon={Search}
                form={
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle">Título SEO</Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle || ''}
                        onChange={(e) =>
                          updateField('seoTitle', e.target.value)
                        }
                        placeholder="GB Locações - Equipamentos para Construção"
                        className="mt-1"
                      />
                      <p className="input-description mt-1">
                        Máximo 60 caracteres recomendado
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seoDescription">Meta Descrição</Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription || ''}
                        onChange={(e) =>
                          updateField('seoDescription', e.target.value)
                        }
                        placeholder="Descrição que aparece nos resultados de busca"
                        className="mt-1"
                        rows={3}
                      />
                      <p className="input-description mt-1">
                        Máximo 160 caracteres recomendado
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="favicon">Favicon URL</Label>
                      <Input
                        id="favicon"
                        value={formData.favicon || ''}
                        onChange={(e) => updateField('favicon', e.target.value)}
                        placeholder="https://exemplo.com/favicon.ico"
                        className="mt-1"
                      />
                    </div>
                  </div>
                }
                preview={
                  <SeoPreview
                    data={{
                      seoTitle: formData.seoTitle,
                      seoDescription: formData.seoDescription,
                      favicon: formData.favicon,
                    }}
                  />
                }
                onSave={saveSeoSettings}
                onReset={() => resetSection('seo')}
                isSaving={sectionLoading.seo}
                isResetting={sectionResetting.seo}
              />
            </motion.div>
          )}

          {/* Sistema */}
          {activeSection === 'system' && (
            <motion.div
              id="section-system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsBlock
                title="Configurações do Sistema"
                description="Configurações gerais de funcionamento da plataforma"
                icon={Settings}
                form={
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Modo Manutenção</Label>
                        <p className="text-sm text-gray-500">
                          Ativar para manutenção do sistema
                        </p>
                      </div>
                      <Switch
                        checked={formData.maintenanceMode}
                        onCheckedChange={(checked) =>
                          updateField('maintenanceMode', checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Chat de Suporte</Label>
                        <p className="text-sm text-gray-500">
                          Exibir widget de chat no site
                        </p>
                      </div>
                      <Switch
                        checked={formData.supportChat}
                        onCheckedChange={(checked) =>
                          updateField('supportChat', checked)
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="defaultLanguage">Idioma Padrão</Label>
                      <Input
                        id="defaultLanguage"
                        value={formData.defaultLanguage || ''}
                        onChange={(e) =>
                          updateField('defaultLanguage', e.target.value)
                        }
                        placeholder="pt-BR"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="baseCurrency">Moeda Base</Label>
                      <Input
                        id="baseCurrency"
                        value={formData.baseCurrency || ''}
                        onChange={(e) =>
                          updateField('baseCurrency', e.target.value)
                        }
                        placeholder="BRL"
                        className="mt-1"
                      />
                    </div>
                  </div>
                }
                preview={
                  <SystemPreview
                    data={{
                      maintenanceMode: formData.maintenanceMode,
                      defaultCurrency: formData.baseCurrency,
                      timezone: 'America/Sao_Paulo',
                      allowRegistration: true,
                      requireEmailVerification: true,
                      maxQuoteItems: 50,
                    }}
                  />
                }
                onSave={saveSystemSettings}
                onReset={() => resetSection('system')}
                isSaving={sectionLoading.system}
                isResetting={sectionResetting.system}
              />
            </motion.div>
          )}

          {/* Configurações Avançadas */}
          {activeSection === 'custom' && (
            <motion.div
              id="section-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsBlock
                title="Configurações Avançadas"
                description="CSS/JS customizado e códigos de rastreamento"
                icon={Code}
                form={
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="analyticsTrackingId">
                        Google Analytics ID
                      </Label>
                      <Input
                        id="analyticsTrackingId"
                        value={formData.analyticsTrackingId || ''}
                        onChange={(e) =>
                          updateField('analyticsTrackingId', e.target.value)
                        }
                        placeholder="GA_TRACKING_ID"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customCss">CSS Customizado</Label>
                      <Textarea
                        id="customCss"
                        value={formData.customCss || ''}
                        onChange={(e) =>
                          updateField('customCss', e.target.value)
                        }
                        placeholder="/* CSS customizado */"
                        className="mt-1 font-mono text-sm"
                        rows={5}
                      />
                    </div>

                    <div>
                      <Label htmlFor="customJs">JavaScript Customizado</Label>
                      <Textarea
                        id="customJs"
                        value={formData.customJs || ''}
                        onChange={(e) =>
                          updateField('customJs', e.target.value)
                        }
                        placeholder="// JavaScript customizado"
                        className="mt-1 font-mono text-sm"
                        rows={5}
                      />
                    </div>
                  </div>
                }
                preview={
                  <CustomSettingsPreview
                    data={{
                      customCss: formData.customCss,
                      customJs: formData.customJs,
                      gtmId: formData.analyticsTrackingId,
                    }}
                  />
                }
                onSave={saveCustomSettings}
                onReset={() => resetSection('custom')}
                isSaving={sectionLoading.custom}
                isResetting={sectionResetting.custom}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
