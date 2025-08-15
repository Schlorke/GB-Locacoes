import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const EquipmentCountOutputTypeSelectObjectSchema: z.ZodType<
  Prisma.EquipmentCountOutputTypeSelect,
  Prisma.EquipmentCountOutputTypeSelect
> = z
  .object({
    quoteItems: z.boolean().optional(),
    rental_items: z.boolean().optional(),
  })
  .strict()
export const EquipmentCountOutputTypeSelectObjectZodSchema = z
  .object({
    quoteItems: z.boolean().optional(),
    rental_items: z.boolean().optional(),
  })
  .strict()
