import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema'
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema'
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema'
import { EquipmentCountAggregateInputObjectSchema } from './objects/EquipmentCountAggregateInput.schema'

export const EquipmentCountSchema: z.ZodType<Prisma.EquipmentCountArgs> = z
  .object({
    orderBy: z
      .union([
        EquipmentOrderByWithRelationInputObjectSchema,
        EquipmentOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: EquipmentWhereInputObjectSchema.optional(),
    cursor: EquipmentWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), EquipmentCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.EquipmentCountArgs>

export const EquipmentCountZodSchema = z
  .object({
    orderBy: z
      .union([
        EquipmentOrderByWithRelationInputObjectSchema,
        EquipmentOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: EquipmentWhereInputObjectSchema.optional(),
    cursor: EquipmentWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), EquipmentCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict()
