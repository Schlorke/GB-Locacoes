import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteUpdateWithoutUserInputObjectSchema } from './QuoteUpdateWithoutUserInput.schema'
import { QuoteUncheckedUpdateWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutUserInput.schema'
import { QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
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
export const QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput>
export const QuoteUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema()
