import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartUpdateWithoutUserInputObjectSchema } from './CartUpdateWithoutUserInput.schema';
import { CartUncheckedUpdateWithoutUserInputObjectSchema } from './CartUncheckedUpdateWithoutUserInput.schema';
import { CartCreateWithoutUserInputObjectSchema } from './CartCreateWithoutUserInput.schema';
import { CartUncheckedCreateWithoutUserInputObjectSchema } from './CartUncheckedCreateWithoutUserInput.schema';
import { CartWhereInputObjectSchema } from './CartWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CartUpdateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => CartCreateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => CartWhereInputObjectSchema).optional()
}).strict();
export const CartUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.CartUpsertWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpsertWithoutUserInput>;
export const CartUpsertWithoutUserInputObjectZodSchema = makeSchema();
