import { z } from 'zod'
import { QuoteUpdateManyMutationInputObjectSchema } from './objects/QuoteUpdateManyMutationInput.schema'
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema'

export const QuoteUpdateManySchema = z.object({
  data: QuoteUpdateManyMutationInputObjectSchema,
  where: QuoteWhereInputObjectSchema.optional(),
})
