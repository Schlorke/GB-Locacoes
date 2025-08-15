import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentSelectObjectSchema } from './EquipmentSelect.schema'
import { EquipmentIncludeObjectSchema } from './EquipmentInclude.schema'

export const EquipmentArgsObjectSchema = z
  .object({
    select: z.lazy(() => EquipmentSelectObjectSchema).optional(),
    include: z.lazy(() => EquipmentIncludeObjectSchema).optional(),
  })
  .strict()
export const EquipmentArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => EquipmentSelectObjectSchema).optional(),
    include: z.lazy(() => EquipmentIncludeObjectSchema).optional(),
  })
  .strict()
