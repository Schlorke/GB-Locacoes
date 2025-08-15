import { z } from 'zod';
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemUpdateInputObjectSchema } from './objects/QuoteItemUpdateInput.schema';
import { QuoteItemUncheckedUpdateInputObjectSchema } from './objects/QuoteItemUncheckedUpdateInput.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'

export const QuoteItemUpdateOneSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: z.union([QuoteItemUpdateInputObjectSchema, QuoteItemUncheckedUpdateInputObjectSchema]), where: QuoteItemWhereUniqueInputObjectSchema  })