import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict()
export const rentalsOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.rentalsOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsOrderByRelationAggregateInput>
export const rentalsOrderByRelationAggregateInputObjectZodSchema = makeSchema()
