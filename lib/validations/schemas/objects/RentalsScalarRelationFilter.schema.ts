/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
    })
    .strict()
export const RentalsScalarRelationFilterObjectSchema: z.ZodType<Prisma.RentalsScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RentalsScalarRelationFilter>
export const RentalsScalarRelationFilterObjectZodSchema = makeSchema()
