import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateWithoutUserInputObjectSchema } from './CartCreateWithoutUserInput.schema';
import { CartUncheckedCreateWithoutUserInputObjectSchema } from './CartUncheckedCreateWithoutUserInput.schema';
import { CartCreateOrConnectWithoutUserInputObjectSchema } from './CartCreateOrConnectWithoutUserInput.schema';
import { CartUpsertWithoutUserInputObjectSchema } from './CartUpsertWithoutUserInput.schema';
import { CartWhereInputObjectSchema } from './CartWhereInput.schema';
import { CartWhereUniqueInputObjectSchema } from './CartWhereUniqueInput.schema';
import { CartUpdateToOneWithWhereWithoutUserInputObjectSchema } from './CartUpdateToOneWithWhereWithoutUserInput.schema';
import { CartUpdateWithoutUserInputObjectSchema } from './CartUpdateWithoutUserInput.schema';
import { CartUncheckedUpdateWithoutUserInputObjectSchema } from './CartUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CartCreateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CartCreateOrConnectWithoutUserInputObjectSchema).optional(),
  upsert: z.lazy(() => CartUpsertWithoutUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CartWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CartWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CartWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CartUpdateToOneWithWhereWithoutUserInputObjectSchema), z.lazy(() => CartUpdateWithoutUserInputObjectSchema), z.lazy(() => CartUncheckedUpdateWithoutUserInputObjectSchema)]).optional()
}).strict();
export const CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CartUncheckedUpdateOneWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedUpdateOneWithoutUserNestedInput>;
export const CartUncheckedUpdateOneWithoutUserNestedInputObjectZodSchema = makeSchema();
