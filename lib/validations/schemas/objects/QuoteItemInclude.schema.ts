import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentArgsObjectSchema } from './EquipmentArgs.schema'
import { QuoteArgsObjectSchema } from './QuoteArgs.schema'

export const QuoteItemIncludeObjectSchema: z.ZodType<
  Prisma.QuoteItemInclude,
  Prisma.QuoteItemInclude
> = z
  .object({
    equipment: z
      .union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)])
      .optional(),
    quote: z
      .union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)])
      .optional(),
  })
  .strict()
export const QuoteItemIncludeObjectZodSchema = z
  .object({
    equipment: z
      .union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)])
      .optional(),
    quote: z
      .union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)])
      .optional(),
  })
  .strict()
