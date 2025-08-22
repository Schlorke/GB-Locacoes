import { z } from 'zod';
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteUpdateManyMutationInputObjectSchema } from './objects/QuoteUpdateManyMutationInput.schema';
import { QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema'

export const QuoteUpdateManyAndReturnSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), data: QuoteUpdateManyMutationInputObjectSchema, where: QuoteWhereInputObjectSchema.optional()  })