import { z } from 'zod';
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemUpdateManyMutationInputObjectSchema } from './objects/QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'

export const QuoteItemUpdateManyAndReturnSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: QuoteItemUpdateManyMutationInputObjectSchema, where: QuoteItemWhereInputObjectSchema.optional()  })