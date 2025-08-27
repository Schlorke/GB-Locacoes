import { z } from 'zod'
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema'
import { QuoteCreateManyInputObjectSchema } from './objects/QuoteCreateManyInput.schema'

export const QuoteCreateManyAndReturnSchema = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    data: z.union([
      QuoteCreateManyInputObjectSchema,
      z.array(QuoteCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
