/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRentalsInputObjectSchema as UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema as UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema';
import { UserCreateOrConnectWithoutRentalsInputObjectSchema as UserCreateOrConnectWithoutRentalsInputObjectSchema } from './UserCreateOrConnectWithoutRentalsInput.schema';
import { UserUpsertWithoutRentalsInputObjectSchema as UserUpsertWithoutRentalsInputObjectSchema } from './UserUpsertWithoutRentalsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema as UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutRentalsInput.schema';
import { UserUpdateWithoutRentalsInputObjectSchema as UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema';
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema as UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRentalsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema), z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRentalsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutRentalsNestedInput>;
export const UserUpdateOneRequiredWithoutRentalsNestedInputObjectZodSchema = makeSchema();
