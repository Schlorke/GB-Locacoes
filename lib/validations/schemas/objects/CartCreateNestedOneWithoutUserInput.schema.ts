import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateWithoutUserInputObjectSchema } from './CartCreateWithoutUserInput.schema';
import { CartUncheckedCreateWithoutUserInputObjectSchema } from './CartUncheckedCreateWithoutUserInput.schema';
import { CartCreateOrConnectWithoutUserInputObjectSchema } from './CartCreateOrConnectWithoutUserInput.schema';
import { CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartCreateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CartCreateOrConnectWithoutUserInputObjectSchema).optional(),
  connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional()
}).strict();
export const CartCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.CartCreateNestedOneWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CartCreateNestedOneWithoutUserInput>;
export const CartCreateNestedOneWithoutUserInputObjectZodSchema = makeSchema();
