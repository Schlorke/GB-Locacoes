/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { AccountCountOrderByAggregateInputObjectSchema as AccountCountOrderByAggregateInputObjectSchema } from './AccountCountOrderByAggregateInput.schema'
import { AccountAvgOrderByAggregateInputObjectSchema as AccountAvgOrderByAggregateInputObjectSchema } from './AccountAvgOrderByAggregateInput.schema'
import { AccountMaxOrderByAggregateInputObjectSchema as AccountMaxOrderByAggregateInputObjectSchema } from './AccountMaxOrderByAggregateInput.schema'
import { AccountMinOrderByAggregateInputObjectSchema as AccountMinOrderByAggregateInputObjectSchema } from './AccountMinOrderByAggregateInput.schema'
import { AccountSumOrderByAggregateInputObjectSchema as AccountSumOrderByAggregateInputObjectSchema } from './AccountSumOrderByAggregateInput.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      type: SortOrderSchema.optional(),
      provider: SortOrderSchema.optional(),
      providerAccountId: SortOrderSchema.optional(),
      refresh_token: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      access_token: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      expires_at: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      token_type: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      scope: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      id_token: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      session_state: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      _count: z
        .lazy(() => AccountCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => AccountAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => AccountMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => AccountMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => AccountSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const AccountOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.AccountOrderByWithAggregationInput>
export const AccountOrderByWithAggregationInputObjectZodSchema = makeSchema()
