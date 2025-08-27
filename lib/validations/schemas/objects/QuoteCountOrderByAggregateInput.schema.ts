import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      phone: SortOrderSchema.optional(),
      company: SortOrderSchema.optional(),
      message: SortOrderSchema.optional(),
      total: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict()
export const QuoteCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOrderByAggregateInput>
export const QuoteCountOrderByAggregateInputObjectZodSchema = makeSchema()
