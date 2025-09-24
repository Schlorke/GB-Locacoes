import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutCartInputObjectSchema } from './CartItemCreateWithoutCartInput.schema';
import { CartItemUncheckedCreateWithoutCartInputObjectSchema } from './CartItemUncheckedCreateWithoutCartInput.schema';
import { CartItemCreateOrConnectWithoutCartInputObjectSchema } from './CartItemCreateOrConnectWithoutCartInput.schema';
import { CartItemUpsertWithWhereUniqueWithoutCartInputObjectSchema } from './CartItemUpsertWithWhereUniqueWithoutCartInput.schema';
import { CartItemCreateManyCartInputEnvelopeObjectSchema } from './CartItemCreateManyCartInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithWhereUniqueWithoutCartInputObjectSchema } from './CartItemUpdateWithWhereUniqueWithoutCartInput.schema';
import { CartItemUpdateManyWithWhereWithoutCartInputObjectSchema } from './CartItemUpdateManyWithWhereWithoutCartInput.schema';
import { CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemCreateWithoutCartInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutCartInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutCartInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutCartInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CartItemUpsertWithWhereUniqueWithoutCartInputObjectSchema), z.lazy(() => CartItemUpsertWithWhereUniqueWithoutCartInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyCartInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CartItemUpdateWithWhereUniqueWithoutCartInputObjectSchema), z.lazy(() => CartItemUpdateWithWhereUniqueWithoutCartInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CartItemUpdateManyWithWhereWithoutCartInputObjectSchema), z.lazy(() => CartItemUpdateManyWithWhereWithoutCartInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CartItemScalarWhereInputObjectSchema), z.lazy(() => CartItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUpdateManyWithoutCartNestedInputObjectSchema: z.ZodType<Prisma.CartItemUpdateManyWithoutCartNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateManyWithoutCartNestedInput>;
export const CartItemUpdateManyWithoutCartNestedInputObjectZodSchema = makeSchema();
