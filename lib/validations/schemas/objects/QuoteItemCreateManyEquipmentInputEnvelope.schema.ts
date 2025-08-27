import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemCreateManyEquipmentInputObjectSchema } from './QuoteItemCreateManyEquipmentInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      data: z.union([
        z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema),
        z.lazy(() => QuoteItemCreateManyEquipmentInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()
export const QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyEquipmentInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyEquipmentInputEnvelope>
export const QuoteItemCreateManyEquipmentInputEnvelopeObjectZodSchema =
  makeSchema()
