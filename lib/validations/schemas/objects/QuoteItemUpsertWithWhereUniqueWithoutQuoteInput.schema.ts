/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithoutQuoteInputObjectSchema as QuoteItemUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithoutQuoteInput.schema';
import { QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema as QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutQuoteInput.schema';
import { QuoteItemCreateWithoutQuoteInputObjectSchema as QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => QuoteItemUpdateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutQuoteInput>;
export const QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectZodSchema = makeSchema();
