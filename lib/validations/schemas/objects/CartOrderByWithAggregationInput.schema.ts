/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CartCountOrderByAggregateInputObjectSchema as CartCountOrderByAggregateInputObjectSchema } from './CartCountOrderByAggregateInput.schema'
import { CartMaxOrderByAggregateInputObjectSchema as CartMaxOrderByAggregateInputObjectSchema } from './CartMaxOrderByAggregateInput.schema'
import { CartMinOrderByAggregateInputObjectSchema as CartMinOrderByAggregateInputObjectSchema } from './CartMinOrderByAggregateInput.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => CartCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z.lazy(() => CartMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => CartMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict()
export const CartOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CartOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CartOrderByWithAggregationInput>
export const CartOrderByWithAggregationInputObjectZodSchema = makeSchema()
