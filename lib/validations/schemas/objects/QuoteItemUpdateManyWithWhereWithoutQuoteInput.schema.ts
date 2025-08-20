import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema'
import { QuoteItemUpdateManyMutationInputObjectSchema } from './QuoteItemUpdateManyMutationInput.schema'
import { QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutQuoteInput.schema'

export const QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema: z.ZodType<
  Prisma.QuoteItemUpdateManyWithWhereWithoutQuoteInput,
  Prisma.QuoteItemUpdateManyWithWhereWithoutQuoteInput
> = z
  .object({
    where: z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => QuoteItemUpdateManyMutationInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema),
    ]),
  })
  .strict()
export const QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectZodSchema = z
  .object({
    where: z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => QuoteItemUpdateManyMutationInputObjectSchema),
      z.lazy(() => QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema),
    ]),
  })
  .strict()
