import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateManyCategoryInputObjectSchema } from './EquipmentCreateManyCategoryInput.schema'

export const EquipmentCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<
  Prisma.EquipmentCreateManyCategoryInputEnvelope,
  Prisma.EquipmentCreateManyCategoryInputEnvelope
> = z
  .object({
    data: z.union([
      z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema),
      z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
export const EquipmentCreateManyCategoryInputEnvelopeObjectZodSchema = z
  .object({
    data: z.union([
      z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema),
      z.lazy(() => EquipmentCreateManyCategoryInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
