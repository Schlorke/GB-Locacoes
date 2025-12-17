import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemCreateWithoutCartInputObjectSchema as CartItemCreateWithoutCartInputObjectSchema } from './CartItemCreateWithoutCartInput.schema';
import { CartItemUncheckedCreateWithoutCartInputObjectSchema as CartItemUncheckedCreateWithoutCartInputObjectSchema } from './CartItemUncheckedCreateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CartItemCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema)])
}).strict();
export const CartItemCreateOrConnectWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemCreateOrConnectWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateOrConnectWithoutCartInput>;
export const CartItemCreateOrConnectWithoutCartInputObjectZodSchema = makeSchema();
