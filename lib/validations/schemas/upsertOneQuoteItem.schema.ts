import { z } from 'zod';
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';
import { QuoteItemCreateInputObjectSchema } from './objects/QuoteItemCreateInput.schema';
import { QuoteItemUncheckedCreateInputObjectSchema } from './objects/QuoteItemUncheckedCreateInput.schema';
import { QuoteItemUpdateInputObjectSchema } from './objects/QuoteItemUpdateInput.schema';
import { QuoteItemUncheckedUpdateInputObjectSchema } from './objects/QuoteItemUncheckedUpdateInput.schema';

export const QuoteItemUpsertSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), where: QuoteItemWhereUniqueInputObjectSchema, create: z.union([ QuoteItemCreateInputObjectSchema, QuoteItemUncheckedCreateInputObjectSchema ]), update: z.union([ QuoteItemUpdateInputObjectSchema, QuoteItemUncheckedUpdateInputObjectSchema ])  })