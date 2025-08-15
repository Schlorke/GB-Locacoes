import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const SessionMaxOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.SessionMaxOrderByAggregateInput,
  Prisma.SessionMaxOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
export const SessionMaxOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
