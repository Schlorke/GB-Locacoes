import { z } from 'zod'
import { rentalsCreateManyInputObjectSchema } from './objects/rentalsCreateManyInput.schema'

export const rentalsCreateManySchema = z.object({
  data: z.union([
    rentalsCreateManyInputObjectSchema,
    z.array(rentalsCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
