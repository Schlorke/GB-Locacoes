/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema'
import { rental_itemsCreateManyInputObjectSchema as rental_itemsCreateManyInputObjectSchema } from './objects/rental_itemsCreateManyInput.schema'

export const rental_itemsCreateManyAndReturnSchema: z.ZodType<Prisma.rental_itemsCreateManyAndReturnArgs> =
  z
    .object({
      select: rental_itemsSelectObjectSchema.optional(),
      data: z.union([
        rental_itemsCreateManyInputObjectSchema,
        z.array(rental_itemsCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsCreateManyAndReturnArgs>

export const rental_itemsCreateManyAndReturnZodSchema = z
  .object({
    select: rental_itemsSelectObjectSchema.optional(),
    data: z.union([
      rental_itemsCreateManyInputObjectSchema,
      z.array(rental_itemsCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
