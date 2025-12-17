import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const MaintenanceWhereUniqueInputObjectSchema: z.ZodType<Prisma.MaintenanceWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceWhereUniqueInput>;
export const MaintenanceWhereUniqueInputObjectZodSchema = makeSchema();
