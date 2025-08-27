import { ResizablePanelGroup } from '@/components/ui/resizable'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Atoms/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de painéis redimensionáveis.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ResizablePanelGroup> = {
  args: {},
}

export const Variant: StoryObj<typeof ResizablePanelGroup> = {
  args: {
    // Props específicas do componente
  },
}
