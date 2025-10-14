/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { rental_itemsCreateManyEquipmentsInputObjectSchema as rental_itemsCreateManyEquipmentsInputObjectSchema } from './rental_itemsCreateManyEquipmentsInput.schema'

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema),
        z.lazy(() => rental_itemsCreateManyEquipmentsInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()
export const rental_itemsCreateManyEquipmentsInputEnvelopeObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyEquipmentsInputEnvelope>
export const rental_itemsCreateManyEquipmentsInputEnvelopeObjectZodSchema =
  makeSchema()
