'use client'

import { getSettings, updateSettings } from '@/app/api/admin/settings/actions'
import { HeroCarouselManager } from '@/components/admin/hero-carousel-manager'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  HeroCarouselItem,
  SettingsInput,
  SocialLinks,
} from '@/schemas/settings.schema'
import { motion } from 'framer-motion'
import {
  Building2,
  Globe,
  Loader2,
  Palette,
  Save,
  Settings,
  Shield,
  Smartphone,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState<SettingsInput>({
    companyPhone: '',
    companyIconUrl: '',
    aboutUsText: '',
    companyAddress: '',
    heroCarousel: [],
    contactEmail: '',
    socialLinks: {},
    seoTitle: 'GB Locações - Equipamentos para Construção',
    seoDescription:
      'Locação de equipamentos para construção civil com qualidade e segurança',
    themeColorPrimary: '#ea580c',
    maintenanceMode: false,
    analyticsTrackingId: '',
    footerText: '',
    businessHours: {},
    supportChat: true,
    whatsappNumber: '',
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
            companyPhone: result.data.companyPhone || '',
            companyIconUrl: result.data.companyIconUrl || '',
            aboutUsText: result.data.aboutUsText || '',
            companyAddress: result.data.companyAddress || '',
            heroCarousel:
              (result.data.heroCarousel as HeroCarouselItem[]) || [],
            contactEmail: result.data.contactEmail || '',
            socialLinks: (result.data.socialLinks as SocialLinks) || {},
            seoTitle:
              result.data.seoTitle ||
              'GB Locações - Equipamentos para Construção',
            seoDescription:
              result.data.seoDescription ||
              'Locação de equipamentos para construção civil com qualidade e segurança',
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
            whatsappNumber: result.data.whatsappNumber || '',
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
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as configurações.',
          variant: 'destructive',
        })
      } finally {
        setIsLoadingData(false)
      }
    }

    loadSettings()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateSettings(formData)

      if (result.success) {
        toast({
          title: 'Sucesso!',
          description:
            result.message || 'Configurações atualizadas com sucesso.',
        })
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao atualizar configurações.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast({
        title: 'Erro',
        description: 'Erro interno do servidor.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateField = (field: keyof SettingsInput, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateSocialLinks = (field: keyof SocialLinks, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value,
      },
    }))
  }

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Carregando configurações...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Camadas de profundidade */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Conteúdo */}
            <div className="relative z-10">
              <div className="mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                    Configurações do Sistema
                  </h1>
                  <p className="text-orange-50 font-medium">
                    Gerencie as configurações gerais da plataforma
                  </p>
                </div>
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

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações da Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Building2 className="w-5 h-5" />
                  </div>
                  Informações da Empresa
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Dados básicos da empresa e informações de contato
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="companyPhone"
                        className="text-sm font-medium"
                      >
                        Telefone da Empresa
                      </Label>
                      <Input
                        id="companyPhone"
                        value={formData.companyPhone || ''}
                        onChange={(e) =>
                          updateField('companyPhone', e.target.value)
                        }
                        placeholder="(11) 99999-9999"
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="contactEmail"
                        className="text-sm font-medium"
                      >
                        E-mail de Contato
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail || ''}
                        onChange={(e) =>
                          updateField('contactEmail', e.target.value)
                        }
                        placeholder="contato@gblocacoes.com"
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="whatsappNumber"
                        className="text-sm font-medium"
                      >
                        WhatsApp
                      </Label>
                      <Input
                        id="whatsappNumber"
                        value={formData.whatsappNumber || ''}
                        onChange={(e) =>
                          updateField('whatsappNumber', e.target.value)
                        }
                        placeholder="5511999999999"
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="companyAddress"
                        className="text-sm font-medium"
                      >
                        Endereço da Empresa
                      </Label>
                      <Textarea
                        id="companyAddress"
                        value={formData.companyAddress || ''}
                        onChange={(e) =>
                          updateField('companyAddress', e.target.value)
                        }
                        placeholder="Rua exemplo, 123 - Bairro - Cidade - UF"
                        rows={3}
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="aboutUsText"
                        className="text-sm font-medium"
                      >
                        Sobre a Empresa
                      </Label>
                      <Textarea
                        id="aboutUsText"
                        value={formData.aboutUsText || ''}
                        onChange={(e) =>
                          updateField('aboutUsText', e.target.value)
                        }
                        placeholder="Descrição da empresa para a página Sobre Nós"
                        rows={3}
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hero Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  Carousel Principal
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Configure as imagens e conteúdo do carousel da página inicial
                </p>
              </CardHeader>

              <CardContent className="relative z-10">
                <HeroCarouselManager
                  items={formData.heroCarousel || []}
                  onChange={(items) => updateField('heroCarousel', items)}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  Redes Sociais
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Links para as redes sociais da empresa
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="facebook" className="text-sm font-medium">
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      value={formData.socialLinks?.facebook || ''}
                      onChange={(e) =>
                        updateSocialLinks('facebook', e.target.value)
                      }
                      placeholder="https://facebook.com/gblocacoes"
                      className="mt-1 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram" className="text-sm font-medium">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={formData.socialLinks?.instagram || ''}
                      onChange={(e) =>
                        updateSocialLinks('instagram', e.target.value)
                      }
                      placeholder="https://instagram.com/gblocacoes"
                      className="mt-1 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={formData.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        updateSocialLinks('linkedin', e.target.value)
                      }
                      placeholder="https://linkedin.com/company/gblocacoes"
                      className="mt-1 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtube" className="text-sm font-medium">
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      value={formData.socialLinks?.youtube || ''}
                      onChange={(e) =>
                        updateSocialLinks('youtube', e.target.value)
                      }
                      placeholder="https://youtube.com/@gblocacoes"
                      className="mt-1 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter" className="text-sm font-medium">
                      Twitter/X
                    </Label>
                    <Input
                      id="twitter"
                      value={formData.socialLinks?.twitter || ''}
                      onChange={(e) =>
                        updateSocialLinks('twitter', e.target.value)
                      }
                      placeholder="https://twitter.com/gblocacoes"
                      className="mt-1 focus:border-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* SEO e Aparência */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  SEO e Aparência
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Configurações de SEO, tema e identidade visual
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle" className="text-sm font-medium">
                        Título SEO *
                      </Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) =>
                          updateField('seoTitle', e.target.value)
                        }
                        placeholder="GB Locações - Equipamentos para Construção"
                        maxLength={60}
                        className="mt-1 focus:border-blue-500"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.seoTitle.length}/60 caracteres
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="seoDescription"
                        className="text-sm font-medium"
                      >
                        Descrição SEO *
                      </Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription}
                        onChange={(e) =>
                          updateField('seoDescription', e.target.value)
                        }
                        placeholder="Locação de equipamentos para construção civil..."
                        maxLength={160}
                        rows={3}
                        className="mt-1 focus:border-blue-500"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.seoDescription.length}/160 caracteres
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="themeColorPrimary"
                        className="text-sm font-medium"
                      >
                        Cor Primária do Tema
                      </Label>
                      <div className="flex items-center gap-3 mt-1">
                        <Input
                          id="themeColorPrimary"
                          type="color"
                          value={formData.themeColorPrimary}
                          onChange={(e) =>
                            updateField('themeColorPrimary', e.target.value)
                          }
                          className="w-16 h-10 p-1 border rounded-lg focus:border-blue-500"
                        />
                        <Input
                          value={formData.themeColorPrimary}
                          onChange={(e) =>
                            updateField('themeColorPrimary', e.target.value)
                          }
                          placeholder="#ea580c"
                          className="flex-1 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="favicon" className="text-sm font-medium">
                        Favicon (URL)
                      </Label>
                      <Input
                        id="favicon"
                        value={formData.favicon || ''}
                        onChange={(e) => updateField('favicon', e.target.value)}
                        placeholder="https://exemplo.com/favicon.ico"
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="logoSecondary"
                        className="text-sm font-medium"
                      >
                        Logo Secundária (URL)
                      </Label>
                      <Input
                        id="logoSecondary"
                        value={formData.logoSecondary || ''}
                        onChange={(e) =>
                          updateField('logoSecondary', e.target.value)
                        }
                        placeholder="https://exemplo.com/logo-alt.png"
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Configurações do Sistema */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  Configurações do Sistema
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Configurações técnicas e administrativas
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label
                          htmlFor="maintenanceMode"
                          className="text-sm font-medium"
                        >
                          Modo Manutenção
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          Ativa uma página de manutenção para visitantes
                        </p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={formData.maintenanceMode || false}
                        onCheckedChange={(checked) =>
                          updateField('maintenanceMode', checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label
                          htmlFor="supportChat"
                          className="text-sm font-medium"
                        >
                          Chat de Suporte
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          Exibe o botão de WhatsApp para suporte
                        </p>
                      </div>
                      <Switch
                        id="supportChat"
                        checked={formData.supportChat !== false}
                        onCheckedChange={(checked) =>
                          updateField('supportChat', checked)
                        }
                      />
                    </div>

                    {formData.maintenanceMode && (
                      <div>
                        <Label
                          htmlFor="maintenanceMessage"
                          className="text-sm font-medium"
                        >
                          Mensagem de Manutenção
                        </Label>
                        <Textarea
                          id="maintenanceMessage"
                          value={formData.maintenanceMessage || ''}
                          onChange={(e) =>
                            updateField('maintenanceMessage', e.target.value)
                          }
                          placeholder="Site em manutenção. Voltamos em breve!"
                          rows={2}
                          className="mt-1 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="analyticsTrackingId"
                        className="text-sm font-medium"
                      >
                        Google Analytics ID
                      </Label>
                      <Input
                        id="analyticsTrackingId"
                        value={formData.analyticsTrackingId || ''}
                        onChange={(e) =>
                          updateField('analyticsTrackingId', e.target.value)
                        }
                        placeholder="G-XXXXXXXXXX"
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="footerText"
                        className="text-sm font-medium"
                      >
                        Texto do Rodapé
                      </Label>
                      <Textarea
                        id="footerText"
                        value={formData.footerText || ''}
                        onChange={(e) =>
                          updateField('footerText', e.target.value)
                        }
                        placeholder="© 2024 GB Locações. Todos os direitos reservados."
                        rows={2}
                        className="mt-1 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="defaultLanguage"
                          className="text-sm font-medium"
                        >
                          Idioma Padrão
                        </Label>
                        <Input
                          id="defaultLanguage"
                          value={formData.defaultLanguage || 'pt-BR'}
                          onChange={(e) =>
                            updateField('defaultLanguage', e.target.value)
                          }
                          placeholder="pt-BR"
                          className="mt-1 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="baseCurrency"
                          className="text-sm font-medium"
                        >
                          Moeda Base
                        </Label>
                        <Input
                          id="baseCurrency"
                          value={formData.baseCurrency || 'BRL'}
                          onChange={(e) =>
                            updateField('baseCurrency', e.target.value)
                          }
                          placeholder="BRL"
                          className="mt-1 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customização Avançada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white">
                    <Palette className="w-5 h-5" />
                  </div>
                  Customização Avançada
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  CSS e JavaScript personalizados (use com cuidado)
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="customCss" className="text-sm font-medium">
                      CSS Personalizado
                    </Label>
                    <Textarea
                      id="customCss"
                      value={formData.customCss || ''}
                      onChange={(e) => updateField('customCss', e.target.value)}
                      placeholder="/* CSS personalizado aqui */"
                      rows={8}
                      className="mt-1 font-mono text-sm focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customJs" className="text-sm font-medium">
                      JavaScript Personalizado
                    </Label>
                    <Textarea
                      id="customJs"
                      value={formData.customJs || ''}
                      onChange={(e) => updateField('customJs', e.target.value)}
                      placeholder="// JavaScript personalizado aqui"
                      rows={8}
                      className="mt-1 font-mono text-sm focus:border-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Botões de Ação */}
          <div className="flex justify-end pt-6 mt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                type="button"
                asChild
                className="w-full sm:w-auto bg-transparent"
              >
                <Link href="/admin">Cancelar</Link>
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
