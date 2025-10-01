/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema as EquipmentIncludeObjectSchema } from './EquipmentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EquipmentSelectObjectSchema).optional(),
  include: z.lazy(() => EquipmentIncludeObjectSchema).optional()
}).strict();
export const EquipmentArgsObjectSchema = makeSchema();
export const EquipmentArgsObjectZodSchema = makeSchema();
