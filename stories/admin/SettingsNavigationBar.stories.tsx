import type { Meta, StoryObj } from '@storybook/react'
import { SettingsNavigationBar } from '@/components/admin/settings-navigation-bar'

const meta: Meta<typeof SettingsNavigationBar> = {
  title: 'Admin/SettingsNavigationBar',
  component: SettingsNavigationBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente settingsnavigationbar - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof SettingsNavigationBar> = {
  args: {},
}

export const Variant: StoryObj<typeof SettingsNavigationBar> = {
  args: {
    // Props específicas do componente
  },
}
