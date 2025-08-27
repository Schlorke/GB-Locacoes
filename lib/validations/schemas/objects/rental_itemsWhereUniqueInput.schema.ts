import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
    })
    .strict()
export const rental_itemsWhereUniqueInputObjectSchema: z.ZodType<Prisma.rental_itemsWhereUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsWhereUniqueInput>
export const rental_itemsWhereUniqueInputObjectZodSchema = makeSchema()
