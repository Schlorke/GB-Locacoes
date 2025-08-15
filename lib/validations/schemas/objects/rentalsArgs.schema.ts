import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsSelectObjectSchema } from './rentalsSelect.schema';
import { rentalsIncludeObjectSchema } from './rentalsInclude.schema'

export const rentalsArgsObjectSchema = z.object({
  select: z.lazy(() => rentalsSelectObjectSchema).optional(),
  include: z.lazy(() => rentalsIncludeObjectSchema).optional()
}).strict();
export const rentalsArgsObjectZodSchema = z.object({
  select: z.lazy(() => rentalsSelectObjectSchema).optional(),
  include: z.lazy(() => rentalsIncludeObjectSchema).optional()
}).strict();
