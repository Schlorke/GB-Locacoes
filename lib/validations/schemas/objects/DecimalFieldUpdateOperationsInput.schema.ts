/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();
export const DecimalFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.DecimalFieldUpdateOperationsInput>;
export const DecimalFieldUpdateOperationsInputObjectZodSchema = makeSchema();
