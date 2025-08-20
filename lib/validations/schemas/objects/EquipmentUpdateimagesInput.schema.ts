import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const EquipmentUpdateimagesInputObjectSchema: z.ZodType<
  Prisma.EquipmentUpdateimagesInput,
  Prisma.EquipmentUpdateimagesInput
> = z
  .object({
    set: z.string().array().optional(),
    push: z.union([z.string(), z.string().array()]).optional(),
  })
  .strict()
export const EquipmentUpdateimagesInputObjectZodSchema = z
  .object({
    set: z.string().array().optional(),
    push: z.union([z.string(), z.string().array()]).optional(),
  })
  .strict()
