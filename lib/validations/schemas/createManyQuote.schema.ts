/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { QuoteCreateManyInputObjectSchema as QuoteCreateManyInputObjectSchema } from './objects/QuoteCreateManyInput.schema';

export const QuoteCreateManySchema: z.ZodType<Prisma.QuoteCreateManyArgs> = z.object({ data: z.union([ QuoteCreateManyInputObjectSchema, z.array(QuoteCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.QuoteCreateManyArgs>;

export const QuoteCreateManyZodSchema = z.object({ data: z.union([ QuoteCreateManyInputObjectSchema, z.array(QuoteCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();