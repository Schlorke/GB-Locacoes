import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { UserCountOrderByAggregateInputObjectSchema } from './UserCountOrderByAggregateInput.schema'
import { UserMaxOrderByAggregateInputObjectSchema } from './UserMaxOrderByAggregateInput.schema'
import { UserMinOrderByAggregateInputObjectSchema } from './UserMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: SortOrderSchema.optional(),
      name: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      email: SortOrderSchema.optional(),
      password: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      role: SortOrderSchema.optional(),
      emailVerified: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      image: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => UserCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict()
export const UserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithAggregationInput>
export const UserOrderByWithAggregationInputObjectZodSchema = makeSchema()
