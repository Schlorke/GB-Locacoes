import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCreateWithoutEquipmentInputObjectSchema } from './CartItemCreateWithoutEquipmentInput.schema';
import { CartItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedCreateWithoutEquipmentInput.schema';
import { CartItemCreateOrConnectWithoutEquipmentInputObjectSchema } from './CartItemCreateOrConnectWithoutEquipmentInput.schema';
import { CartItemCreateManyEquipmentInputEnvelopeObjectSchema } from './CartItemCreateManyEquipmentInputEnvelope.schema';
import { CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CartItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CartItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CartItemWhereUniqueInputObjectSchema), z.lazy(() => CartItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CartItemCreateNestedManyWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemCreateNestedManyWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateNestedManyWithoutEquipmentInput>;
export const CartItemCreateNestedManyWithoutEquipmentInputObjectZodSchema = makeSchema();
