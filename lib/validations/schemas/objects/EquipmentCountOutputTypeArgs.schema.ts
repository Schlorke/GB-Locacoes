import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCountOutputTypeSelectObjectSchema } from './EquipmentCountOutputTypeSelect.schema'

export const EquipmentCountOutputTypeArgsObjectSchema = z.object({
  select: z.lazy(() => EquipmentCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeArgsObjectZodSchema = z.object({
  select: z.lazy(() => EquipmentCountOutputTypeSelectObjectSchema).optional()
}).strict();
