/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () =>
  z
    .object({
      total: SortOrderSchema.optional(),
    })
    .strict()
export const QuoteAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteAvgOrderByAggregateInput>
export const QuoteAvgOrderByAggregateInputObjectZodSchema = makeSchema()
