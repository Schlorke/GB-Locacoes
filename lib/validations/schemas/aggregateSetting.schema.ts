import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { SettingOrderByWithRelationInputObjectSchema } from './objects/SettingOrderByWithRelationInput.schema'
import { SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema'
import { SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema'
import { SettingCountAggregateInputObjectSchema } from './objects/SettingCountAggregateInput.schema'
import { SettingMinAggregateInputObjectSchema } from './objects/SettingMinAggregateInput.schema'
import { SettingMaxAggregateInputObjectSchema } from './objects/SettingMaxAggregateInput.schema'

export const SettingAggregateSchema: z.ZodType<Prisma.SettingAggregateArgs> = z
  .object({
    orderBy: z
      .union([
        SettingOrderByWithRelationInputObjectSchema,
        SettingOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingWhereInputObjectSchema.optional(),
    cursor: SettingWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), SettingCountAggregateInputObjectSchema])
      .optional(),
    _min: SettingMinAggregateInputObjectSchema.optional(),
    _max: SettingMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingAggregateArgs>

export const SettingAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        SettingOrderByWithRelationInputObjectSchema,
        SettingOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: SettingWhereInputObjectSchema.optional(),
    cursor: SettingWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), SettingCountAggregateInputObjectSchema])
      .optional(),
    _min: SettingMinAggregateInputObjectSchema.optional(),
    _max: SettingMaxAggregateInputObjectSchema.optional(),
  })
  .strict()
