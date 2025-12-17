/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './MaintenanceWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => MaintenanceWhereInputObjectSchema).optional(),
  some: z.lazy(() => MaintenanceWhereInputObjectSchema).optional(),
  none: z.lazy(() => MaintenanceWhereInputObjectSchema).optional()
}).strict();
export const MaintenanceListRelationFilterObjectSchema: z.ZodType<Prisma.MaintenanceListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceListRelationFilter>;
export const MaintenanceListRelationFilterObjectZodSchema = makeSchema();
