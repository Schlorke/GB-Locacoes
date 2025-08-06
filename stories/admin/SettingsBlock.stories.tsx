import { SettingsBlock } from '@/components/admin/settings-block'
import type { Meta, StoryObj } from '@storybook/react'
import { Settings } from 'lucide-react'

const meta: Meta<typeof SettingsBlock> = {
  title: 'Admin/SettingsBlock',
  component: SettingsBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente settingsblock - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof SettingsBlock> = {
  args: {
    title: 'Configurações Gerais',
    icon: Settings,
    description: 'Configure as configurações gerais do sistema',
    form: <div>Formulário de exemplo</div>,
    preview: <div>Preview de exemplo</div>,
  },
}

export const Variant: StoryObj<typeof SettingsBlock> = {
  args: {
    title: 'Configurações Avançadas',
    icon: Settings,
    description: 'Configure as configurações avançadas do sistema',
    form: <div>Formulário avançado</div>,
    preview: <div>Preview avançado</div>,
    onSave: () => console.log('Salvando...'),
    onReset: () => console.log('Resetando...'),
  },
}
