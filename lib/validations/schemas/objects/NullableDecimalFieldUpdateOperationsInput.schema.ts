import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.number().nullish(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();
export const NullableDecimalFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput>;
export const NullableDecimalFieldUpdateOperationsInputObjectZodSchema = makeSchema();
