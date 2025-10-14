/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteCreateWithoutUserInputObjectSchema as QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema as QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'

const makeSchema = () =>
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
