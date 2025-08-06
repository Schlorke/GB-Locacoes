import type { Meta, StoryObj } from '@storybook/react'
import { ImageUpload } from '@/components/ui/image-upload'

const meta: Meta<typeof ImageUpload> = {
  title: 'Atoms/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente imageupload - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof ImageUpload> = {
  args: {},
}

export const Variant: StoryObj<typeof ImageUpload> = {
  args: {
    // Props específicas do componente
  },
}
