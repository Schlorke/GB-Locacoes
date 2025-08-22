import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithoutQuoteInput.schema';
import { QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutQuoteInput.schema'

export const QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutQuoteInput, Prisma.QuoteItemUpdateWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectZodSchema = z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema)])
}).strict();
