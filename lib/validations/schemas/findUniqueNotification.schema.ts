/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { NotificationSelectObjectSchema as NotificationSelectObjectSchema } from './objects/NotificationSelect.schema';
import { NotificationIncludeObjectSchema as NotificationIncludeObjectSchema } from './objects/NotificationInclude.schema';
import { NotificationWhereUniqueInputObjectSchema as NotificationWhereUniqueInputObjectSchema } from './objects/NotificationWhereUniqueInput.schema';

export const NotificationFindUniqueSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> = z.object({ select: NotificationSelectObjectSchema.optional(), include: NotificationIncludeObjectSchema.optional(), where: NotificationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.NotificationFindUniqueArgs>;

export const NotificationFindUniqueZodSchema = z.object({ select: NotificationSelectObjectSchema.optional(), include: NotificationIncludeObjectSchema.optional(), where: NotificationWhereUniqueInputObjectSchema }).strict();