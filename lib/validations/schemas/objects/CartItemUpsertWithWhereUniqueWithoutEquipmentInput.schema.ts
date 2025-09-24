import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutEquipmentInputObjectSchema } from './CartItemUpdateWithoutEquipmentInput.schema';
import { CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedUpdateWithoutEquipmentInput.schema';
import { CartItemCreateWithoutEquipmentInputObjectSchema } from './CartItemCreateWithoutEquipmentInput.schema';
import { CartItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CartItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema)]),
  create: z.union([z.lazy(() => CartItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedCreateWithoutEquipmentInputObjectSchema)])
}).strict();
export const CartItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpsertWithWhereUniqueWithoutEquipmentInput>;
export const CartItemUpsertWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
