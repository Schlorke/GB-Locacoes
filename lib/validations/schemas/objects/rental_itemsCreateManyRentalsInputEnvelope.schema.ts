import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsCreateManyRentalsInputObjectSchema } from './rental_itemsCreateManyRentalsInput.schema'

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => rental_itemsCreateManyRentalsInputObjectSchema),
        z.lazy(() => rental_itemsCreateManyRentalsInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()
export const rental_itemsCreateManyRentalsInputEnvelopeObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyRentalsInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyRentalsInputEnvelope>
export const rental_itemsCreateManyRentalsInputEnvelopeObjectZodSchema =
  makeSchema()
