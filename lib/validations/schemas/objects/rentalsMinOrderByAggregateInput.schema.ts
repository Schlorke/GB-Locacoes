import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rentalsMinOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.rentalsMinOrderByAggregateInput,
  Prisma.rentalsMinOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    startdate: SortOrderSchema.optional(),
    enddate: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
    status: SortOrderSchema.optional(),
    userid: SortOrderSchema.optional(),
    createdat: SortOrderSchema.optional(),
    updatedat: SortOrderSchema.optional(),
  })
  .strict()
export const rentalsMinOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    startdate: SortOrderSchema.optional(),
    enddate: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
    status: SortOrderSchema.optional(),
    userid: SortOrderSchema.optional(),
    createdat: SortOrderSchema.optional(),
    updatedat: SortOrderSchema.optional(),
  })
  .strict()
