import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountSelectObjectSchema } from './AccountSelect.schema';
import { AccountIncludeObjectSchema } from './AccountInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => AccountSelectObjectSchema).optional(),
  include: z.lazy(() => AccountIncludeObjectSchema).optional()
}).strict();
export const AccountArgsObjectSchema = makeSchema();
export const AccountArgsObjectZodSchema = makeSchema();
