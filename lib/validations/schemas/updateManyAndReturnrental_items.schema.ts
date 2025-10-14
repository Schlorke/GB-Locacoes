/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rental_itemsSelectObjectSchema as rental_itemsSelectObjectSchema } from './objects/rental_itemsSelect.schema'
import { rental_itemsUpdateManyMutationInputObjectSchema as rental_itemsUpdateManyMutationInputObjectSchema } from './objects/rental_itemsUpdateManyMutationInput.schema'
import { rental_itemsWhereInputObjectSchema as rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema'

export const rental_itemsUpdateManyAndReturnSchema: z.ZodType<Prisma.rental_itemsUpdateManyAndReturnArgs> =
  z
    .object({
      select: rental_itemsSelectObjectSchema.optional(),
      data: rental_itemsUpdateManyMutationInputObjectSchema,
      where: rental_itemsWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsUpdateManyAndReturnArgs>

export const rental_itemsUpdateManyAndReturnZodSchema = z
  .object({
    select: rental_itemsSelectObjectSchema.optional(),
    data: rental_itemsUpdateManyMutationInputObjectSchema,
    where: rental_itemsWhereInputObjectSchema.optional(),
  })
  .strict()
