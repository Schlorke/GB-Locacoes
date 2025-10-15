/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema';
import { CartCreateWithoutItemsInputObjectSchema as CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema as CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)])
}).strict();
export const CartCreateOrConnectWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartCreateOrConnectWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateOrConnectWithoutItemsInput>;
export const CartCreateOrConnectWithoutItemsInputObjectZodSchema = makeSchema();
