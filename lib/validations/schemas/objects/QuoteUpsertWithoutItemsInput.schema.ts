import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteUpdateWithoutItemsInputObjectSchema } from './QuoteUpdateWithoutItemsInput.schema'
import { QuoteUncheckedUpdateWithoutItemsInputObjectSchema } from './QuoteUncheckedUpdateWithoutItemsInput.schema'
import { QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema'
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema'
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      update: z.union([
        z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema),
        z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema),
        z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema),
      ]),
      where: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    })
    .strict()
export const QuoteUpsertWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithoutItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithoutItemsInput>
export const QuoteUpsertWithoutItemsInputObjectZodSchema = makeSchema()
