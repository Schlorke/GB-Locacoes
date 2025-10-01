/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutEquipmentInputObjectSchema as CartItemUpdateWithoutEquipmentInputObjectSchema } from './CartItemUpdateWithoutEquipmentInput.schema';
import { CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema as CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedUpdateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
export const CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutEquipmentInput>;
export const CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
