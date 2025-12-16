/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateNestedManyWithoutCartInputObjectSchema as CartItemCreateNestedManyWithoutCartInputObjectSchema } from './CartItemCreateNestedManyWithoutCartInput.schema';
import { UserCreateNestedOneWithoutCartInputObjectSchema as UserCreateNestedOneWithoutCartInputObjectSchema } from './UserCreateNestedOneWithoutCartInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => CartItemCreateNestedManyWithoutCartInputObjectSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCartInputObjectSchema)
}).strict();
export const CartCreateInputObjectSchema: z.ZodType<Prisma.CartCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateInput>;
export const CartCreateInputObjectZodSchema = makeSchema();
