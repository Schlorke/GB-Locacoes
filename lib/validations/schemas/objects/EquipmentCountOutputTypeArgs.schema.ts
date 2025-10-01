/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCountOutputTypeSelectObjectSchema as EquipmentCountOutputTypeSelectObjectSchema } from './EquipmentCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EquipmentCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const EquipmentCountOutputTypeArgsObjectSchema = makeSchema();
export const EquipmentCountOutputTypeArgsObjectZodSchema = makeSchema();
