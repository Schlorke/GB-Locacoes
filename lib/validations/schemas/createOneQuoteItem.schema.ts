/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemCreateInputObjectSchema as QuoteItemCreateInputObjectSchema } from './objects/QuoteItemCreateInput.schema';
import { QuoteItemUncheckedCreateInputObjectSchema as QuoteItemUncheckedCreateInputObjectSchema } from './objects/QuoteItemUncheckedCreateInput.schema';

export const QuoteItemCreateOneSchema: z.ZodType<Prisma.QuoteItemCreateArgs> = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: z.union([QuoteItemCreateInputObjectSchema, QuoteItemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.QuoteItemCreateArgs>;

export const QuoteItemCreateOneZodSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: z.union([QuoteItemCreateInputObjectSchema, QuoteItemUncheckedCreateInputObjectSchema]) }).strict();