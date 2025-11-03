/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartUpdateWithoutUserInputObjectSchema as CartUpdateWithoutUserInputObjectSchema } from './CartUpdateWithoutUserInput.schema';
import { CartUncheckedUpdateWithoutUserInputObjectSchema as CartUncheckedUpdateWithoutUserInputObjectSchema } from './CartUncheckedUpdateWithoutUserInput.schema';
import { CartCreateWithoutUserInputObjectSchema as CartCreateWithoutUserInputObjectSchema } from './CartCreateWithoutUserInput.schema';
import { CartUncheckedCreateWithoutUserInputObjectSchema as CartUncheckedCreateWithoutUserInputObjectSchema } from './CartUncheckedCreateWithoutUserInput.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './CartWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CartUpdateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => CartCreateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => CartWhereInputObjectSchema).optional()
}).strict();
export const CartUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.CartUpsertWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpsertWithoutUserInput>;
export const CartUpsertWithoutUserInputObjectZodSchema = makeSchema();
