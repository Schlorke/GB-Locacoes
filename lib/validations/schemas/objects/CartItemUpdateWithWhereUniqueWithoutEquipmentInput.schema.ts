import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInputObjectSchema } from './CartItemWhereUniqueInput.schema';
import { CartItemUpdateWithoutEquipmentInputObjectSchema } from './CartItemUpdateWithoutEquipmentInput.schema';
import { CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './CartItemUncheckedUpdateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CartItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => CartItemUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
export const CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateWithWhereUniqueWithoutEquipmentInput>;
export const CartItemUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
