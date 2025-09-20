import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { rental_itemsCountOrderByAggregateInputObjectSchema } from './rental_itemsCountOrderByAggregateInput.schema'
import { rental_itemsAvgOrderByAggregateInputObjectSchema } from './rental_itemsAvgOrderByAggregateInput.schema'
import { rental_itemsMaxOrderByAggregateInputObjectSchema } from './rental_itemsMaxOrderByAggregateInput.schema'
import { rental_itemsMinOrderByAggregateInputObjectSchema } from './rental_itemsMinOrderByAggregateInput.schema'
import { rental_itemsSumOrderByAggregateInputObjectSchema } from './rental_itemsSumOrderByAggregateInput.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      rentalid: SortOrderSchema.optional(),
      equipmentid: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      priceperday: SortOrderSchema.optional(),
      totaldays: SortOrderSchema.optional(),
      totalprice: SortOrderSchema.optional(),
      createdat: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      updatedat: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      _count: z
        .lazy(() => rental_itemsCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => rental_itemsAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => rental_itemsMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => rental_itemsMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => rental_itemsSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const rental_itemsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.rental_itemsOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsOrderByWithAggregationInput>
export const rental_itemsOrderByWithAggregationInputObjectZodSchema =
  makeSchema()
