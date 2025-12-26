/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const NotificationIncludeObjectSchema: z.ZodType<Prisma.NotificationInclude> = makeSchema() as unknown as z.ZodType<Prisma.NotificationInclude>;
export const NotificationIncludeObjectZodSchema = makeSchema();
