import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

export const SessionOrderByWithRelationInputObjectSchema: z.ZodType<
  Prisma.SessionOrderByWithRelationInput,
  Prisma.SessionOrderByWithRelationInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict()
export const SessionOrderByWithRelationInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    sessionToken: SortOrderSchema.optional(),
    userId: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict()
