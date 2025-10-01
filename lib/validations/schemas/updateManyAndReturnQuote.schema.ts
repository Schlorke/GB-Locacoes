/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema';
import { QuoteUpdateManyMutationInputObjectSchema as QuoteUpdateManyMutationInputObjectSchema } from './objects/QuoteUpdateManyMutationInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';

export const QuoteUpdateManyAndReturnSchema: z.ZodType<Prisma.QuoteUpdateManyAndReturnArgs> = z.object({ select: QuoteSelectObjectSchema.optional(), data: QuoteUpdateManyMutationInputObjectSchema, where: QuoteWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.QuoteUpdateManyAndReturnArgs>;

export const QuoteUpdateManyAndReturnZodSchema = z.object({ select: QuoteSelectObjectSchema.optional(), data: QuoteUpdateManyMutationInputObjectSchema, where: QuoteWhereInputObjectSchema.optional() }).strict();