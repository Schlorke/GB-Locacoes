'use client';

import { getSettings, updateSettings } from '@/app/api/admin/settings/actions';
import { SettingsBlock } from '@/components/admin/settings-block';
import { SettingsNavigationBar } from '@/components/admin/settings-navigation-bar';
import {
  CompanyInfoPreview,
  CustomSettingsPreview,
  HeroCarouselPreview,
  SeoPreview,
  SocialLinksPreview,
  SystemPreview,
} from '@/components/admin/settings-previews';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SettingsInput } from '@/schemas/settings.schema';
import { motion } from 'framer-motion';
import { Building2, Code, Images, Loader2, Search, Settings, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [_isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('company');

  // Estados de loading por seção
  const [sectionLoading, setSectionLoading] = useState({
    company: false,
    hero: false,
    social: false,
    seo: false,
    system: false,
    custom: false,
  });

  // Estados de reset por seção
  const [sectionResetting, setSectionResetting] = useState({
    company: false,
    hero: false,
    social: false,
    seo: false,
    system: false,
    custom: false,
  });

  const [formData, setFormData] = useState<SettingsInput>({
    companyPhone: '',
    companyIconUrl: '',
    aboutUsText: '',
    companyAddress: '',
    heroCarousel: [],
    contactEmail: '',
    socialLinks: {},
    seoTitle: 'GB Locações - Equipamentos para Construção',
    seoDescription: 'Locação de equipamentos para construção civil com qualidade e segurança',
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
  });

  // Carregar dados iniciais
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await getSettings();
        if (result.success && result.data) {
          setFormData({
            companyPhone: result.data.companyPhone || '',
            companyIconUrl: result.data.companyIconUrl || '',
            aboutUsText: result.data.aboutUsText || '',
            companyAddress: result.data.companyAddress || '',
            heroCarousel:
              (result.data.heroCarousel as Array<{
                imageUrl: string;
                id?: string;
                title?: string;
                description?: string;
                link?: string;
                order?: number;
              }>) || [],
            contactEmail: result.data.contactEmail || '',
            socialLinks:
              (result.data.socialLinks as {
                facebook?: string;
                instagram?: string;
                linkedin?: string;
                whatsapp?: string;
                youtube?: string;
                twitter?: string;
              }) || {},
            seoTitle: result.data.seoTitle || 'GB Locações - Equipamentos para Construção',
            seoDescription:
              result.data.seoDescription ||
              'Locação de equipamentos para construção civil com qualidade e segurança',
            themeColorPrimary: result.data.themeColorPrimary || '#ea580c',
            maintenanceMode: result.data.maintenanceMode || false,
            analyticsTrackingId: result.data.analyticsTrackingId || '',
            footerText: result.data.footerText || '',
            businessHours:
              (result.data.businessHours as {
                monday?: { closed: boolean; open?: string; close?: string };
                tuesday?: { closed: boolean; open?: string; close?: string };
                wednesday?: { closed: boolean; open?: string; close?: string };
                thursday?: { closed: boolean; open?: string; close?: string };
                friday?: { closed: boolean; open?: string; close?: string };
                saturday?: { closed: boolean; open?: string; close?: string };
                sunday?: { closed: boolean; open?: string; close?: string };
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
                host?: string;
                port?: number;
                secure?: boolean;
                username?: string;
                password?: string;
                fromEmail?: string;
                fromName?: string;
              }) || {},
            uploadLimits:
              (result.data.uploadLimits as {
                maxFileSize?: number;
                allowedTypes?: string[];
                maxFiles?: number;
              }) || {},
            securityConfig:
              (result.data.securityConfig as {
                enableRecaptcha?: boolean;
                recaptchaSiteKey?: string;
                recaptchaSecretKey?: string;
                enable2FA?: boolean;
                sessionTimeout?: number;
                maxLoginAttempts?: number;
              }) || {},
            customCss: result.data.customCss || '',
            customJs: result.data.customJs || '',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as configurações.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    loadSettings();
  }, [toast]);

  const _handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateSettings(formData);

      if (result.success) {
        toast({
          title: 'Sucesso!',
          description: result.message || 'Configurações atualizadas com sucesso.',
        });
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao atualizar configurações.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: 'Erro',
        description: 'Erro interno do servidor.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof SettingsInput, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Funções específicas para salvar cada seção
  const saveSection = async (section: keyof typeof sectionLoading) => {
    setSectionLoading((prev) => ({ ...prev, [section]: true }));

    try {
      const result = await updateSettings(formData);

      if (result.success) {
        toast({
          title: 'Sucesso!',
          description: `Configurações de ${getSectionName(section)} atualizadas com sucesso.`,
        });
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Erro ao atualizar configurações.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: 'Erro',
        description: 'Erro interno do servidor.',
        variant: 'destructive',
      });
    } finally {
      setSectionLoading((prev) => ({ ...prev, [section]: false }));
    }
  };

  const getSectionName = (section: string) => {
    const names = {
      company: 'empresa',
      hero: 'carrossel',
      social: 'redes sociais',
      seo: 'SEO',
      system: 'sistema',
      custom: 'personalização',
    };
    return names[section as keyof typeof names] || section;
  };

  // Funções de reset por seção
  const resetSection = async (section: keyof typeof sectionResetting) => {
    setSectionResetting((prev) => ({ ...prev, [section]: true }));

    try {
      // Simula um delay para mostrar a animação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const defaults = getDefaultValues(section);
      setFormData((prev) => ({ ...prev, ...defaults }));

      toast({
        title: 'Configurações resetadas',
        description: `Configurações de ${getSectionName(section)} foram restauradas para os valores padrão.`,
      });
    } catch (_error) {
      toast({
        title: 'Erro ao resetar',
        description: 'Ocorreu um erro ao restaurar as configurações.',
        variant: 'destructive',
      });
    } finally {
      setSectionResetting((prev) => ({ ...prev, [section]: false }));
    }
  };

  const getDefaultValues = (section: string): Partial<SettingsInput> => {
    switch (section) {
      case 'company':
        return {
          companyPhone: '',
          contactEmail: '',
          companyAddress: '',
          aboutUsText: '',
          companyIconUrl: '',
        };
      case 'hero':
        return {
          heroCarousel: [],
        };
      case 'social':
        return {
          whatsappNumber: '',
          socialLinks: {},
        };
      case 'seo':
        return {
          seoTitle: 'GB Locações - Equipamentos para Construção',
          seoDescription: 'Locação de equipamentos para construção civil com qualidade e segurança',
          favicon: '',
        };
      case 'system':
        return {
          maintenanceMode: false,
          supportChat: true,
          defaultLanguage: 'pt-BR',
          baseCurrency: 'BRL',
        };
      case 'custom':
        return {
          analyticsTrackingId: '',
          customCss: '',
          customJs: '',
        };
      default:
        return {};
    }
  };

  // Funções específicas de save para cada seção
  const saveCompanySettings = () => saveSection('company');
  const saveHeroSettings = () => saveSection('hero');
  const saveSocialSettings = () => saveSection('social');
  const saveSeoSettings = () => saveSection('seo');
  const saveSystemSettings = () => saveSection('system');
  const saveCustomSettings = () => saveSection('custom');

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Carregando configurações...</p>
          </div>
        </div>
      </div>
    );
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
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            <div className="relative z-10">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                  Configurações do Sistema
                </h1>
                <p className="text-orange-50 font-medium">
                  Gerencie as configurações gerais da plataforma com preview em tempo real
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Settings className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">Configurações Globais</span>
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
          <SettingsNavigationBar onSectionSelect={setActiveSection} activeSection={activeSection} />
        </motion.div>

        {/* Conteúdo das configurações */}
        <div className="space-y-8">
          {/* Renderização condicional das seções */}
          {activeSection === 'company' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SettingsBlock
                title="Informações da Empresa"
                description="Dados básicos da empresa e informações de contato"
                icon={Building2}
                form={
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyPhone">Telefone da Empresa</Label>
                      <Input
                        id="companyPhone"
                        value={formData.companyPhone || ''}
                        onChange={(e) => updateField('companyPhone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">E-mail de Contato</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail || ''}
                        onChange={(e) => updateField('contactEmail', e.target.value)}
                        placeholder="contato@gblocacoes.com.br"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="companyAddress">Endereço</Label>
                      <Textarea
                        id="companyAddress"
                        value={formData.companyAddress || ''}
                        onChange={(e) => updateField('companyAddress', e.target.value)}
                        placeholder="Endereço completo da empresa"
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="aboutUsText">Sobre Nós</Label>
                      <Textarea
                        id="aboutUsText"
                        value={formData.aboutUsText || ''}
                        onChange={(e) => updateField('aboutUsText', e.target.value)}
                        placeholder="Descrição da empresa"
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="companyIconUrl">URL do Logo</Label>
                      <Input
                        id="companyIconUrl"
                        value={formData.companyIconUrl || ''}
                        onChange={(e) => updateField('companyIconUrl', e.target.value)}
                        placeholder="https://exemplo.com/logo.png"
                        className="mt-1"
                      />
                    </div>
                  </div>
                }
                preview={
                  <CompanyInfoPreview
                    data={{
                      name: 'GB Locações',
                      description: formData.aboutUsText,
                      address: formData.companyAddress,
                      phone: formData.companyPhone,
                      email: formData.contactEmail,
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SettingsBlock
                title="Carousel Principal"
                description="Configure as imagens e conteúdo do carousel da página inicial"
                icon={Images}
                form={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Gerencie as imagens e conteúdo do carousel principal da página inicial.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500">
                        Componente de gerenciamento do carousel em desenvolvimento
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
                        onChange={(e) => updateField('whatsappNumber', e.target.value)}
                        placeholder="5511999999999"
                        className="mt-1"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">
                        Campos para Instagram, Facebook, LinkedIn em desenvolvimento
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
                        onChange={(e) => updateField('seoTitle', e.target.value)}
                        placeholder="GB Locações - Equipamentos para Construção"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Máximo 60 caracteres recomendado</p>
                    </div>

                    <div>
                      <Label htmlFor="seoDescription">Meta Descrição</Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription || ''}
                        onChange={(e) => updateField('seoDescription', e.target.value)}
                        placeholder="Descrição que aparece nos resultados de busca"
                        className="mt-1"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
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
                        <p className="text-sm text-gray-500">Ativar para manutenção do sistema</p>
                      </div>
                      <Switch
                        checked={formData.maintenanceMode}
                        onCheckedChange={(checked) => updateField('maintenanceMode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Chat de Suporte</Label>
                        <p className="text-sm text-gray-500">Exibir widget de chat no site</p>
                      </div>
                      <Switch
                        checked={formData.supportChat}
                        onCheckedChange={(checked) => updateField('supportChat', checked)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="defaultLanguage">Idioma Padrão</Label>
                      <Input
                        id="defaultLanguage"
                        value={formData.defaultLanguage || ''}
                        onChange={(e) => updateField('defaultLanguage', e.target.value)}
                        placeholder="pt-BR"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="baseCurrency">Moeda Base</Label>
                      <Input
                        id="baseCurrency"
                        value={formData.baseCurrency || ''}
                        onChange={(e) => updateField('baseCurrency', e.target.value)}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <SettingsBlock
                title="Configurações Avançadas"
                description="CSS/JS customizado e códigos de rastreamento"
                icon={Code}
                form={
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="analyticsTrackingId">Google Analytics ID</Label>
                      <Input
                        id="analyticsTrackingId"
                        value={formData.analyticsTrackingId || ''}
                        onChange={(e) => updateField('analyticsTrackingId', e.target.value)}
                        placeholder="GA_TRACKING_ID"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customCss">CSS Customizado</Label>
                      <Textarea
                        id="customCss"
                        value={formData.customCss || ''}
                        onChange={(e) => updateField('customCss', e.target.value)}
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
                        onChange={(e) => updateField('customJs', e.target.value)}
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
  );
}
