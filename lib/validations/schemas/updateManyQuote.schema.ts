import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { QuoteUpdateManyMutationInputObjectSchema as QuoteUpdateManyMutationInputObjectSchema } from './objects/QuoteUpdateManyMutationInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema';

export const QuoteUpdateManySchema: z.ZodType<Prisma.QuoteUpdateManyArgs> = z.object({ data: QuoteUpdateManyMutationInputObjectSchema, where: QuoteWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.QuoteUpdateManyArgs>;

export const QuoteUpdateManyZodSchema = z.object({ data: QuoteUpdateManyMutationInputObjectSchema, where: QuoteWhereInputObjectSchema.optional() }).strict();