// Mock data para uso consistente nas stories
export const mockUser = {
  id: 'mock-admin-123',
  name: 'Admin GB Locações',
  email: 'admin@gblocacoes.com',
  role: 'ADMIN' as const,
  image: '/api/placeholder/32/32',
}

export const mockEquipment = {
  id: '1',
  name: 'Betoneira Industrial',
  description:
    'Betoneira de alta capacidade para construção civil, ideal para obras de médio e grande porte.',
  pricePerDay: 75.0,
  images: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
  ],
  available: true,
  categoryId: '1',
  category: {
    id: '1',
    name: 'Equipamentos de Construção',
    description: 'Equipamentos essenciais para construção civil',
    icon: 'Hammer',
    iconColor: '#f97316',
    bgColor: '#fed7aa',
    fontColor: '#ea580c',
    slug: 'equipamentos-construcao',
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
}

export const mockCategory = {
  id: '1',
  name: 'Equipamentos de Construção',
  description: 'Equipamentos essenciais para construção civil',
  icon: 'Hammer',
  iconColor: '#f97316',
  bgColor: '#fed7aa',
  fontColor: '#ea580c',
  slug: 'equipamentos-construcao',
  equipments: [mockEquipment],
  _count: { equipments: 5 },
}

export const mockQuote = {
  id: '1',
  customerName: 'João Silva',
  customerEmail: 'joao@exemplo.com',
  customerPhone: '(11) 99999-9999',
  items: [
    {
      equipmentId: '1',
      equipment: mockEquipment,
      quantity: 2,
      days: 7,
      pricePerDay: 75.0,
      total: 1050.0,
    },
  ],
  total: 1050.0,
  status: 'PENDING' as const,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockSettings = {
  siteName: 'GB Locações',
  siteDescription:
    'Equipamentos para construção civil - Locação com qualidade e confiança',
  primaryColor: '#f97316',
  secondaryColor: '#0f172a',
  contactPhone: '(51) 2313-6262',
  contactEmail: 'contato@gblocacoes.com',
  address: 'Porto Alegre, RS',
  whatsappNumber: '5551999999999',
  businessHours: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h',
}
