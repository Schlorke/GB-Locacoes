import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema'
import { SettingOrderByWithAggregationInputObjectSchema } from './objects/SettingOrderByWithAggregationInput.schema'
import { SettingScalarWhereWithAggregatesInputObjectSchema } from './objects/SettingScalarWhereWithAggregatesInput.schema'
import { SettingScalarFieldEnumSchema } from './enums/SettingScalarFieldEnum.schema'
import { SettingCountAggregateInputObjectSchema } from './objects/SettingCountAggregateInput.schema'
import { SettingMinAggregateInputObjectSchema } from './objects/SettingMinAggregateInput.schema'
import { SettingMaxAggregateInputObjectSchema } from './objects/SettingMaxAggregateInput.schema'

export const SettingGroupBySchema: z.ZodType<Prisma.SettingGroupByArgs> = z
  .object({
    where: SettingWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithAggregationInputObjectSchema,
        SettingOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: SettingScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(SettingScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), SettingCountAggregateInputObjectSchema])
      .optional(),
    _min: SettingMinAggregateInputObjectSchema.optional(),
    _max: SettingMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingGroupByArgs>

export const SettingGroupByZodSchema = z
  .object({
    where: SettingWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        SettingOrderByWithAggregationInputObjectSchema,
        SettingOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: SettingScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(SettingScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), SettingCountAggregateInputObjectSchema])
      .optional(),
    _min: SettingMinAggregateInputObjectSchema.optional(),
    _max: SettingMaxAggregateInputObjectSchema.optional(),
  })
  .strict()
