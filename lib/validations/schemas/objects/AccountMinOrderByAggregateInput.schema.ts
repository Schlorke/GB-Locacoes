import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const AccountMinOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.AccountMinOrderByAggregateInput,
  Prisma.AccountMinOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    type: SortOrderSchema.optional(),
    provider: SortOrderSchema.optional(),
    providerAccountId: SortOrderSchema.optional(),
    refresh_token: SortOrderSchema.optional(),
    access_token: SortOrderSchema.optional(),
    expires_at: SortOrderSchema.optional(),
    token_type: SortOrderSchema.optional(),
    scope: SortOrderSchema.optional(),
    id_token: SortOrderSchema.optional(),
    session_state: SortOrderSchema.optional(),
  })
  .strict()
export const AccountMinOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    type: SortOrderSchema.optional(),
    provider: SortOrderSchema.optional(),
    providerAccountId: SortOrderSchema.optional(),
    refresh_token: SortOrderSchema.optional(),
    access_token: SortOrderSchema.optional(),
    expires_at: SortOrderSchema.optional(),
    token_type: SortOrderSchema.optional(),
    scope: SortOrderSchema.optional(),
    id_token: SortOrderSchema.optional(),
    session_state: SortOrderSchema.optional(),
  })
  .strict()
