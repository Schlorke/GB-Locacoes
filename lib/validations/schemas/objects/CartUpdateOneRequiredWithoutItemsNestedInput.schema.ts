import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateWithoutItemsInputObjectSchema } from './CartCreateWithoutItemsInput.schema';
import { CartUncheckedCreateWithoutItemsInputObjectSchema } from './CartUncheckedCreateWithoutItemsInput.schema';
import { CartCreateOrConnectWithoutItemsInputObjectSchema } from './CartCreateOrConnectWithoutItemsInput.schema';
import { CartUpsertWithoutItemsInputObjectSchema } from './CartUpsertWithoutItemsInput.schema';
import { CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema';
import { CartUpdateToOneWithWhereWithoutItemsInputObjectSchema } from './CartUpdateToOneWithWhereWithoutItemsInput.schema';
import { CartUpdateWithoutItemsInputObjectSchema } from './CartUpdateWithoutItemsInput.schema';
import { CartUncheckedUpdateWithoutItemsInputObjectSchema } from './CartUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartCreateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CartCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => CartUpsertWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CartUpdateToOneWithWhereWithoutItemsInputObjectSchema), z.lazy(() => CartUpdateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutItemsInputObjectSchema)]).optional()
}).strict();
export const CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema: z.ZodType<Prisma.CartUpdateOneRequiredWithoutItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpdateOneRequiredWithoutItemsNestedInput>;
export const CartUpdateOneRequiredWithoutItemsNestedInputObjectZodSchema = makeSchema();
