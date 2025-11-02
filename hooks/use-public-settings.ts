import { useEffect, useState } from 'react'

interface PublicSettings {
  companyPhone: string
  whatsappNumber: string
  contactEmail: string
  marketingEmail: string
  companyAddress: string
  companyIconUrl: string
  aboutUsText: string
  socialLinks: Record<string, string>
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
}

export function usePublicSettings() {
  const [settings, setSettings] = useState<PublicSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings/public')
        if (response.ok) {
          const data = await response.json()
          setSettings({
            ...defaultSettings,
            ...data,
          })
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
        // Manter valores padrão em caso de erro
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, isLoading }
}
