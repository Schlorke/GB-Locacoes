import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const rental_itemsWhereUniqueInputObjectSchema: z.ZodType<
  Prisma.rental_itemsWhereUniqueInput,
  Prisma.rental_itemsWhereUniqueInput
> = z
  .object({
    id: z.string(),
  })
  .strict()
export const rental_itemsWhereUniqueInputObjectZodSchema = z
  .object({
    id: z.string(),
  })
  .strict()
