import { z } from 'zod'

// Esquemas públicos para a API
export const EquipmentPublicSchema = z.object({
  id: z.string().describe('ID único do equipamento'),
  name: z.string().describe('Nome do equipamento'),
  description: z.string().nullable().optional().describe('Descrição do equipamento'),
  pricePerDay: z.number().positive().describe('Preço por dia'),
  categoryId: z.string().optional().describe('ID da categoria'),
  category: z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string().nullable().optional(),
    iconColor: z.string().optional(),
    bgColor: z.string().optional(),
    fontColor: z.string().optional(),
  }).optional().describe('Categoria completa (quando expandida)'),
  imageUrl: z.string().nullable().optional().describe('URL da imagem principal'),
  images: z.array(z.string()).optional().describe('URLs das imagens'),
  isAvailable: z.boolean().describe('Disponibilidade'),
  specifications: z.record(z.string(), z.string()).optional().describe('Especificações técnicas'),
  reviews: z.array(z.any()).optional().describe('Avaliações'),
  createdAt: z.string().or(z.date()).optional().describe('Data de criação'),
  updatedAt: z.string().or(z.date()).optional().describe('Data de atualização'),
}).refine(
  (data) => data.categoryId || data.category,
  'Deve ter categoryId ou category'
)

export const CategoryPublicSchema = z.object({
  id: z.string().describe('ID único da categoria'),
  name: z.string().describe('Nome da categoria'),
  description: z.string().optional().describe('Descrição da categoria'),
  icon: z.string().optional().describe('Ícone da categoria'),
  iconColor: z.string().optional().describe('Cor do ícone'),
  bgColor: z.string().optional().describe('Cor de fundo'),
  fontColor: z.string().optional().describe('Cor da fonte'),
  slug: z.string().optional().describe('Slug da categoria'),
  _count: z.object({
    equipments: z.number().optional(),
  }).optional().describe('Contadores'),
  createdAt: z.string().or(z.date()).optional().describe('Data de criação'),
  updatedAt: z.string().or(z.date()).optional().describe('Data de atualização'),
})

// Esquemas para formulários de contato
export const ContactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').describe('Nome completo'),
  email: z.string().email('Email inválido').describe('Email para contato'),
  phone: z.string().optional().describe('Telefone para contato'),
  cpf: z.string().optional().describe('CPF do cliente'),
  cnpj: z.string().optional().describe('CNPJ da empresa'),
  cep: z.string().optional().describe('CEP do cliente'),
  company: z.string().optional().describe('Empresa/Construtora'),
  equipment: z.string().optional().describe('Equipamento de interesse'),
  message: z.string().min(1, 'Mensagem é obrigatória').describe('Mensagem'),
})

// Esquema para endereço de entrega
const DeliveryAddressSchema = z.object({
  cep: z.string().describe('CEP'),
  logradouro: z.string().describe('Logradouro'),
  numero: z.string().describe('Número'),
  complemento: z.string().optional().describe('Complemento'),
  bairro: z.string().describe('Bairro'),
  cidade: z.string().describe('Cidade'),
  estado: z.string().describe('Estado'),
})

// Esquemas para orçamentos
export const QuoteRequestSchema = z.object({
  customerName: z.string().min(1, 'Nome é obrigatório').describe('Nome do cliente'),
  customerEmail: z.string().email('Email inválido').describe('Email do cliente'),
  customerPhone: z.string().describe('Telefone do cliente'),
  cpf: z.string().optional().describe('CPF do cliente'),
  cnpj: z.string().optional().describe('CNPJ da empresa'),
  cep: z.string().optional().describe('CEP do cliente'),
  customerCompany: z.string().optional().describe('Empresa do cliente'),
  message: z.string().optional().describe('Mensagem adicional'),
  deliveryType: z.enum(['DELIVERY', 'PICKUP']).optional().describe('Tipo de entrega'),
  deliveryAddress: DeliveryAddressSchema.optional().describe('Endereço de entrega'),
  items: z.array(z.object({
    equipmentId: z.string().describe('ID do equipamento'),
    quantity: z.number().positive().describe('Quantidade'),
    days: z.number().positive().describe('Dias de locação'),
    startDate: z.union([z.string(), z.date()]).optional().describe('Data de início da locação'),
    endDate: z.union([z.string(), z.date()]).optional().describe('Data de fim da locação'),
    includeWeekends: z.boolean().optional().describe('Incluir finais de semana na contagem'),
  })).min(1, 'Selecione pelo menos um equipamento').describe('Itens do orçamento'),
})

// Esquemas de resposta de erro
export const ErrorSchema = z.object({
  error: z.string().describe('Mensagem de erro'),
  message: z.string().optional().describe('Detalhes do erro'),
  status: z.number().optional().describe('Código de status HTTP'),
})

// Esquemas de resposta de sucesso
export const SuccessSchema = z.object({
  success: z.boolean().describe('Indica sucesso da operação'),
  message: z.string().describe('Mensagem de sucesso'),
  data: z.unknown().optional().describe('Dados da resposta'),
})

// Esquemas para paginação
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1).describe('Página atual'),
  limit: z.number().int().positive().max(100).default(10).describe('Itens por página'),
  total: z.number().int().nonnegative().describe('Total de itens'),
  totalPages: z.number().int().nonnegative().describe('Total de páginas'),
})

// Tipos TypeScript derivados dos esquemas
export type EquipmentPublic = z.infer<typeof EquipmentPublicSchema>
export type CategoryPublic = z.infer<typeof CategoryPublicSchema>
export type ContactRequest = z.infer<typeof ContactSchema>
export type QuoteRequest = z.infer<typeof QuoteRequestSchema>
export type ApiError = z.infer<typeof ErrorSchema>
export type ApiSuccess = z.infer<typeof SuccessSchema>
export type Pagination = z.infer<typeof PaginationSchema>

// Esquemas de resposta paginada
export const PaginatedEquipmentsSchema = z.object({
  data: z.array(EquipmentPublicSchema),
  pagination: PaginationSchema,
})

export const PaginatedCategoriesSchema = z.object({
  data: z.array(CategoryPublicSchema),
  pagination: PaginationSchema,
})

export type PaginatedEquipments = z.infer<typeof PaginatedEquipmentsSchema>
export type PaginatedCategories = z.infer<typeof PaginatedCategoriesSchema>
