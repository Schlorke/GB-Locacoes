import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteItemCreateManyInputObjectSchema as QuoteItemCreateManyInputObjectSchema } from './objects/QuoteItemCreateManyInput.schema';

export const QuoteItemCreateManySchema: z.ZodType<Prisma.QuoteItemCreateManyArgs> = z.object({ data: z.union([ QuoteItemCreateManyInputObjectSchema, z.array(QuoteItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.QuoteItemCreateManyArgs>;

export const QuoteItemCreateManyZodSchema = z.object({ data: z.union([ QuoteItemCreateManyInputObjectSchema, z.array(QuoteItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();