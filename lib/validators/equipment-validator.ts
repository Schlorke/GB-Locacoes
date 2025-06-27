import { z } from "zod"

export const CreateEquipmentSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(255),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  specifications: z.record(z.any()).optional(), // Ou um schema mais específico se souber a estrutura
  pricePerDay: z.number().positive("Preço por dia deve ser positivo"),
  categoryId: z.string().cuid("ID da categoria inválido"),
  images: z.array(z.string().url("URL da imagem inválida")).optional().default([]),
  isAvailable: z.boolean().optional().default(true),
})

export type CreateEquipmentInput = z.infer<typeof CreateEquipmentSchema>

export const UpdateEquipmentSchema = CreateEquipmentSchema.partial().extend({
  id: z.string().cuid("ID do equipamento inválido"),
})

export type UpdateEquipmentInput = z.infer<typeof UpdateEquipmentSchema>
