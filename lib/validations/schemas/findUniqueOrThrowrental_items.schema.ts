/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema'
import { rental_itemsIncludeObjectSchema as rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema'
import { rental_itemsWhereUniqueInputObjectSchema as rental_itemsWhereUniqueInputObjectSchema } from './objects/rental_itemsWhereUniqueInput.schema'

export const rental_itemsFindUniqueOrThrowSchema: z.ZodType<Prisma.rental_itemsFindUniqueOrThrowArgs> =
  z
    .object({
      select: rental_itemsSelectObjectSchema.optional(),
      include: rental_itemsIncludeObjectSchema.optional(),
      where: rental_itemsWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsFindUniqueOrThrowArgs>

export const rental_itemsFindUniqueOrThrowZodSchema = z
  .object({
    select: rental_itemsSelectObjectSchema.optional(),
    include: rental_itemsIncludeObjectSchema.optional(),
    where: rental_itemsWhereUniqueInputObjectSchema,
  })
  .strict()
