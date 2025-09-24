import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartArgsObjectSchema } from './CartArgs.schema';
import { EquipmentArgsObjectSchema } from './EquipmentArgs.schema'

const makeSchema = () => z.object({
  cart: z.union([z.boolean(), z.lazy(() => CartArgsObjectSchema)]).optional(),
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional()
}).strict();
export const CartItemIncludeObjectSchema: z.ZodType<Prisma.CartItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.CartItemInclude>;
export const CartItemIncludeObjectZodSchema = makeSchema();
