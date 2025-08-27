import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'
import { QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema'
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema),
        z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema),
      ]),
    })
    .strict()
export const QuoteCreateOrConnectWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutItemsInput>
export const QuoteCreateOrConnectWithoutItemsInputObjectZodSchema = makeSchema()
