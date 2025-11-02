import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { CartCountOutputTypeArgsObjectSchema as CartCountOutputTypeArgsObjectSchema } from './CartCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CartCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CartSelectObjectSchema: z.ZodType<Prisma.CartSelect> = makeSchema() as unknown as z.ZodType<Prisma.CartSelect>;
export const CartSelectObjectZodSchema = makeSchema();
