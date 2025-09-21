import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema'
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema'
import { QuoteCreateOrConnectWithoutItemsInputObjectSchema } from './QuoteCreateOrConnectWithoutItemsInput.schema'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema),
          z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => QuoteCreateOrConnectWithoutItemsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional(),
    })
    .strict()
export const QuoteCreateNestedOneWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateNestedOneWithoutItemsInput>
export const QuoteCreateNestedOneWithoutItemsInputObjectZodSchema = makeSchema()
