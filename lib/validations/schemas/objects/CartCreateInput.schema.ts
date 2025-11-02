import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCartInputObjectSchema as UserCreateNestedOneWithoutCartInputObjectSchema } from './UserCreateNestedOneWithoutCartInput.schema';
import { CartItemCreateNestedManyWithoutCartInputObjectSchema as CartItemCreateNestedManyWithoutCartInputObjectSchema } from './CartItemCreateNestedManyWithoutCartInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCartInputObjectSchema),
  items: z.lazy(() => CartItemCreateNestedManyWithoutCartInputObjectSchema)
}).strict();
export const CartCreateInputObjectSchema: z.ZodType<Prisma.CartCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateInput>;
export const CartCreateInputObjectZodSchema = makeSchema();
