import { z } from 'zod';
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteUpdateInputObjectSchema } from './objects/QuoteUpdateInput.schema';
import { QuoteUncheckedUpdateInputObjectSchema } from './objects/QuoteUncheckedUpdateInput.schema';
import { QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'

export const QuoteUpdateOneSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), data: z.union([QuoteUpdateInputObjectSchema, QuoteUncheckedUpdateInputObjectSchema]), where: QuoteWhereUniqueInputObjectSchema  })