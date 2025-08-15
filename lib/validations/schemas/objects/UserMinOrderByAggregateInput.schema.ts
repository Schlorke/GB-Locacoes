import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const UserMinOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.UserMinOrderByAggregateInput,
  Prisma.UserMinOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    email: SortOrderSchema.optional(),
    password: SortOrderSchema.optional(),
    role: SortOrderSchema.optional(),
    emailVerified: SortOrderSchema.optional(),
    image: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
  })
  .strict()
export const UserMinOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    email: SortOrderSchema.optional(),
    password: SortOrderSchema.optional(),
    role: SortOrderSchema.optional(),
    emailVerified: SortOrderSchema.optional(),
    image: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
  })
  .strict()
