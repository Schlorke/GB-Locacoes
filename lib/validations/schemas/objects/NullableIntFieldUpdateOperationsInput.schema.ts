import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const NullableIntFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput, Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().int().optional().nullable(),
  increment: z.number().int().optional(),
  decrement: z.number().int().optional(),
  multiply: z.number().int().optional(),
  divide: z.number().int().optional()
}).strict();
export const NullableIntFieldUpdateOperationsInputObjectZodSchema = z.object({
  set: z.number().int().optional().nullable(),
  increment: z.number().int().optional(),
  decrement: z.number().int().optional(),
  multiply: z.number().int().optional(),
  divide: z.number().int().optional()
}).strict();
