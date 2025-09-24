import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemSelectObjectSchema } from './CartItemSelect.schema';
import { CartItemIncludeObjectSchema } from './CartItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CartItemSelectObjectSchema).optional(),
  include: z.lazy(() => CartItemIncludeObjectSchema).optional()
}).strict();
export const CartItemArgsObjectSchema = makeSchema();
export const CartItemArgsObjectZodSchema = makeSchema();
