/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { EquipmentOrderByWithRelationInputObjectSchema as EquipmentOrderByWithRelationInputObjectSchema } from './objects/EquipmentOrderByWithRelationInput.schema'
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema'
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema'
import { EquipmentCountAggregateInputObjectSchema as EquipmentCountAggregateInputObjectSchema } from './objects/EquipmentCountAggregateInput.schema'

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
