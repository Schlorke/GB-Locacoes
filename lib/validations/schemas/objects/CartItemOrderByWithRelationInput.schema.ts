/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './CartOrderByWithRelationInput.schema';
import { EquipmentOrderByWithRelationInputObjectSchema as EquipmentOrderByWithRelationInputObjectSchema } from './EquipmentOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  cartId: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  finalPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  cart: z.lazy(() => CartOrderByWithRelationInputObjectSchema).optional(),
  equipment: z.lazy(() => EquipmentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CartItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CartItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemOrderByWithRelationInput>;
export const CartItemOrderByWithRelationInputObjectZodSchema = makeSchema();
