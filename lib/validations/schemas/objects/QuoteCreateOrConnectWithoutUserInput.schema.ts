import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => QuoteCreateWithoutUserInputObjectSchema),
        z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict()
export const QuoteCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutUserInput>
export const QuoteCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema()
