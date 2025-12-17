import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { CartCountOutputTypeArgsObjectSchema as CartCountOutputTypeArgsObjectSchema } from './CartCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CartCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CartIncludeObjectSchema: z.ZodType<Prisma.CartInclude> = makeSchema() as unknown as z.ZodType<Prisma.CartInclude>;
export const CartIncludeObjectZodSchema = makeSchema();
