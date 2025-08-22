import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const DateTimeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput, Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional()
}).strict();
export const DateTimeFieldUpdateOperationsInputObjectZodSchema = z.object({
  set: z.date().optional()
}).strict();
