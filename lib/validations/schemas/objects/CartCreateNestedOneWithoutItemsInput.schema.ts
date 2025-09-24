import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema';
import { CartCreateOrConnectWithoutItemsInputObjectSchema } from './CartCreateOrConnectWithoutItemsInput.schema';
import { CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CartCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional()
}).strict();
export const CartCreateNestedOneWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartCreateNestedOneWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateNestedOneWithoutItemsInput>;
export const CartCreateNestedOneWithoutItemsInputObjectZodSchema = makeSchema();
