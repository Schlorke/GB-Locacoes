import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SessionCountOrderByAggregateInputObjectSchema } from './SessionCountOrderByAggregateInput.schema'
import { SessionMaxOrderByAggregateInputObjectSchema } from './SessionMaxOrderByAggregateInput.schema'
import { SessionMinOrderByAggregateInputObjectSchema } from './SessionMinOrderByAggregateInput.schema'

export const SessionOrderByWithAggregationInputObjectSchema: z.ZodType<
  Prisma.SessionOrderByWithAggregationInput,
  Prisma.SessionOrderByWithAggregationInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
    _count: z
      .lazy(() => SessionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()
export const SessionOrderByWithAggregationInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
    _count: z
      .lazy(() => SessionCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()
