import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './EquipmentUnitInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EquipmentUnitSelectObjectSchema).optional(),
  include: z.lazy(() => EquipmentUnitIncludeObjectSchema).optional()
}).strict();
export const EquipmentUnitArgsObjectSchema = makeSchema();
export const EquipmentUnitArgsObjectZodSchema = makeSchema();
