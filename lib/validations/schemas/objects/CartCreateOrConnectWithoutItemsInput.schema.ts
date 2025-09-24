import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema';
import { CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)])
}).strict();
export const CartCreateOrConnectWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartCreateOrConnectWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateOrConnectWithoutItemsInput>;
export const CartCreateOrConnectWithoutItemsInputObjectZodSchema = makeSchema();
