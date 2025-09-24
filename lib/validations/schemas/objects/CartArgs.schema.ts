import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartSelectObjectSchema } from './CartSelect.schema';
import { CartIncludeObjectSchema } from './CartInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CartSelectObjectSchema).optional(),
  include: z.lazy(() => CartIncludeObjectSchema).optional()
}).strict();
export const CartArgsObjectSchema = makeSchema();
export const CartArgsObjectZodSchema = makeSchema();
