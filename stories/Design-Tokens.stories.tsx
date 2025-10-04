import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação dos tokens de design utilizados no projeto GB Locações.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Cores
export const Colors: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Cores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-lg border"></div>
            <p className="text-sm font-medium">Primary</p>
            <p className="text-xs text-muted-foreground">bg-primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary-foreground rounded-lg border"></div>
            <p className="text-sm font-medium">Primary Foreground</p>
            <p className="text-xs text-muted-foreground">
              bg-primary-foreground
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-secondary rounded-lg border"></div>
            <p className="text-sm font-medium">Secondary</p>
            <p className="text-xs text-muted-foreground">bg-secondary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-secondary-foreground rounded-lg border"></div>
            <p className="text-sm font-medium">Secondary Foreground</p>
            <p className="text-xs text-muted-foreground">
              bg-secondary-foreground
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-muted rounded-lg border"></div>
            <p className="text-sm font-medium">Muted</p>
            <p className="text-xs text-muted-foreground">bg-muted</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-muted-foreground rounded-lg border"></div>
            <p className="text-sm font-medium">Muted Foreground</p>
            <p className="text-xs text-muted-foreground">bg-muted-foreground</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-accent rounded-lg border"></div>
            <p className="text-sm font-medium">Accent</p>
            <p className="text-xs text-muted-foreground">bg-accent</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-accent-foreground rounded-lg border"></div>
            <p className="text-sm font-medium">Accent Foreground</p>
            <p className="text-xs text-muted-foreground">
              bg-accent-foreground
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-destructive rounded-lg border"></div>
            <p className="text-sm font-medium">Destructive</p>
            <p className="text-xs text-muted-foreground">bg-destructive</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-destructive-foreground rounded-lg border"></div>
            <p className="text-sm font-medium">Destructive Foreground</p>
            <p className="text-xs text-muted-foreground">
              bg-destructive-foreground
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-border rounded-lg border"></div>
            <p className="text-sm font-medium">Border</p>
            <p className="text-xs text-muted-foreground">bg-border</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-input rounded-lg border"></div>
            <p className="text-sm font-medium">Input</p>
            <p className="text-xs text-muted-foreground">bg-input</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Tipografia</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold">
              Heading 1 (text-4xl font-bold)
            </h1>
            <p className="text-sm text-muted-foreground">
              Tamanho: 2.25rem (36px)
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">
              Heading 2 (text-3xl font-semibold)
            </h2>
            <p className="text-sm text-muted-foreground">
              Tamanho: 1.875rem (30px)
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Heading 3 (text-2xl font-semibold)
            </h3>
            <p className="text-sm text-muted-foreground">
              Tamanho: 1.5rem (24px)
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">
              Heading 4 (text-xl font-semibold)
            </h4>
            <p className="text-sm text-muted-foreground">
              Tamanho: 1.25rem (20px)
            </p>
          </div>
          <div>
            <p className="text-base">Texto base (text-base)</p>
            <p className="text-sm text-muted-foreground">
              Tamanho: 1rem (16px)
            </p>
          </div>
          <div>
            <p className="text-sm">Texto pequeno (text-sm)</p>
            <p className="text-sm text-muted-foreground">
              Tamanho: 0.875rem (14px)
            </p>
          </div>
          <div>
            <p className="text-xs">Texto muito pequeno (text-xs)</p>
            <p className="text-sm text-muted-foreground">
              Tamanho: 0.75rem (12px)
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Espaçamento</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <span className="text-sm">1px (w-1 h-1)</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">2px (w-2 h-2)</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span className="text-sm">4px (w-4 h-4)</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            <span className="text-sm">8px (w-8 h-8)</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full"></div>
            <span className="text-sm">12px (w-12 h-12)</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full"></div>
            <span className="text-sm">16px (w-16 h-16)</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Border Radius</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-none border"></div>
            <p className="text-sm font-medium">None</p>
            <p className="text-xs text-muted-foreground">rounded-none</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-sm border"></div>
            <p className="text-sm font-medium">Small</p>
            <p className="text-xs text-muted-foreground">rounded-sm</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded border"></div>
            <p className="text-sm font-medium">Default</p>
            <p className="text-xs text-muted-foreground">rounded</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-md border"></div>
            <p className="text-sm font-medium">Medium</p>
            <p className="text-xs text-muted-foreground">rounded-md</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-lg border"></div>
            <p className="text-sm font-medium">Large</p>
            <p className="text-xs text-muted-foreground">rounded-lg</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-xl border"></div>
            <p className="text-sm font-medium">Extra Large</p>
            <p className="text-xs text-muted-foreground">rounded-xl</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-2xl border"></div>
            <p className="text-sm font-medium">2XL</p>
            <p className="text-xs text-muted-foreground">rounded-2xl</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded-full border"></div>
            <p className="text-sm font-medium">Full</p>
            <p className="text-xs text-muted-foreground">rounded-full</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Sombras</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow-sm border"></div>
            <p className="text-sm font-medium">Small</p>
            <p className="text-xs text-muted-foreground">shadow-sm</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow border"></div>
            <p className="text-sm font-medium">Default</p>
            <p className="text-xs text-muted-foreground">shadow</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow-md border"></div>
            <p className="text-sm font-medium">Medium</p>
            <p className="text-xs text-muted-foreground">shadow-md</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow-lg border"></div>
            <p className="text-sm font-medium">Large</p>
            <p className="text-xs text-muted-foreground">shadow-lg</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow-xl border"></div>
            <p className="text-sm font-medium">Extra Large</p>
            <p className="text-xs text-muted-foreground">shadow-xl</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-white rounded-lg shadow-2xl border"></div>
            <p className="text-sm font-medium">2XL</p>
            <p className="text-xs text-muted-foreground">shadow-2xl</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstração visual de todos os tokens de design utilizados no projeto.',
      },
    },
  },
}
