/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema'

const makeSchema = () => z.object({
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional()
}).strict();
export const MaintenanceIncludeObjectSchema: z.ZodType<Prisma.MaintenanceInclude> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceInclude>;
export const MaintenanceIncludeObjectZodSchema = makeSchema();
