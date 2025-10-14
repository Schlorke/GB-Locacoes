/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteCreateWithoutUserInputObjectSchema as QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema as QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'
import { QuoteCreateOrConnectWithoutUserInputObjectSchema as QuoteCreateOrConnectWithoutUserInputObjectSchema } from './QuoteCreateOrConnectWithoutUserInput.schema'
import { QuoteCreateManyUserInputEnvelopeObjectSchema as QuoteCreateManyUserInputEnvelopeObjectSchema } from './QuoteCreateManyUserInputEnvelope.schema'
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => QuoteCreateWithoutUserInputObjectSchema),
          z.lazy(() => QuoteCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => QuoteCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => QuoteWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const QuoteCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateNestedManyWithoutUserInput>
export const QuoteCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema()
