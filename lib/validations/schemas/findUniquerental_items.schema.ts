import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema'
import { rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema'
import { rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema'

export const rental_itemsFindUniqueSchema: z.ZodType<Prisma.rental_itemsFindUniqueArgs> =
  z
    .object({
      select: rental_itemsSelectObjectSchema.optional(),
      include: rental_itemsIncludeObjectSchema.optional(),
      where: rental_itemsWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsFindUniqueArgs>

export const rental_itemsFindUniqueZodSchema = z
  .object({
    select: rental_itemsSelectObjectSchema.optional(),
    include: rental_itemsIncludeObjectSchema.optional(),
    where: rental_itemsWhereUniqueInputObjectSchema,
  })
  .strict()
