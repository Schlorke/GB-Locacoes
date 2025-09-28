/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  equipmentId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  finalPrice: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CartItemCreateManyCartInputObjectSchema: z.ZodType<Prisma.CartItemCreateManyCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyCartInput>;
export const CartItemCreateManyCartInputObjectZodSchema = makeSchema();
