import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      total: SortOrderSchema.optional(),
    })
    .strict()
export const QuoteAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteAvgOrderByAggregateInput>
export const QuoteAvgOrderByAggregateInputObjectZodSchema = makeSchema()
