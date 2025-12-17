import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema';
import { QuoteItemCreateInputObjectSchema as QuoteItemCreateInputObjectSchema } from './objects/QuoteItemCreateInput.schema';
import { QuoteItemUncheckedCreateInputObjectSchema as QuoteItemUncheckedCreateInputObjectSchema } from './objects/QuoteItemUncheckedCreateInput.schema';
import { QuoteItemUpdateInputObjectSchema as QuoteItemUpdateInputObjectSchema } from './objects/QuoteItemUpdateInput.schema';
import { QuoteItemUncheckedUpdateInputObjectSchema as QuoteItemUncheckedUpdateInputObjectSchema } from './objects/QuoteItemUncheckedUpdateInput.schema';

export const QuoteItemUpsertOneSchema: z.ZodType<Prisma.QuoteItemUpsertArgs> = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), where: QuoteItemWhereUniqueInputObjectSchema, create: z.union([ QuoteItemCreateInputObjectSchema, QuoteItemUncheckedCreateInputObjectSchema ]), update: z.union([ QuoteItemUpdateInputObjectSchema, QuoteItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.QuoteItemUpsertArgs>;

export const QuoteItemUpsertOneZodSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), include: QuoteItemIncludeObjectSchema.optional(), where: QuoteItemWhereUniqueInputObjectSchema, create: z.union([ QuoteItemCreateInputObjectSchema, QuoteItemUncheckedCreateInputObjectSchema ]), update: z.union([ QuoteItemUpdateInputObjectSchema, QuoteItemUncheckedUpdateInputObjectSchema ]) }).strict();