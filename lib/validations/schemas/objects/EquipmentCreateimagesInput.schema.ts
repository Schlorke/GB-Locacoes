import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().array()
}).strict();
export const EquipmentCreateimagesInputObjectSchema: z.ZodType<Prisma.EquipmentCreateimagesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateimagesInput>;
export const EquipmentCreateimagesInputObjectZodSchema = makeSchema();
