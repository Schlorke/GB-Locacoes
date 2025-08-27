import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const EquipmentUpdateimagesInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateimagesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateimagesInput>;
export const EquipmentUpdateimagesInputObjectZodSchema = makeSchema();
