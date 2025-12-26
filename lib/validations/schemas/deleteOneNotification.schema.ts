/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NotificationSelectObjectSchema as NotificationSelectObjectSchema } from './objects/NotificationSelect.schema';
import { NotificationWhereUniqueInputObjectSchema as NotificationWhereUniqueInputObjectSchema } from './objects/NotificationWhereUniqueInput.schema';

export const NotificationDeleteOneSchema: z.ZodType<Prisma.NotificationDeleteArgs> = z.object({ select: NotificationSelectObjectSchema.optional(),  where: NotificationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.NotificationDeleteArgs>;

export const NotificationDeleteOneZodSchema = z.object({ select: NotificationSelectObjectSchema.optional(),  where: NotificationWhereUniqueInputObjectSchema }).strict();