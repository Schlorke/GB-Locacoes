/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CartItemOrderByRelationAggregateInputObjectSchema as CartItemOrderByRelationAggregateInputObjectSchema } from './CartItemOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  items: z.lazy(() => CartItemOrderByRelationAggregateInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CartOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CartOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CartOrderByWithRelationInput>;
export const CartOrderByWithRelationInputObjectZodSchema = makeSchema();
