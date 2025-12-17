import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteCreateManyInputObjectSchema as QuoteCreateManyInputObjectSchema } from './objects/QuoteCreateManyInput.schema';

export const QuoteCreateManyAndReturnSchema: z.ZodType<Prisma.QuoteCreateManyAndReturnArgs> = z.object({ select: QuoteSelectObjectSchema.optional(), data: z.union([ QuoteCreateManyInputObjectSchema, z.array(QuoteCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.QuoteCreateManyAndReturnArgs>;

export const QuoteCreateManyAndReturnZodSchema = z.object({ select: QuoteSelectObjectSchema.optional(), data: z.union([ QuoteCreateManyInputObjectSchema, z.array(QuoteCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();