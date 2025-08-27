import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      total: SortOrderSchema.optional(),
    })
    .strict()
export const rentalsAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsAvgOrderByAggregateInput>
export const rentalsAvgOrderByAggregateInputObjectZodSchema = makeSchema()
