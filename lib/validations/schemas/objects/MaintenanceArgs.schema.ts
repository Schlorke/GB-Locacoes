/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './MaintenanceSelect.schema';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './MaintenanceInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MaintenanceSelectObjectSchema).optional(),
  include: z.lazy(() => MaintenanceIncludeObjectSchema).optional()
}).strict();
export const MaintenanceArgsObjectSchema = makeSchema();
export const MaintenanceArgsObjectZodSchema = makeSchema();
