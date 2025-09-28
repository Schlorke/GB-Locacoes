/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemSelectObjectSchema as CartItemSelectObjectSchema } from './CartItemSelect.schema';
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './CartItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CartItemSelectObjectSchema).optional(),
  include: z.lazy(() => CartItemIncludeObjectSchema).optional()
}).strict();
export const CartItemArgsObjectSchema = makeSchema();
export const CartItemArgsObjectZodSchema = makeSchema();
