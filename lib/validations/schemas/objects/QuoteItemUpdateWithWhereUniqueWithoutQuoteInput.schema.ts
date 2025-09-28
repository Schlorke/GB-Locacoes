/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithoutQuoteInputObjectSchema as QuoteItemUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithoutQuoteInput.schema';
import { QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema as QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutQuoteInput>;
export const QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectZodSchema = makeSchema();
