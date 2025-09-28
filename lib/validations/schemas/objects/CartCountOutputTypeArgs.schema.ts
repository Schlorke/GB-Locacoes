/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCountOutputTypeSelectObjectSchema as CartCountOutputTypeSelectObjectSchema } from './CartCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CartCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CartCountOutputTypeArgsObjectSchema = makeSchema();
export const CartCountOutputTypeArgsObjectZodSchema = makeSchema();
