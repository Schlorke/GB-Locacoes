import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rentalsMaxOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.rentalsMaxOrderByAggregateInput,
  Prisma.rentalsMaxOrderByAggregateInput
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
export const rentalsMaxOrderByAggregateInputObjectZodSchema = z
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
