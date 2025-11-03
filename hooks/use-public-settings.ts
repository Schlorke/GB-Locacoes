import { useEffect, useState } from 'react'

export interface PublicSettings {
  companyPhone: string
  whatsappNumber: string
  contactEmail: string
  marketingEmail: string
  companyAddress: string
  companyIconUrl: string
  aboutUsText: string
  socialLinks: Record<string, string>
  heroCarousel: Array<{ imageUrl: string }>
  waveAnimation: 'none' | 'static' | 'animated'
}

// Valores padrão da empresa GB Locações
// IMPORTANTE: Estes valores são restaurados quando o usuário clica em "Resetar"
const defaultSettings: PublicSettings = {
  companyPhone: '(51) 2313-6262',
  whatsappNumber: '(51) 99820-5163',
  contactEmail: 'contato@locacoesgb.com.br',
  marketingEmail: 'comercial@locacoesgb.com.br',
  companyAddress:
    'Travessa Doutor Heinzelmann, 365 - Humaitá, Porto Alegre/RS - CEP 90240-100',
  companyIconUrl: '', // Vazio = usa logo padrão "GB"
  aboutUsText: '', // ✅ VAZIO por padrão
  socialLinks: {},
  heroCarousel: [], // Vazio = usa fundo laranja padrão
  waveAnimation: 'animated', // Padrão: onda animada
}

type UsePublicSettingsOptions = {
  initialData?: Partial<PublicSettings> | null
}

export function usePublicSettings(options?: UsePublicSettingsOptions) {
  const hasInitialData = Boolean(options?.initialData)

  const [settings, setSettings] = useState<PublicSettings>(() => ({
    ...defaultSettings,
    ...(options?.initialData ?? {}),
  }))
  const [isLoading, setIsLoading] = useState(!hasInitialData)

  useEffect(() => {
    let isActive = true

    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings/public')
        if (response.ok) {
          const data = await response.json()
          if (!isActive) {
            return
          }
          setSettings({
            ...defaultSettings,
            ...data,
          })
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
        // Manter valores padrão em caso de erro
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    fetchSettings()

    return () => {
      isActive = false
    }
  }, [])

  return { settings, isLoading }
}
