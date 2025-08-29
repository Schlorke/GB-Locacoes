import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsWhereInputObjectSchema } from './rental_itemsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      every: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
      some: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
      none: z.lazy(() => rental_itemsWhereInputObjectSchema).optional(),
    })
    .strict()
export const Rental_itemsListRelationFilterObjectSchema: z.ZodType<Prisma.Rental_itemsListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.Rental_itemsListRelationFilter>
export const Rental_itemsListRelationFilterObjectZodSchema = makeSchema()
