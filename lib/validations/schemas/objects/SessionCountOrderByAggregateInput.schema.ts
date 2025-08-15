import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const SessionCountOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.SessionCountOrderByAggregateInput,
  Prisma.SessionCountOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
export const SessionCountOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
