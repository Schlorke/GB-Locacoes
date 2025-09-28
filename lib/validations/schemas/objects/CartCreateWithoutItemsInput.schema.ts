/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCartInputObjectSchema as UserCreateNestedOneWithoutCartInputObjectSchema } from './UserCreateNestedOneWithoutCartInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCartInputObjectSchema)
}).strict();
export const CartCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateWithoutItemsInput>;
export const CartCreateWithoutItemsInputObjectZodSchema = makeSchema();
