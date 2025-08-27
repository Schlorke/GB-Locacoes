import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { rentalsCountOrderByAggregateInputObjectSchema } from './rentalsCountOrderByAggregateInput.schema'
import { rentalsAvgOrderByAggregateInputObjectSchema } from './rentalsAvgOrderByAggregateInput.schema'
import { rentalsMaxOrderByAggregateInputObjectSchema } from './rentalsMaxOrderByAggregateInput.schema'
import { rentalsMinOrderByAggregateInputObjectSchema } from './rentalsMinOrderByAggregateInput.schema'
import { rentalsSumOrderByAggregateInputObjectSchema } from './rentalsSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      startdate: SortOrderSchema.optional(),
      enddate: SortOrderSchema.optional(),
      total: SortOrderSchema.optional(),
      status: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      userid: SortOrderSchema.optional(),
      createdat: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      updatedat: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      _count: z
        .lazy(() => rentalsCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => rentalsAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => rentalsMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => rentalsMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => rentalsSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const rentalsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.rentalsOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rentalsOrderByWithAggregationInput>
export const rentalsOrderByWithAggregationInputObjectZodSchema = makeSchema()
