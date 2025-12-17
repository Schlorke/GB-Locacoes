import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartUpdateWithoutItemsInputObjectSchema as CartUpdateWithoutItemsInputObjectSchema } from './CartUpdateWithoutItemsInput.schema';
import { CartUncheckedUpdateWithoutItemsInputObjectSchema as CartUncheckedUpdateWithoutItemsInputObjectSchema } from './CartUncheckedUpdateWithoutItemsInput.schema';
import { CartCreateWithoutItemsInputObjectSchema as CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema as CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './CartWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CartUpdateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)]),
  where: z.lazy(() => CartWhereInputObjectSchema).optional()
}).strict();
export const CartUpsertWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartUpsertWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpsertWithoutItemsInput>;
export const CartUpsertWithoutItemsInputObjectZodSchema = makeSchema();
