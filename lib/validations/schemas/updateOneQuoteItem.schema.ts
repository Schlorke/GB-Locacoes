import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemUpdateInputObjectSchema as QuoteItemUpdateInputObjectSchema } from './objects/QuoteItemUpdateInput.schema';
import { QuoteItemUncheckedUpdateInputObjectSchema as QuoteItemUncheckedUpdateInputObjectSchema } from './objects/QuoteItemUncheckedUpdateInput.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';

export const QuoteItemUpdateOneSchema: z.ZodType<Prisma.QuoteItemUpdateArgs> = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: z.union([QuoteItemUpdateInputObjectSchema, QuoteItemUncheckedUpdateInputObjectSchema]), where: QuoteItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.QuoteItemUpdateArgs>;

export const QuoteItemUpdateOneZodSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), data: z.union([QuoteItemUpdateInputObjectSchema, QuoteItemUncheckedUpdateInputObjectSchema]), where: QuoteItemWhereUniqueInputObjectSchema }).strict();