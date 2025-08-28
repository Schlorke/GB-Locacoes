import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { CategoryCountOrderByAggregateInputObjectSchema } from './CategoryCountOrderByAggregateInput.schema'
import { CategoryMaxOrderByAggregateInputObjectSchema } from './CategoryMaxOrderByAggregateInput.schema'
import { CategoryMinOrderByAggregateInputObjectSchema } from './CategoryMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      icon: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      iconColor: SortOrderSchema.optional(),
      bgColor: SortOrderSchema.optional(),
      fontColor: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => CategoryCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => CategoryMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => CategoryMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const CategoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CategoryOrderByWithAggregationInput>
export const CategoryOrderByWithAggregationInputObjectZodSchema = makeSchema()
