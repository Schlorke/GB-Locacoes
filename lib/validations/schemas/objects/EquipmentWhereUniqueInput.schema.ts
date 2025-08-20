import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const EquipmentWhereUniqueInputObjectSchema: z.ZodType<
  Prisma.EquipmentWhereUniqueInput,
  Prisma.EquipmentWhereUniqueInput
> = z
  .object({
    id: z.string(),
  })
  .strict()
export const EquipmentWhereUniqueInputObjectZodSchema = z
  .object({
    id: z.string(),
  })
  .strict()
