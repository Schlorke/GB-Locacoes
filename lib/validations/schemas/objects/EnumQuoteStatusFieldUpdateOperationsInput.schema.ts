import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

export const EnumQuoteStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<
  Prisma.EnumQuoteStatusFieldUpdateOperationsInput,
  Prisma.EnumQuoteStatusFieldUpdateOperationsInput
> = z
  .object({
    set: QuoteStatusSchema.optional(),
  })
  .strict()
export const EnumQuoteStatusFieldUpdateOperationsInputObjectZodSchema = z
  .object({
    set: QuoteStatusSchema.optional(),
  })
  .strict()
