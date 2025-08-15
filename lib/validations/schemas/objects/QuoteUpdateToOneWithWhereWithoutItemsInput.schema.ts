import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'
import { QuoteUpdateWithoutItemsInputObjectSchema } from './QuoteUpdateWithoutItemsInput.schema'
import { QuoteUncheckedUpdateWithoutItemsInputObjectSchema } from './QuoteUncheckedUpdateWithoutItemsInput.schema'

export const QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema: z.ZodType<
  Prisma.QuoteUpdateToOneWithWhereWithoutItemsInput,
  Prisma.QuoteUpdateToOneWithWhereWithoutItemsInput
> = z
  .object({
    where: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema),
      z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteUpdateToOneWithWhereWithoutItemsInputObjectZodSchema = z
  .object({
    where: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    data: z.union([
      z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema),
      z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema),
    ]),
  })
  .strict()
