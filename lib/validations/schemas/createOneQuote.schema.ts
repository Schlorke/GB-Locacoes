import { z } from 'zod';
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteCreateInputObjectSchema } from './objects/QuoteCreateInput.schema';
import { QuoteUncheckedCreateInputObjectSchema } from './objects/QuoteUncheckedCreateInput.schema';

export const QuoteCreateOneSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), data: z.union([QuoteCreateInputObjectSchema, QuoteUncheckedCreateInputObjectSchema])  })