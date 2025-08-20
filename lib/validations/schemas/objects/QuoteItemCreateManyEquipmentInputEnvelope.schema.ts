import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemCreateManyEquipmentInputObjectSchema } from './QuoteItemCreateManyEquipmentInput.schema'

export const QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema: z.ZodType<
  Prisma.QuoteItemCreateManyEquipmentInputEnvelope,
  Prisma.QuoteItemCreateManyEquipmentInputEnvelope
> = z
  .object({
    data: z.union([
      z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema),
      z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
export const QuoteItemCreateManyEquipmentInputEnvelopeObjectZodSchema = z
  .object({
    data: z.union([
      z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema),
      z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
