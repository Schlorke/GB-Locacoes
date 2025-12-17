/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CartCreateManyInputObjectSchema: z.ZodType<Prisma.CartCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateManyInput>;
export const CartCreateManyInputObjectZodSchema = makeSchema();
