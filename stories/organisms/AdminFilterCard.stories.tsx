import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from '@storybook/test'
import { Plus } from 'lucide-react'

const meta: Meta<typeof AdminFilterCard> = {
  title: 'Organisms/AdminFilterCard',
  component: AdminFilterCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de filtro administrativo com busca, filtros e botões de ação. Usado em páginas de listagem do admin.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof AdminFilterCard> = {
  args: {
    searchPlaceholder: 'Buscar equipamentos...',
    searchValue: '',
    onSearchChange: fn(),
    filters: [
      {
        label: 'Categoria',
        options: [
          { value: '', label: 'Todas' },
          { value: 'tools', label: 'Ferramentas' },
          { value: 'machines', label: 'Máquinas' },
          { value: 'electronics', label: 'Eletrônicos' },
        ],
        value: '',
        onValueChange: fn(),
      },
      {
        label: 'Status',
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
          { value: 'maintenance', label: 'Manutenção' },
        ],
        value: '',
        onValueChange: fn(),
      },
    ],
    actionButtons: (
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Novo Equipamento
      </Button>
    ),
  },
}

export const WithSearchOnly: StoryObj<typeof AdminFilterCard> = {
  args: {
    searchPlaceholder: 'Buscar...',
    searchValue: '',
    onSearchChange: fn(),
    filters: [],
  },
}

export const WithFiltersOnly: StoryObj<typeof AdminFilterCard> = {
  args: {
    filters: [
      {
        label: 'Categoria',
        options: [
          { value: '', label: 'Todas' },
          { value: 'tools', label: 'Ferramentas' },
          { value: 'machines', label: 'Máquinas' },
        ],
        value: '',
        onValueChange: fn(),
      },
    ],
  },
}

export const WithActionButtons: StoryObj<typeof AdminFilterCard> = {
  args: {
    searchPlaceholder: 'Buscar...',
    searchValue: '',
    onSearchChange: fn(),
    filters: [
      {
        label: 'Status',
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
        ],
        value: '',
        onValueChange: fn(),
      },
    ],
    actionButtons: (
      <div className="flex gap-2">
        <Button variant="outline">Exportar</Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
    ),
  },
}

export const ComplexFilters: StoryObj<typeof AdminFilterCard> = {
  args: {
    searchPlaceholder: 'Buscar equipamentos...',
    searchValue: '',
    onSearchChange: fn(),
    filters: [
      {
        label: 'Categoria',
        options: [
          { value: '', label: 'Todas' },
          { value: 'tools', label: 'Ferramentas' },
          { value: 'machines', label: 'Máquinas' },
          { value: 'electronics', label: 'Eletrônicos' },
          { value: 'vehicles', label: 'Veículos' },
        ],
        value: '',
        onValueChange: fn(),
      },
      {
        label: 'Status',
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
          { value: 'maintenance', label: 'Manutenção' },
          { value: 'rented', label: 'Alugado' },
        ],
        value: '',
        onValueChange: fn(),
      },
      {
        label: 'Localização',
        options: [
          { value: '', label: 'Todas' },
          { value: 'warehouse-a', label: 'Depósito A' },
          { value: 'warehouse-b', label: 'Depósito B' },
          { value: 'office', label: 'Escritório' },
        ],
        value: '',
        onValueChange: fn(),
      },
    ],
    actionButtons: (
      <div className="flex gap-2">
        <Button variant="outline">Filtrar</Button>
        <Button variant="outline">Exportar</Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>
    ),
  },
}
