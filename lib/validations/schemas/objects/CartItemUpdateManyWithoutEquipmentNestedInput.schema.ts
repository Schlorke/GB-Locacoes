/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutEquipmentInputObjectSchema as CartItemCreateWithoutEquipmentInputObjectSchema } from './CartItemCreateWithoutEquipmentInput.schema';
import { CartItemUncheckedCreateWithoutEquipmentInputObjectSchema as CartItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedCreateWithoutEquipmentInput.schema';
import { CartItemCreateOrConnectWithoutEquipmentInputObjectSchema as CartItemCreateOrConnectWithoutEquipmentInputObjectSchema } from './CartItemCreateOrConnectWithoutEquipmentInput.schema';
import { CartItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema as CartItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema } from './CartItemUpsertWithWhereUniqueWithoutEquipmentInput.schema';
import { CartItemCreateManyEquipmentInputEnvelopeObjectSchema as CartItemCreateManyEquipmentInputEnvelopeObjectSchema } from './CartItemCreateManyEquipmentInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema as CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema } from './CartItemUpdateWithWhereUniqueWithoutEquipmentInput.schema';
import { CartItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema as CartItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema } from './CartItemUpdateManyWithWhereWithoutEquipmentInput.schema';
import { CartItemScalarWhereInputObjectSchema as CartItemScalarWhereInputObjectSchema } from './CartItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CartItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CartItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CartItemScalarWhereInputObjectSchema), z.lazy(() => CartItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUpdateManyWithoutEquipmentNestedInputObjectSchema: z.ZodType<Prisma.CartItemUpdateManyWithoutEquipmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateManyWithoutEquipmentNestedInput>;
export const CartItemUpdateManyWithoutEquipmentNestedInputObjectZodSchema = makeSchema();
