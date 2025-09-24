import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  cartId: z.string(),
  equipmentId: z.string()
}).strict();
export const CartItemCartIdEquipmentIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CartItemCartIdEquipmentIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCartIdEquipmentIdCompoundUniqueInput>;
export const CartItemCartIdEquipmentIdCompoundUniqueInputObjectZodSchema = makeSchema();
