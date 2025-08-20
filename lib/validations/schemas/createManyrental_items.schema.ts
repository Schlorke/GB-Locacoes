import { z } from 'zod'
import { rental_itemsCreateManyInputObjectSchema } from './objects/rental_itemsCreateManyInput.schema'

export const rental_itemsCreateManySchema = z.object({
  data: z.union([
    rental_itemsCreateManyInputObjectSchema,
    z.array(rental_itemsCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
