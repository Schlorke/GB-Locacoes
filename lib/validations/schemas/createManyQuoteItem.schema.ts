import { z } from 'zod';
import { QuoteItemCreateManyInputObjectSchema } from './objects/QuoteItemCreateManyInput.schema'

export const QuoteItemCreateManySchema = z.object({ data: z.union([ QuoteItemCreateManyInputObjectSchema, z.array(QuoteItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })