import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema';
import { CartCreateWithoutUserInputObjectSchema } from './CartCreateWithoutUserInput.schema';
import { CartUncheckedCreateWithoutUserInputObjectSchema } from './CartUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CartCreateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CartCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.CartCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateOrConnectWithoutUserInput>;
export const CartCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
