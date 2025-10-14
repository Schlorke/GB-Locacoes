/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { rental_itemsUpdateManyMutationInputObjectSchema as rental_itemsUpdateManyMutationInputObjectSchema } from './objects/rental_itemsUpdateManyMutationInput.schema'
import { rental_itemsWhereInputObjectSchema as rental_itemsWhereInputObjectSchema } from './objects/rental_itemsWhereInput.schema'

export const rental_itemsUpdateManySchema: z.ZodType<Prisma.rental_itemsUpdateManyArgs> =
  z
    .object({
      data: rental_itemsUpdateManyMutationInputObjectSchema,
      where: rental_itemsWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.rental_itemsUpdateManyArgs>

export const rental_itemsUpdateManyZodSchema = z
  .object({
    data: rental_itemsUpdateManyMutationInputObjectSchema,
    where: rental_itemsWhereInputObjectSchema.optional(),
  })
  .strict()
