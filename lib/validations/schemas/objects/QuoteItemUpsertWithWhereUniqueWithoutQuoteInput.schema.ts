import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithoutQuoteInput.schema'
import { QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutQuoteInput.schema'
import { QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema'
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema'

export const QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<
  Prisma.QuoteItemUpsertWithWhereUniqueWithoutQuoteInput,
  Prisma.QuoteItemUpsertWithWhereUniqueWithoutQuoteInput
> = z
  .object({
    where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => QuoteItemUpdateWithoutQuoteInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectZodSchema = z
  .object({
    where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => QuoteItemUpdateWithoutQuoteInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema),
    ]),
  })
  .strict()
