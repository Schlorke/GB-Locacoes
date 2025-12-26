/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NotificationSelectObjectSchema as NotificationSelectObjectSchema } from './objects/NotificationSelect.schema';
import { NotificationCreateInputObjectSchema as NotificationCreateInputObjectSchema } from './objects/NotificationCreateInput.schema';
import { NotificationUncheckedCreateInputObjectSchema as NotificationUncheckedCreateInputObjectSchema } from './objects/NotificationUncheckedCreateInput.schema';

export const NotificationCreateOneSchema: z.ZodType<Prisma.NotificationCreateArgs> = z.object({ select: NotificationSelectObjectSchema.optional(),  data: z.union([NotificationCreateInputObjectSchema, NotificationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.NotificationCreateArgs>;

export const NotificationCreateOneZodSchema = z.object({ select: NotificationSelectObjectSchema.optional(),  data: z.union([NotificationCreateInputObjectSchema, NotificationUncheckedCreateInputObjectSchema]) }).strict();