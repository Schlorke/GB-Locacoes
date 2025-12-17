import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema';
import { CartItemUpdateManyMutationInputObjectSchema as CartItemUpdateManyMutationInputObjectSchema } from './CartItemUpdateManyMutationInput.schema';
import { CartItemUncheckedUpdateManyWithoutCartInputObjectSchema as CartItemUncheckedUpdateManyWithoutCartInputObjectSchema } from './CartItemUncheckedUpdateManyWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateManyMutationInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateManyWithoutCartInputObjectSchema)])
}).strict();
export const CartItemUpdateManyWithWhereWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateManyWithWhereWithoutCartInput>;
export const CartItemUpdateManyWithWhereWithoutCartInputObjectZodSchema = makeSchema();
