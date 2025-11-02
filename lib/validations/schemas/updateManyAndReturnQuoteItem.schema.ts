import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema';
import { QuoteItemUpdateManyMutationInputObjectSchema as QuoteItemUpdateManyMutationInputObjectSchema } from './objects/QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema';

export const QuoteItemUpdateManyAndReturnSchema: z.ZodType<Prisma.QuoteItemUpdateManyAndReturnArgs> = z.object({ select: QuoteItemSelectObjectSchema.optional(), data: QuoteItemUpdateManyMutationInputObjectSchema, where: QuoteItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyAndReturnArgs>;

export const QuoteItemUpdateManyAndReturnZodSchema = z.object({ select: QuoteItemSelectObjectSchema.optional(), data: QuoteItemUpdateManyMutationInputObjectSchema, where: QuoteItemWhereInputObjectSchema.optional() }).strict();