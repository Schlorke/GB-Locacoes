import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereInputObjectSchema } from './CartWhereInput.schema';
import { CartUpdateWithoutUserInputObjectSchema } from './CartUpdateWithoutUserInput.schema';
import { CartUncheckedUpdateWithoutUserInputObjectSchema } from './CartUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CartUpdateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CartUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CartUpdateToOneWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpdateToOneWithWhereWithoutUserInput>;
export const CartUpdateToOneWithWhereWithoutUserInputObjectZodSchema = makeSchema();
