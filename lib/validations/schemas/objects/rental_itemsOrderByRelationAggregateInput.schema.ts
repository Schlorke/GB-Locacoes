import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rental_itemsOrderByRelationAggregateInputObjectSchema: z.ZodType<
  Prisma.rental_itemsOrderByRelationAggregateInput,
  Prisma.rental_itemsOrderByRelationAggregateInput
> = z
  .object({
    _count: SortOrderSchema.optional(),
  })
  .strict()
export const rental_itemsOrderByRelationAggregateInputObjectZodSchema = z
  .object({
    _count: SortOrderSchema.optional(),
  })
  .strict()
