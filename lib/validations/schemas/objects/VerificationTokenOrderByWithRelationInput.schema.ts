import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const VerificationTokenOrderByWithRelationInputObjectSchema: z.ZodType<
  Prisma.VerificationTokenOrderByWithRelationInput,
  Prisma.VerificationTokenOrderByWithRelationInput
> = z
  .object({
    identifier: SortOrderSchema.optional(),
    token: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
export const VerificationTokenOrderByWithRelationInputObjectZodSchema = z
  .object({
    identifier: SortOrderSchema.optional(),
    token: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
