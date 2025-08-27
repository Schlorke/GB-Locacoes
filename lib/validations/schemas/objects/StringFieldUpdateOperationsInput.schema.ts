import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().optional()
}).strict();
export const StringFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;
export const StringFieldUpdateOperationsInputObjectZodSchema = makeSchema();
