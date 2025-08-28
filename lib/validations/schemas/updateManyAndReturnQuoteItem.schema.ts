import { z } from 'zod'
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemUpdateManyMutationInputObjectSchema } from './objects/QuoteItemUpdateManyMutationInput.schema'
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'

export const QuoteItemUpdateManyAndReturnSchema = z
  .object({
    select: QuoteItemSelectObjectSchema.optional(),
    data: QuoteItemUpdateManyMutationInputObjectSchema,
    where: QuoteItemWhereInputObjectSchema.optional(),
  })
  .strict()
