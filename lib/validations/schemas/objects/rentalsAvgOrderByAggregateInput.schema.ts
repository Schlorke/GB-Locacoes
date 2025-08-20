import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rentalsAvgOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.rentalsAvgOrderByAggregateInput,
  Prisma.rentalsAvgOrderByAggregateInput
> = z
  .object({
    total: SortOrderSchema.optional(),
  })
  .strict()
export const rentalsAvgOrderByAggregateInputObjectZodSchema = z
  .object({
    total: SortOrderSchema.optional(),
  })
  .strict()
