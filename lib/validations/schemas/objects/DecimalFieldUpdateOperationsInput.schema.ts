import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();
export const DecimalFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.DecimalFieldUpdateOperationsInput>;
export const DecimalFieldUpdateOperationsInputObjectZodSchema = makeSchema();
