/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutEquipmentInputObjectSchema as CartItemCreateWithoutEquipmentInputObjectSchema } from './CartItemCreateWithoutEquipmentInput.schema';
import { CartItemUncheckedCreateWithoutEquipmentInputObjectSchema as CartItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedCreateWithoutEquipmentInput.schema';
import { CartItemCreateOrConnectWithoutEquipmentInputObjectSchema as CartItemCreateOrConnectWithoutEquipmentInputObjectSchema } from './CartItemCreateOrConnectWithoutEquipmentInput.schema';
import { CartItemCreateManyEquipmentInputEnvelopeObjectSchema as CartItemCreateManyEquipmentInputEnvelopeObjectSchema } from './CartItemCreateManyEquipmentInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CartItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateNestedManyWithoutEquipmentInput>;
export const CartItemUncheckedCreateNestedManyWithoutEquipmentInputObjectZodSchema = makeSchema();
