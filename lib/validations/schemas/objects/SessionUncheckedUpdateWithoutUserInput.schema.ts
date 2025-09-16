import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const SessionUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput>;
export const SessionUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
