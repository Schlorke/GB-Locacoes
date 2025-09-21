import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithoutQuoteInput.schema'
import { QuoteItemUncheckedUpdateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutQuoteInput.schema'
import { QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema'
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () =>
  z
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
export const QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutQuoteInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutQuoteInput>
export const QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectZodSchema =
  makeSchema()
