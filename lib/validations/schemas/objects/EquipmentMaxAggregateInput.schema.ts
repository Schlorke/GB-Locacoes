import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.literal(true).optional(),
      name: z.literal(true).optional(),
      description: z.literal(true).optional(),
      pricePerDay: z.literal(true).optional(),
      available: z.literal(true).optional(),
      categoryId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      category_id: z.literal(true).optional(),
    })
    .strict()
export const EquipmentMaxAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentMaxAggregateInputType>
export const EquipmentMaxAggregateInputObjectZodSchema = makeSchema()
