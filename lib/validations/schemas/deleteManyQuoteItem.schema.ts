import { z } from 'zod'
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'

export const QuoteItemDeleteManySchema = z.object({
  where: QuoteItemWhereInputObjectSchema.optional(),
})
