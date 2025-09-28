/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemUncheckedCreateNestedManyWithoutCartInputObjectSchema as CartItemUncheckedCreateNestedManyWithoutCartInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutCartInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  items: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutCartInputObjectSchema).optional()
}).strict();
export const CartUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CartUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedCreateWithoutUserInput>;
export const CartUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
