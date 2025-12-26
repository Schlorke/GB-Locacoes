/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationPrioritySchema } from '../enums/NotificationPriority.schema'

const makeSchema = () => z.object({
  set: NotificationPrioritySchema.optional()
}).strict();
export const EnumNotificationPriorityFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumNotificationPriorityFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumNotificationPriorityFieldUpdateOperationsInput>;
export const EnumNotificationPriorityFieldUpdateOperationsInputObjectZodSchema = makeSchema();
