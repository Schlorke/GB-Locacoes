import type { Meta, StoryObj } from '@storybook/react'
import { EmojiPicker } from '@/components/ui/emoji-picker'

const meta: Meta<typeof EmojiPicker> = {
  title: 'Atoms/EmojiPicker',
  component: EmojiPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente emojipicker - descrição a ser adicionada.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof EmojiPicker> = {
  args: {},
}

export const Variant: StoryObj<typeof EmojiPicker> = {
  args: {
    // Props específicas do componente
  },
}
