/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteCreateInputObjectSchema as QuoteCreateInputObjectSchema } from './objects/QuoteCreateInput.schema';
import { QuoteUncheckedCreateInputObjectSchema as QuoteUncheckedCreateInputObjectSchema } from './objects/QuoteUncheckedCreateInput.schema';

export const QuoteCreateOneSchema: z.ZodType<Prisma.QuoteCreateArgs> = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), data: z.union([QuoteCreateInputObjectSchema, QuoteUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.QuoteCreateArgs>;

export const QuoteCreateOneZodSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), data: z.union([QuoteCreateInputObjectSchema, QuoteUncheckedCreateInputObjectSchema]) }).strict();