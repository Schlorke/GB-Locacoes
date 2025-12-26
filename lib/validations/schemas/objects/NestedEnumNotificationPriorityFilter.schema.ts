/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationPrioritySchema } from '../enums/NotificationPriority.schema'

const nestedenumnotificationpriorityfilterSchema = z.object({
  equals: NotificationPrioritySchema.optional(),
  in: NotificationPrioritySchema.array().optional(),
  notIn: NotificationPrioritySchema.array().optional(),
  not: z.union([NotificationPrioritySchema, z.lazy(() => NestedEnumNotificationPriorityFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumNotificationPriorityFilterObjectSchema: z.ZodType<Prisma.NestedEnumNotificationPriorityFilter> = nestedenumnotificationpriorityfilterSchema as unknown as z.ZodType<Prisma.NestedEnumNotificationPriorityFilter>;
export const NestedEnumNotificationPriorityFilterObjectZodSchema = nestedenumnotificationpriorityfilterSchema;
