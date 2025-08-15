import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutSessionsNestedInput.schema'

export const SessionUpdateInputObjectSchema: z.ZodType<Prisma.SessionUpdateInput, Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema).optional()
}).strict();
export const SessionUpdateInputObjectZodSchema = z.object({
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expires: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema).optional()
}).strict();
