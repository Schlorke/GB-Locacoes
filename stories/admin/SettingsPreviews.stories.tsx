import { CompanyInfoPreview } from '@/components/admin/settings-previews'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof CompanyInfoPreview> = {
  title: 'Admin/SettingsPreviews',
  component: CompanyInfoPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de preview das configurações da empresa.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof CompanyInfoPreview> = {
  args: {
    data: {
      name: 'GB Locações',
      description: 'Sua parceira de confiança para locação de equipamentos.',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 99999-9999',
      email: 'contato@gblocacoes.com',
      businessHours: {
        'segunda-feira': { open: '08:00', close: '18:00', isOpen: true },
        'terça-feira': { open: '08:00', close: '18:00', isOpen: true },
        'quarta-feira': { open: '08:00', close: '18:00', isOpen: true },
        'quinta-feira': { open: '08:00', close: '18:00', isOpen: true },
        'sexta-feira': { open: '08:00', close: '18:00', isOpen: true },
        sábado: { open: '08:00', close: '12:00', isOpen: true },
        domingo: { open: '00:00', close: '00:00', isOpen: false },
      },
    },
  },
}
