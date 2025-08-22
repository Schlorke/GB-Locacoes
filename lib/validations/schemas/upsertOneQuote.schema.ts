import { z } from 'zod';
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema';
import { QuoteCreateInputObjectSchema } from './objects/QuoteCreateInput.schema';
import { QuoteUncheckedCreateInputObjectSchema } from './objects/QuoteUncheckedCreateInput.schema';
import { QuoteUpdateInputObjectSchema } from './objects/QuoteUpdateInput.schema';
import { QuoteUncheckedUpdateInputObjectSchema } from './objects/QuoteUncheckedUpdateInput.schema'

export const QuoteUpsertSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), where: QuoteWhereUniqueInputObjectSchema, create: z.union([ QuoteCreateInputObjectSchema, QuoteUncheckedCreateInputObjectSchema ]), update: z.union([ QuoteUpdateInputObjectSchema, QuoteUncheckedUpdateInputObjectSchema ])  })