// Utilitários para Structured Data - Server-side safe
// Este arquivo NÃO tem 'use client', então pode ser usado em Server Components

export interface LocalBusinessData {
  name: string
  description: string
  url: string
  telephone: string
  taxID?: string
  areaServed?: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  openingHours: string[]
  contactPoints?: Array<{
    contactType?: string
    telephone: string
    areaServed?: string
    availableLanguage?: string
  }>
  sameAs: string[]
}

// Default data for GB Locações
export const DEFAULT_LOCAL_BUSINESS: LocalBusinessData = {
  name: 'GB Locações',
  description:
    'Especializada em locação de equipamentos para construção civil em Porto Alegre há mais de 10 anos. Andaimes suspensos, cadeiras elétricas, betoneiras, compressores e equipamentos para altura.',
  url: 'https://locacoesgb.com.br',
  telephone: '+55 51 2313-6262',
  taxID: '34.780.330/0001-69',
  areaServed: 'Porto Alegre e região metropolitana',
  email: 'contato@locacoesgb.com.br',
  address: {
    streetAddress: 'Travessa Doutor Heinzelmann, 365',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    postalCode: '90240-100',
    addressCountry: 'BR',
  },
  geo: {
    latitude: -29.993933,
    longitude: -51.198314,
  },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
  contactPoints: [
    {
      contactType: 'Serviço ao cliente',
      telephone: '+55 51 2313-6262',
      areaServed: 'Porto Alegre e região metropolitana',
      availableLanguage: 'Português',
    },
    {
      contactType: 'Atendimento via WhatsApp',
      telephone: '+55 51 99820-5163',
      areaServed: 'Porto Alegre e região metropolitana',
      availableLanguage: 'Português',
    },
  ],
  sameAs: [
    'https://www.facebook.com/locacoesgb',
    'https://www.instagram.com/locacoesgb',
    'https://api.whatsapp.com/send?phone=5551998205163',
  ],
}

// Função para gerar dados dinâmicos baseados nas configurações
export function getLocalBusinessData(settings?: {
  companyPhone?: string
  whatsappNumber?: string
  contactEmail?: string
  companyAddress?: string
  aboutUsText?: string
}): LocalBusinessData {
  if (!settings) return DEFAULT_LOCAL_BUSINESS

  return {
    ...DEFAULT_LOCAL_BUSINESS,
    description: settings.aboutUsText || DEFAULT_LOCAL_BUSINESS.description,
    telephone: settings.companyPhone
      ? `+55 ${settings.companyPhone.replace(/\D/g, '')}`
      : DEFAULT_LOCAL_BUSINESS.telephone,
    email: settings.contactEmail || DEFAULT_LOCAL_BUSINESS.email,
    contactPoints: [
      {
        contactType: 'Serviço ao cliente',
        telephone: settings.companyPhone
          ? `+55 ${settings.companyPhone.replace(/\D/g, '')}`
          : '+55 51 2313-6262',
        areaServed: 'Porto Alegre e região metropolitana',
        availableLanguage: 'Português',
      },
      {
        contactType: 'Atendimento via WhatsApp',
        telephone: settings.whatsappNumber
          ? `+55 ${settings.whatsappNumber.replace(/\D/g, '')}`
          : '+55 51 99820-5163',
        areaServed: 'Porto Alegre e região metropolitana',
        availableLanguage: 'Português',
      },
    ],
    sameAs: [
      'https://www.facebook.com/locacoesgb',
      'https://www.instagram.com/locacoesgb',
      settings.whatsappNumber
        ? `https://api.whatsapp.com/send?phone=55${settings.whatsappNumber.replace(/\D/g, '')}`
        : 'https://api.whatsapp.com/send?phone=5551998205163',
    ],
  }
}
