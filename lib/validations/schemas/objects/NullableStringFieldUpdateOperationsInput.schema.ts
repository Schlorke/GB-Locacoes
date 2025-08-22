import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const NullableStringFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput, Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().nullish()
}).strict();
export const NullableStringFieldUpdateOperationsInputObjectZodSchema = z.object({
  set: z.string().nullish()
}).strict();
