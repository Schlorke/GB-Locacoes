import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserCountOutputTypeSelectObjectSchema } from './UserCountOutputTypeSelect.schema'

export const UserCountOutputTypeArgsObjectSchema = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const UserCountOutputTypeArgsObjectZodSchema = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectObjectSchema).optional()
}).strict();
