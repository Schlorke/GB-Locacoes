import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const SessionOrderByRelationAggregateInputObjectSchema: z.ZodType<
  Prisma.SessionOrderByRelationAggregateInput,
  Prisma.SessionOrderByRelationAggregateInput
> = z
  .object({
    _count: SortOrderSchema.optional(),
  })
  .strict()
export const SessionOrderByRelationAggregateInputObjectZodSchema = z
  .object({
    _count: SortOrderSchema.optional(),
  })
  .strict()
