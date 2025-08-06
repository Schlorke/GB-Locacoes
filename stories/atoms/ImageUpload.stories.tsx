import { ImageUpload } from '@/components/ui/image-upload'
import type { Meta, StoryObj } from '@storybook/react'

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
  args: {
    images: [],
    onImagesChange: () => {},
    maxImages: 5,
  },
}

export const Variant: StoryObj<typeof ImageUpload> = {
  args: {
    images: [
      {
        id: '1',
        url: '/placeholder.jpg',
        name: 'image1.jpg',
      },
    ],
    onImagesChange: () => {},
    maxImages: 3,
  },
}
