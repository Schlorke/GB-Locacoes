/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSelectObjectSchema as NotificationSelectObjectSchema } from './NotificationSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => NotificationSelectObjectSchema).optional()
}).strict();
export const NotificationArgsObjectSchema = makeSchema();
export const NotificationArgsObjectZodSchema = makeSchema();
