/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutCartInputObjectSchema as CartItemUpdateWithoutCartInputObjectSchema } from './CartItemUpdateWithoutCartInput.schema';
import { CartItemUncheckedUpdateWithoutCartInputObjectSchema as CartItemUncheckedUpdateWithoutCartInputObjectSchema } from './CartItemUncheckedUpdateWithoutCartInput.schema';
import { CartItemCreateWithoutCartInputObjectSchema as CartItemCreateWithoutCartInputObjectSchema } from './CartItemCreateWithoutCartInput.schema';
import { CartItemUncheckedCreateWithoutCartInputObjectSchema as CartItemUncheckedCreateWithoutCartInputObjectSchema } from './CartItemUncheckedCreateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CartItemUpdateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutCartInputObjectSchema)]),
  create: z.union([z.lazy(() => CartItemCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema)])
}).strict();
export const CartItemUpsertWithWhereUniqueWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput>;
export const CartItemUpsertWithWhereUniqueWithoutCartInputObjectZodSchema = makeSchema();
