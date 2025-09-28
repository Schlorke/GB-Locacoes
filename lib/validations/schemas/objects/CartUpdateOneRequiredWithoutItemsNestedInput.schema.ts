/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateWithoutItemsInputObjectSchema as CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema as CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema';
import { CartCreateOrConnectWithoutItemsInputObjectSchema as CartCreateOrConnectWithoutItemsInputObjectSchema } from './CartCreateOrConnectWithoutItemsInput.schema';
import { CartUpsertWithoutItemsInputObjectSchema as CartUpsertWithoutItemsInputObjectSchema } from './CartUpsertWithoutItemsInput.schema';
import { CartWhereUniqueInputObjectSchema as CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema';
import { CartUpdateToOneWithWhereWithoutItemsInputObjectSchema as CartUpdateToOneWithWhereWithoutItemsInputObjectSchema } from './CartUpdateToOneWithWhereWithoutItemsInput.schema';
import { CartUpdateWithoutItemsInputObjectSchema as CartUpdateWithoutItemsInputObjectSchema } from './CartUpdateWithoutItemsInput.schema';
import { CartUncheckedUpdateWithoutItemsInputObjectSchema as CartUncheckedUpdateWithoutItemsInputObjectSchema } from './CartUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CartCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => CartUpsertWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CartUpdateToOneWithWhereWithoutItemsInputObjectSchema), z.lazy(() => CartUpdateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutItemsInputObjectSchema)]).optional()
}).strict();
export const CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema: z.ZodType<Prisma.CartUpdateOneRequiredWithoutItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpdateOneRequiredWithoutItemsNestedInput>;
export const CartUpdateOneRequiredWithoutItemsNestedInputObjectZodSchema = makeSchema();
