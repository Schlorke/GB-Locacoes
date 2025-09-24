import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCountOutputTypeSelectObjectSchema } from './CartCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CartCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CartCountOutputTypeArgsObjectSchema = makeSchema();
export const CartCountOutputTypeArgsObjectZodSchema = makeSchema();
