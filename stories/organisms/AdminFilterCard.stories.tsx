import { AdminFilterCard } from '@/components/admin/admin-filter-card'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react'
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
    onSearchChange: (value: string) => console.log('Search:', value),
    filters: [
      {
        id: 'category',
        label: 'Categoria',
        options: [
          { value: '', label: 'Todas' },
          { value: 'tools', label: 'Ferramentas' },
          { value: 'machines', label: 'Máquinas' },
          { value: 'electronics', label: 'Eletrônicos' },
        ],
        value: '',
        onChange: (value: string) => console.log('Category:', value),
      },
      {
        id: 'status',
        label: 'Status',
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
          { value: 'maintenance', label: 'Manutenção' },
        ],
        value: '',
        onChange: (value: string) => console.log('Status:', value),
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
    onSearchChange: (value: string) => console.log('Search:', value),
    filters: [],
  },
}

export const WithFiltersOnly: StoryObj<typeof AdminFilterCard> = {
  args: {
    filters: [
      {
        id: 'category',
        label: 'Categoria',
        options: [
          { value: '', label: 'Todas' },
          { value: 'tools', label: 'Ferramentas' },
          { value: 'machines', label: 'Máquinas' },
        ],
        value: '',
        onChange: (value: string) => console.log('Category:', value),
      },
    ],
  },
}

export const WithActionButtons: StoryObj<typeof AdminFilterCard> = {
  args: {
    searchPlaceholder: 'Buscar...',
    searchValue: '',
    onSearchChange: (value: string) => console.log('Search:', value),
    filters: [
      {
        id: 'status',
        label: 'Status',
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
        ],
        value: '',
        onChange: (value: string) => console.log('Status:', value),
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
    onSearchChange: (value: string) => console.log('Search:', value),
    filters: [
      {
        id: 'category',
        label: 'Categoria',
        options: [
          { value: '', label: 'Todas' },
          { value: 'tools', label: 'Ferramentas' },
          { value: 'machines', label: 'Máquinas' },
          { value: 'electronics', label: 'Eletrônicos' },
          { value: 'vehicles', label: 'Veículos' },
        ],
        value: '',
        onChange: (value: string) => console.log('Category:', value),
      },
      {
        id: 'status',
        label: 'Status',
        options: [
          { value: '', label: 'Todos' },
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' },
          { value: 'maintenance', label: 'Manutenção' },
          { value: 'rented', label: 'Alugado' },
        ],
        value: '',
        onChange: (value: string) => console.log('Status:', value),
      },
      {
        id: 'location',
        label: 'Localização',
        options: [
          { value: '', label: 'Todas' },
          { value: 'warehouse-a', label: 'Depósito A' },
          { value: 'warehouse-b', label: 'Depósito B' },
          { value: 'office', label: 'Escritório' },
        ],
        value: '',
        onChange: (value: string) => console.log('Location:', value),
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
