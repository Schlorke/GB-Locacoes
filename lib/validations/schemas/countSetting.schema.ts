import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { SettingOrderByWithRelationInputObjectSchema } from './objects/SettingOrderByWithRelationInput.schema'
import { SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema'
import { SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema'
import { SettingCountAggregateInputObjectSchema } from './objects/SettingCountAggregateInput.schema'

export const SettingCountSchema: z.ZodType<Prisma.SettingCountArgs> = z
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
    select: z
      .union([z.literal(true), SettingCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.SettingCountArgs>

export const SettingCountZodSchema = z
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
    select: z
      .union([z.literal(true), SettingCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict()
