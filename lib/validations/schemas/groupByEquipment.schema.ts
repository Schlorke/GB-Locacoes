/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema'
import { EquipmentOrderByWithAggregationInputObjectSchema as EquipmentOrderByWithAggregationInputObjectSchema } from './objects/EquipmentOrderByWithAggregationInput.schema'
import { EquipmentScalarWhereWithAggregatesInputObjectSchema as EquipmentScalarWhereWithAggregatesInputObjectSchema } from './objects/EquipmentScalarWhereWithAggregatesInput.schema'
import { EquipmentScalarFieldEnumSchema } from './enums/EquipmentScalarFieldEnum.schema'
import { EquipmentCountAggregateInputObjectSchema as EquipmentCountAggregateInputObjectSchema } from './objects/EquipmentCountAggregateInput.schema'
import { EquipmentMinAggregateInputObjectSchema as EquipmentMinAggregateInputObjectSchema } from './objects/EquipmentMinAggregateInput.schema'
import { EquipmentMaxAggregateInputObjectSchema as EquipmentMaxAggregateInputObjectSchema } from './objects/EquipmentMaxAggregateInput.schema'
import { EquipmentAvgAggregateInputObjectSchema as EquipmentAvgAggregateInputObjectSchema } from './objects/EquipmentAvgAggregateInput.schema'
import { EquipmentSumAggregateInputObjectSchema as EquipmentSumAggregateInputObjectSchema } from './objects/EquipmentSumAggregateInput.schema'

export const EquipmentGroupBySchema: z.ZodType<Prisma.EquipmentGroupByArgs> = z
  .object({
    where: EquipmentWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        EquipmentOrderByWithAggregationInputObjectSchema,
        EquipmentOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: EquipmentScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(EquipmentScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), EquipmentCountAggregateInputObjectSchema])
      .optional(),
    _min: EquipmentMinAggregateInputObjectSchema.optional(),
    _max: EquipmentMaxAggregateInputObjectSchema.optional(),
    _avg: EquipmentAvgAggregateInputObjectSchema.optional(),
    _sum: EquipmentSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.EquipmentGroupByArgs>

export const EquipmentGroupByZodSchema = z
  .object({
    where: EquipmentWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        EquipmentOrderByWithAggregationInputObjectSchema,
        EquipmentOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: EquipmentScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(EquipmentScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), EquipmentCountAggregateInputObjectSchema])
      .optional(),
    _min: EquipmentMinAggregateInputObjectSchema.optional(),
    _max: EquipmentMaxAggregateInputObjectSchema.optional(),
    _avg: EquipmentAvgAggregateInputObjectSchema.optional(),
    _sum: EquipmentSumAggregateInputObjectSchema.optional(),
  })
  .strict()
