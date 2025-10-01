/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateWithoutItemsInputObjectSchema as CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema as CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema';
import { CartCreateOrConnectWithoutItemsInputObjectSchema as CartCreateOrConnectWithoutItemsInputObjectSchema } from './CartCreateOrConnectWithoutItemsInput.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CartCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional()
}).strict();
export const CartCreateNestedOneWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartCreateNestedOneWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateNestedOneWithoutItemsInput>;
export const CartCreateNestedOneWithoutItemsInputObjectZodSchema = makeSchema();
