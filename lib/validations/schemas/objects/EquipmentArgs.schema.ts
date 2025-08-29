import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentSelectObjectSchema } from './EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema } from './EquipmentInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => EquipmentSelectObjectSchema).optional(),
  include: z.lazy(() => EquipmentIncludeObjectSchema).optional()
}).strict();
export const EquipmentArgsObjectSchema = makeSchema();
export const EquipmentArgsObjectZodSchema = makeSchema();
