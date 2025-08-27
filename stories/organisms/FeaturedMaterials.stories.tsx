import FeaturedMaterials from '@/components/featured-materials'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof FeaturedMaterials> = {
  title: 'Organisms/FeaturedMaterials',
  component: FeaturedMaterials,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente featuredmaterials - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof FeaturedMaterials> = {
  args: {},
}

export const Variant: StoryObj<typeof FeaturedMaterials> = {
  args: {
    // Props específicas do componente
  },
}
