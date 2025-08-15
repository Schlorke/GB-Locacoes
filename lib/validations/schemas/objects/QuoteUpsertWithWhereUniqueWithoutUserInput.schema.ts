import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteUpdateWithoutUserInputObjectSchema } from './QuoteUpdateWithoutUserInput.schema'
import { QuoteUncheckedUpdateWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutUserInput.schema'
import { QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'

export const QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<
  Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput,
  Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput
> = z
  .object({
    where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => QuoteUpdateWithoutUserInputObjectSchema),
      z.lazy(() => QuoteUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuoteCreateWithoutUserInputObjectSchema),
      z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = z
  .object({
    where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => QuoteUpdateWithoutUserInputObjectSchema),
      z.lazy(() => QuoteUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuoteCreateWithoutUserInputObjectSchema),
      z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict()
