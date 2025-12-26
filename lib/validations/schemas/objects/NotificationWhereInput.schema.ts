/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumNotificationTypeFilterObjectSchema as EnumNotificationTypeFilterObjectSchema } from './EnumNotificationTypeFilter.schema';
import { NotificationTypeSchema } from '../enums/NotificationType.schema';
import { EnumNotificationPriorityFilterObjectSchema as EnumNotificationPriorityFilterObjectSchema } from './EnumNotificationPriorityFilter.schema';
import { NotificationPrioritySchema } from '../enums/NotificationPriority.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const notificationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => NotificationWhereInputObjectSchema), z.lazy(() => NotificationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => NotificationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => NotificationWhereInputObjectSchema), z.lazy(() => NotificationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumNotificationTypeFilterObjectSchema), NotificationTypeSchema]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  message: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  priority: z.union([z.lazy(() => EnumNotificationPriorityFilterObjectSchema), NotificationPrioritySchema]).optional(),
  isRead: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  actionUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  readAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const NotificationWhereInputObjectSchema: z.ZodType<Prisma.NotificationWhereInput> = notificationwhereinputSchema as unknown as z.ZodType<Prisma.NotificationWhereInput>;
export const NotificationWhereInputObjectZodSchema = notificationwhereinputSchema;
