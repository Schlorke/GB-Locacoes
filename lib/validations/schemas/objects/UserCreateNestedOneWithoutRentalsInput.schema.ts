import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema';
import { UserCreateOrConnectWithoutRentalsInputObjectSchema } from './UserCreateOrConnectWithoutRentalsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRentalsInput, Prisma.UserCreateNestedOneWithoutRentalsInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutRentalsInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
