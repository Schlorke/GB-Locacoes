import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Design tokens do projeto GB-Locações. Cores, tipografia, espaçamentos e outros elementos fundamentais do design system.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Colors: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Cores Primárias</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Slate-700</p>
            <p className="text-xs text-muted-foreground">#334155</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Orange-600</p>
            <p className="text-xs text-muted-foreground">#ea580c</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Green-500</p>
            <p className="text-xs text-muted-foreground">#10b981</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Red-500</p>
            <p className="text-xs text-muted-foreground">#ef4444</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Cores de Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 border-2 border-green-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-green-800 font-semibold">Ativo</span>
            </div>
            <p className="text-sm font-medium">Ativo</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 border-2 border-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-800 font-semibold">Inativo</span>
            </div>
            <p className="text-sm font-medium">Inativo</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-yellow-800 font-semibold">Pendente</span>
            </div>
            <p className="text-sm font-medium">Pendente</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-red-800 font-semibold">Erro</span>
            </div>
            <p className="text-sm font-medium">Erro</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Typography: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Heading 1 - Título Principal
        </h1>
        <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold mb-2">Heading 2 - Subtítulo</h2>
        <p className="text-sm text-muted-foreground">text-3xl font-semibold</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-2">Heading 3 - Seção</h3>
        <p className="text-sm text-muted-foreground">text-2xl font-semibold</p>
      </div>
      <div>
        <h4 className="text-xl font-medium mb-2">Heading 4 - Subseção</h4>
        <p className="text-sm text-muted-foreground">text-xl font-medium</p>
      </div>
      <div>
        <p className="text-base mb-2">Parágrafo normal - Texto do corpo</p>
        <p className="text-sm text-muted-foreground">text-base (padrão)</p>
      </div>
      <div>
        <p className="text-sm mb-2">Texto pequeno - Informações secundárias</p>
        <p className="text-sm text-muted-foreground">text-sm</p>
      </div>
      <div>
        <p className="text-xs mb-2">Texto muito pequeno - Labels e captions</p>
        <p className="text-sm text-muted-foreground">text-xs</p>
      </div>
    </div>
  ),
}

export const Spacing: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaçamentos</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-slate-700 rounded"></div>
            <span className="text-sm">4px - space-1</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-700 rounded"></div>
            <span className="text-sm">8px - space-2</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700 rounded"></div>
            <span className="text-sm">12px - space-3</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-700 rounded"></div>
            <span className="text-sm">16px - space-4</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-700 rounded"></div>
            <span className="text-sm">20px - space-5</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-slate-700 rounded"></div>
            <span className="text-sm">24px - space-6</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Shadows: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sombras</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h4 className="font-medium mb-2">Shadow SM</h4>
            <p className="text-sm text-muted-foreground">shadow-sm</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border">
            <h4 className="font-medium mb-2">Shadow MD</h4>
            <p className="text-sm text-muted-foreground">shadow-md</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg border">
            <h4 className="font-medium mb-2">Shadow LG</h4>
            <p className="text-sm text-muted-foreground">shadow-lg</p>
          </div>
        </div>
      </div>
    </div>
  ),
}
