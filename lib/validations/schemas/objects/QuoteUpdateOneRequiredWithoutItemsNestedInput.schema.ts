import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema'
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema'
import { QuoteCreateOrConnectWithoutItemsInputObjectSchema } from './QuoteCreateOrConnectWithoutItemsInput.schema'
import { QuoteUpsertWithoutItemsInputObjectSchema } from './QuoteUpsertWithoutItemsInput.schema'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema } from './QuoteUpdateToOneWithWhereWithoutItemsInput.schema'
import { QuoteUpdateWithoutItemsInputObjectSchema } from './QuoteUpdateWithoutItemsInput.schema'
import { QuoteUncheckedUpdateWithoutItemsInputObjectSchema } from './QuoteUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
      upsert: z.lazy(() => QuoteUpsertWithoutItemsInputObjectSchema).optional(),
      connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema),
          z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema),
          z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateOneRequiredWithoutItemsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateOneRequiredWithoutItemsNestedInput>
export const QuoteUpdateOneRequiredWithoutItemsNestedInputObjectZodSchema =
  makeSchema()
