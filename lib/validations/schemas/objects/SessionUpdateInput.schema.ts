import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutSessionsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema).optional()
}).strict();
export const SessionUpdateInputObjectSchema: z.ZodType<Prisma.SessionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUpdateInput>;
export const SessionUpdateInputObjectZodSchema = makeSchema();
