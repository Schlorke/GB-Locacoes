import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutCartInputObjectSchema } from './CartItemUpdateWithoutCartInput.schema';
import { CartItemUncheckedUpdateWithoutCartInputObjectSchema } from './CartItemUncheckedUpdateWithoutCartInput.schema';
import { CartItemCreateWithoutCartInputObjectSchema } from './CartItemCreateWithoutCartInput.schema';
import { CartItemUncheckedCreateWithoutCartInputObjectSchema } from './CartItemUncheckedCreateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CartItemUpdateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutCartInputObjectSchema)]),
  create: z.union([z.lazy(() => CartItemCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema)])
}).strict();
export const CartItemUpsertWithWhereUniqueWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutCartInput>;
export const CartItemUpsertWithWhereUniqueWithoutCartInputObjectZodSchema = makeSchema();
