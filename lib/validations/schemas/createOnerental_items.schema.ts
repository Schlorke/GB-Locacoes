/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema'
import { rental_itemsIncludeObjectSchema as rental_itemsIncludeObjectSchema } from './objects/rental_itemsInclude.schema'
import { rental_itemsCreateInputObjectSchema as rental_itemsCreateInputObjectSchema } from './objects/rental_itemsCreateInput.schema'
import { rental_itemsUncheckedCreateInputObjectSchema as rental_itemsUncheckedCreateInputObjectSchema } from './objects/rental_itemsUncheckedCreateInput.schema'

export const rental_itemsCreateOneSchema: z.ZodType<Prisma.rental_itemsCreateArgs> =
  z
    .object({
      select: rental_itemsSelectObjectSchema.optional(),
      include: rental_itemsIncludeObjectSchema.optional(),
      data: z.union([
        rental_itemsCreateInputObjectSchema,
        rental_itemsUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsCreateArgs>

export const rental_itemsCreateOneZodSchema = z
  .object({
    select: rental_itemsSelectObjectSchema.optional(),
    include: rental_itemsIncludeObjectSchema.optional(),
    data: z.union([
      rental_itemsCreateInputObjectSchema,
      rental_itemsUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict()
