import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const VerificationTokenUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput>;
export const VerificationTokenUncheckedUpdateManyInputObjectZodSchema = makeSchema();
