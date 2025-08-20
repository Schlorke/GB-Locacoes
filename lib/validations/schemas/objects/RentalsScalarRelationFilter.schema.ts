import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

export const RentalsScalarRelationFilterObjectSchema: z.ZodType<
  Prisma.RentalsScalarRelationFilter,
  Prisma.RentalsScalarRelationFilter
> = z
  .object({
    is: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  })
  .strict()
export const RentalsScalarRelationFilterObjectZodSchema = z
  .object({
    is: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  })
  .strict()
