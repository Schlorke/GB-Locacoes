export interface EquipmentCategory {
  id: string
  name: string
  bgColor?: string
  fontColor?: string
  icon?: string
  iconColor?: string
}

export interface EquipmentFixture {
  id: string
  name: string
  description: string
  pricePerDay: number
  images: string[]
  category: EquipmentCategory
  isAvailable: boolean
}

export const featuredEquipmentsFixture: EquipmentFixture[] = [
  {
    id: '1',
    name: 'Andaime Suspenso 6m',
    description:
      'Andaime suspenso elétrico para trabalhos em altura até 6 metros. Certificado pelo INMETRO com manutenção preventiva.',
    pricePerDay: 85.0,
    images: ['/placeholder.svg?height=300&width=400&text=Andaime+Suspenso'],
    category: {
      id: '1',
      name: 'Andaimes Suspensos',
      bgColor: '#3b82f6',
      fontColor: '#ffffff',
      icon: 'Building',
      iconColor: '#ffffff',
    },
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Cadeira Elétrica Individual',
    description:
      'Cadeira elétrica para serviços em altura com sistema de segurança duplo e controle remoto.',
    pricePerDay: 65.0,
    images: ['/placeholder.svg?height=300&width=400&text=Cadeira+Elétrica'],
    category: {
      id: '2',
      name: 'Cadeiras Elétricas',
      bgColor: '#eab308',
      fontColor: '#000000',
      icon: 'Zap',
      iconColor: '#000000',
    },
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Betoneira 400L',
    description:
      'Betoneira de 400 litros para preparo de concreto em obras de médio porte. Motor elétrico trifásico.',
    pricePerDay: 45.0,
    images: ['/placeholder.svg?height=300&width=400&text=Betoneira+400L'],
    category: {
      id: '4',
      name: 'Betoneiras',
      bgColor: '#10b981',
      fontColor: '#ffffff',
      icon: 'Truck',
      iconColor: '#ffffff',
    },
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Rompedor Pneumático 30kg',
    description:
      'Rompedor pneumático para demolição de concreto e asfalto. Peso de 30kg com alta performance.',
    pricePerDay: 55.0,
    images: ['/placeholder.svg?height=300&width=400&text=Rompedor'],
    category: {
      id: '5',
      name: 'Rompedores',
      bgColor: '#8b5cf6',
      fontColor: '#ffffff',
      icon: 'Hammer',
      iconColor: '#ffffff',
    },
    isAvailable: false,
  },
  {
    id: '5',
    name: 'Compressor 10HP',
    description:
      'Compressor de ar 10HP para alimentação de ferramentas pneumáticas. Pressão máxima 175 PSI.',
    pricePerDay: 75.0,
    images: ['/placeholder.svg?height=300&width=400&text=Compressor'],
    category: {
      id: '6',
      name: 'Compressores',
      bgColor: '#6366f1',
      fontColor: '#ffffff',
      icon: 'Container',
      iconColor: '#ffffff',
    },
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Andaime Tubular Completo',
    description:
      'Kit completo de andaime tubular para obras com montagem até 12 metros de altura.',
    pricePerDay: 120.0,
    images: ['/placeholder.svg?height=300&width=400&text=Andaime+Tubular'],
    category: {
      id: '3',
      name: 'Andaimes Tubulares',
      bgColor: '#ef4444',
      fontColor: '#ffffff',
      icon: 'Wrench',
      iconColor: '#ffffff',
    },
    isAvailable: true,
  },
]
