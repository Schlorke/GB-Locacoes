import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema'

export const QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateOrConnectWithoutQuoteInput, Prisma.QuoteItemCreateOrConnectWithoutQuoteInput> = z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemCreateOrConnectWithoutQuoteInputObjectZodSchema = z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
