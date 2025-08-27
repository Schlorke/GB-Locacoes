import { z } from 'zod'
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema'
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'

export const QuoteItemFindUniqueOrThrowSchema = z.object({
  select: QuoteItemSelectObjectSchema.optional(),
  include: QuoteItemIncludeObjectSchema.optional(),
  where: QuoteItemWhereUniqueInputObjectSchema,
})
