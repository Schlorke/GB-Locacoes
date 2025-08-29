import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentCountOutputTypeSelectObjectSchema } from './EquipmentCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => EquipmentCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeArgsObjectZodSchema = makeSchema();
