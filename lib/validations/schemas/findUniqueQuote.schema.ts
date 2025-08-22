import { z } from 'zod';
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'

export const QuoteFindUniqueSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), where: QuoteWhereUniqueInputObjectSchema })