import WhyChooseUs from '@/components/why-choose-us'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof WhyChooseUs> = {
  title: 'Organisms/WhyChooseUs',
  component: WhyChooseUs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente whychooseus - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof WhyChooseUs> = {
  args: {},
}

export const Variant: StoryObj<typeof WhyChooseUs> = {
  args: {
    // Props específicas do componente
  },
}
