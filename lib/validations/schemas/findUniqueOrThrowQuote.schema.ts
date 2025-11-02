import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema';

export const QuoteFindUniqueOrThrowSchema: z.ZodType<Prisma.QuoteFindUniqueOrThrowArgs> = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), where: QuoteWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.QuoteFindUniqueOrThrowArgs>;

export const QuoteFindUniqueOrThrowZodSchema = z.object({ select: QuoteSelectObjectSchema.optional(), include: QuoteIncludeObjectSchema.optional(), where: QuoteWhereUniqueInputObjectSchema }).strict();