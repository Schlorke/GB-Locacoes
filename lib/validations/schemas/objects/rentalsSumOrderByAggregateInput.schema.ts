import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      total: SortOrderSchema.optional(),
    })
    .strict()
export const rentalsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsSumOrderByAggregateInput>
export const rentalsSumOrderByAggregateInputObjectZodSchema = makeSchema()
