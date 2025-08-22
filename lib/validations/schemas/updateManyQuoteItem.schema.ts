import { z } from 'zod';
import { QuoteItemUpdateManyMutationInputObjectSchema } from './objects/QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'

export const QuoteItemUpdateManySchema = z.object({ data: QuoteItemUpdateManyMutationInputObjectSchema, where: QuoteItemWhereInputObjectSchema.optional()  })