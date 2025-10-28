/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCartIdEquipmentIdCompoundUniqueInputObjectSchema as CartItemCartIdEquipmentIdCompoundUniqueInputObjectSchema } from './CartItemCartIdEquipmentIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId_equipmentId: z.lazy(() => CartItemCartIdEquipmentIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CartItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.CartItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemWhereUniqueInput>;
export const CartItemWhereUniqueInputObjectZodSchema = makeSchema();
