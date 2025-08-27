import { z } from 'zod'
import { QuoteCreateManyInputObjectSchema } from './objects/QuoteCreateManyInput.schema'

export const QuoteCreateManySchema = z.object({
  data: z.union([
    QuoteCreateManyInputObjectSchema,
    z.array(QuoteCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
