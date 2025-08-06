import type { Meta, StoryObj } from '@storybook/react'
import { SettingsBlock } from '@/components/admin/settings-block'

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
  args: {},
}

export const Variant: StoryObj<typeof SettingsBlock> = {
  args: {
    // Props específicas do componente
  },
}
