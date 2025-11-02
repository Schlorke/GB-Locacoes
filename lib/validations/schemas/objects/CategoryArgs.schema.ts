import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategorySelectObjectSchema as CategorySelectObjectSchema } from './CategorySelect.schema';
import { CategoryIncludeObjectSchema as CategoryIncludeObjectSchema } from './CategoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CategorySelectObjectSchema).optional(),
  include: z.lazy(() => CategoryIncludeObjectSchema).optional()
}).strict();
export const CategoryArgsObjectSchema = makeSchema();
export const CategoryArgsObjectZodSchema = makeSchema();
