import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereInputObjectSchema } from './CartWhereInput.schema';
import { CartUpdateWithoutItemsInputObjectSchema } from './CartUpdateWithoutItemsInput.schema';
import { CartUncheckedUpdateWithoutItemsInputObjectSchema } from './CartUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CartUpdateWithoutItemsInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutItemsInputObjectSchema)])
}).strict();
export const CartUpdateToOneWithWhereWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartUpdateToOneWithWhereWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpdateToOneWithWhereWithoutItemsInput>;
export const CartUpdateToOneWithWhereWithoutItemsInputObjectZodSchema = makeSchema();
