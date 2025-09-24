import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemUncheckedCreateNestedManyWithoutCartInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutCartInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutCartInputObjectSchema)
}).strict();
export const CartUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CartUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedCreateInput>;
export const CartUncheckedCreateInputObjectZodSchema = makeSchema();
