import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';

export const QuoteItemFindUniqueSchema: z.ZodType<Prisma.QuoteItemFindUniqueArgs> = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), where: QuoteItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.QuoteItemFindUniqueArgs>;

export const QuoteItemFindUniqueZodSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), where: QuoteItemWhereUniqueInputObjectSchema }).strict();