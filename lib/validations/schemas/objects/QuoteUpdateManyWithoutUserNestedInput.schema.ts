/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteCreateWithoutUserInputObjectSchema as QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema'
import { QuoteUncheckedCreateWithoutUserInputObjectSchema as QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'
import { QuoteCreateOrConnectWithoutUserInputObjectSchema as QuoteCreateOrConnectWithoutUserInputObjectSchema } from './QuoteCreateOrConnectWithoutUserInput.schema'
import { QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema as QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './QuoteUpsertWithWhereUniqueWithoutUserInput.schema'
import { QuoteCreateManyUserInputEnvelopeObjectSchema as QuoteCreateManyUserInputEnvelopeObjectSchema } from './QuoteCreateManyUserInputEnvelope.schema'
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema as QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './QuoteUpdateWithWhereUniqueWithoutUserInput.schema'
import { QuoteUpdateManyWithWhereWithoutUserInputObjectSchema as QuoteUpdateManyWithWhereWithoutUserInputObjectSchema } from './QuoteUpdateManyWithWhereWithoutUserInput.schema'
import { QuoteScalarWhereInputObjectSchema as QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema'

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
      upsert: z
        .union([
          z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema),
          z
            .lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => QuoteCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => QuoteWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => QuoteWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => QuoteWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => QuoteWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema),
          z
            .lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputObjectSchema),
          z
            .lazy(() => QuoteUpdateManyWithWhereWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => QuoteScalarWhereInputObjectSchema),
          z.lazy(() => QuoteScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const QuoteUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithoutUserNestedInput>
export const QuoteUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema()
