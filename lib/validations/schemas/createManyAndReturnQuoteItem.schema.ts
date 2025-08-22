import { z } from 'zod';
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemCreateManyInputObjectSchema } from './objects/QuoteItemCreateManyInput.schema'

export const QuoteItemCreateManyAndReturnSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: z.union([ QuoteItemCreateManyInputObjectSchema, z.array(QuoteItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })