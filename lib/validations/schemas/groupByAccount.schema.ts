import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { AccountWhereInputObjectSchema } from './objects/AccountWhereInput.schema'
import { AccountOrderByWithAggregationInputObjectSchema } from './objects/AccountOrderByWithAggregationInput.schema'
import { AccountScalarWhereWithAggregatesInputObjectSchema } from './objects/AccountScalarWhereWithAggregatesInput.schema'
import { AccountScalarFieldEnumSchema } from './enums/AccountScalarFieldEnum.schema'
import { AccountCountAggregateInputObjectSchema } from './objects/AccountCountAggregateInput.schema'
import { AccountMinAggregateInputObjectSchema } from './objects/AccountMinAggregateInput.schema'
import { AccountMaxAggregateInputObjectSchema } from './objects/AccountMaxAggregateInput.schema'
import { AccountAvgAggregateInputObjectSchema } from './objects/AccountAvgAggregateInput.schema'
import { AccountSumAggregateInputObjectSchema } from './objects/AccountSumAggregateInput.schema'

export const AccountGroupBySchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputObjectSchema,
        AccountOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: AccountScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(AccountScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), AccountCountAggregateInputObjectSchema])
      .optional(),
    _min: AccountMinAggregateInputObjectSchema.optional(),
    _max: AccountMaxAggregateInputObjectSchema.optional(),
    _avg: AccountAvgAggregateInputObjectSchema.optional(),
    _sum: AccountSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.AccountGroupByArgs>

export const AccountGroupByZodSchema = z
  .object({
    where: AccountWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputObjectSchema,
        AccountOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: AccountScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(AccountScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), AccountCountAggregateInputObjectSchema])
      .optional(),
    _min: AccountMinAggregateInputObjectSchema.optional(),
    _max: AccountMaxAggregateInputObjectSchema.optional(),
    _avg: AccountAvgAggregateInputObjectSchema.optional(),
    _sum: AccountSumAggregateInputObjectSchema.optional(),
  })
  .strict()
