import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema'
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema'
import { QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema } from './QuoteItemCreateOrConnectWithoutQuoteInput.schema'
import { QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema } from './QuoteItemUpsertWithWhereUniqueWithoutQuoteInput.schema'
import { QuoteItemCreateManyQuoteInputEnvelopeObjectSchema } from './QuoteItemCreateManyQuoteInputEnvelope.schema'
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'
import { QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithWhereUniqueWithoutQuoteInput.schema'
import { QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema } from './QuoteItemUpdateManyWithWhereWithoutQuoteInput.schema'
import { QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema),
          z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema).array(),
          z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema),
          z
            .lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema),
          z
            .lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema
          ),
          z
            .lazy(
              () => QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => QuoteItemCreateManyQuoteInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
          z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema
          ),
          z
            .lazy(
              () => QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema
          ),
          z
            .lazy(
              () => QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
          z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()
export const QuoteItemUncheckedUpdateManyWithoutQuoteNestedInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedUpdateManyWithoutQuoteNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedUpdateManyWithoutQuoteNestedInput>
export const QuoteItemUncheckedUpdateManyWithoutQuoteNestedInputObjectZodSchema =
  makeSchema()
