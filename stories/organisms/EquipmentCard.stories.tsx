import { EquipmentCard } from '@/components/equipment-card'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EquipmentCard> = {
  title: 'Organisms/EquipmentCard',
  component: EquipmentCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card de equipamento usado no catálogo e páginas de listagem. Exibe informações do equipamento com imagem, preço e ações.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof EquipmentCard> = {
  args: {
    equipment: {
      id: '1',
      name: 'Betoneira Profissional',
      description: 'Betoneira elétrica 400L para construção civil',
      price: 150.0,
      images: ['/placeholder.jpg'],
      category: 'Ferramentas',
      status: 'available',
      location: 'São Paulo, SP',
    },
  },
}

export const WithMultipleImages: StoryObj<typeof EquipmentCard> = {
  args: {
    equipment: {
      id: '2',
      name: 'Escavadeira Hidráulica',
      description: 'Escavadeira hidráulica para grandes obras',
      price: 800.0,
      images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
      category: 'Máquinas',
      status: 'available',
      location: 'Rio de Janeiro, RJ',
    },
  },
}

export const Rented: StoryObj<typeof EquipmentCard> = {
  args: {
    equipment: {
      id: '3',
      name: 'Gerador de Energia',
      description: 'Gerador diesel 10kW para eventos',
      price: 300.0,
      images: ['/placeholder.jpg'],
      category: 'Eletrônicos',
      status: 'rented',
      location: 'Belo Horizonte, MG',
    },
  },
}

export const Maintenance: StoryObj<typeof EquipmentCard> = {
  args: {
    equipment: {
      id: '4',
      name: 'Compressor de Ar',
      description: 'Compressor industrial 100L',
      price: 200.0,
      images: ['/placeholder.jpg'],
      category: 'Ferramentas',
      status: 'maintenance',
      location: 'Curitiba, PR',
    },
  },
}

export const NoImage: StoryObj<typeof EquipmentCard> = {
  args: {
    equipment: {
      id: '5',
      name: 'Furadeira de Impacto',
      description: 'Furadeira profissional 1/2"',
      price: 80.0,
      images: [],
      category: 'Ferramentas',
      status: 'available',
      location: 'Salvador, BA',
    },
  },
}

export const LongDescription: StoryObj<typeof EquipmentCard> = {
  args: {
    equipment: {
      id: '6',
      name: 'Plataforma Elevatória',
      description:
        'Plataforma elevatória articulada com alcance de 12 metros, ideal para trabalhos em altura em construções, manutenção de fachadas e instalação de equipamentos. Equipamento certificado e com todos os documentos em dia.',
      price: 1200.0,
      images: ['/placeholder.jpg'],
      category: 'Máquinas',
      status: 'available',
      location: 'Porto Alegre, RS',
    },
  },
}
