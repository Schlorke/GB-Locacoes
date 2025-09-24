import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutCartInputObjectSchema } from './CartItemCreateWithoutCartInput.schema';
import { CartItemUncheckedCreateWithoutCartInputObjectSchema } from './CartItemUncheckedCreateWithoutCartInput.schema';
import { CartItemCreateOrConnectWithoutCartInputObjectSchema } from './CartItemCreateOrConnectWithoutCartInput.schema';
import { CartItemCreateManyCartInputEnvelopeObjectSchema } from './CartItemCreateManyCartInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemCreateWithoutCartInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutCartInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutCartInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyCartInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUncheckedCreateNestedManyWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutCartInput>;
export const CartItemUncheckedCreateNestedManyWithoutCartInputObjectZodSchema = makeSchema();
