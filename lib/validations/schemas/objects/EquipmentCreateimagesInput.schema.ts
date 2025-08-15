import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const EquipmentCreateimagesInputObjectSchema: z.ZodType<
  Prisma.EquipmentCreateimagesInput,
  Prisma.EquipmentCreateimagesInput
> = z
  .object({
    set: z.string().array(),
  })
  .strict()
export const EquipmentCreateimagesInputObjectZodSchema = z
  .object({
    set: z.string().array(),
  })
  .strict()
