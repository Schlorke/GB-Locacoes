/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CartMinAggregateInputObjectSchema: z.ZodType<Prisma.CartMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CartMinAggregateInputType>;
export const CartMinAggregateInputObjectZodSchema = makeSchema();
