/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumNotificationTypeWithAggregatesFilterObjectSchema as EnumNotificationTypeWithAggregatesFilterObjectSchema } from './EnumNotificationTypeWithAggregatesFilter.schema';
import { NotificationTypeSchema } from '../enums/NotificationType.schema';
import { EnumNotificationPriorityWithAggregatesFilterObjectSchema as EnumNotificationPriorityWithAggregatesFilterObjectSchema } from './EnumNotificationPriorityWithAggregatesFilter.schema';
import { NotificationPrioritySchema } from '../enums/NotificationPriority.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const notificationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => NotificationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => NotificationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumNotificationTypeWithAggregatesFilterObjectSchema), NotificationTypeSchema]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  message: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  priority: z.union([z.lazy(() => EnumNotificationPriorityWithAggregatesFilterObjectSchema), NotificationPrioritySchema]).optional(),
  isRead: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  actionUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  readAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const NotificationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = notificationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput>;
export const NotificationScalarWhereWithAggregatesInputObjectZodSchema = notificationscalarwherewithaggregatesinputSchema;
