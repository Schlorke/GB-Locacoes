/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutCartInputObjectSchema as CartItemUpdateWithoutCartInputObjectSchema } from './CartItemUpdateWithoutCartInput.schema';
import { CartItemUncheckedUpdateWithoutCartInputObjectSchema as CartItemUncheckedUpdateWithoutCartInputObjectSchema } from './CartItemUncheckedUpdateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutCartInputObjectSchema)])
}).strict();
export const CartItemUpdateWithWhereUniqueWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutCartInput>;
export const CartItemUpdateWithWhereUniqueWithoutCartInputObjectZodSchema = makeSchema();
