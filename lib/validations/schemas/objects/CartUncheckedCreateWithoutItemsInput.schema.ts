/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CartUncheckedCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartUncheckedCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedCreateWithoutItemsInput>;
export const CartUncheckedCreateWithoutItemsInputObjectZodSchema = makeSchema();
