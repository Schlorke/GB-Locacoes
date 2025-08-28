import { z } from 'zod'
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema'
import { QuoteItemCreateInputObjectSchema } from './objects/QuoteItemCreateInput.schema'
import { QuoteItemUncheckedCreateInputObjectSchema } from './objects/QuoteItemUncheckedCreateInput.schema'

export const QuoteItemCreateOneSchema = z.object({
  select: QuoteItemSelectObjectSchema.optional(),
  include: QuoteItemIncludeObjectSchema.optional(),
  data: z.union([
    QuoteItemCreateInputObjectSchema,
    QuoteItemUncheckedCreateInputObjectSchema,
  ]),
})
