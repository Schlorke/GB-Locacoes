/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutRentalsInputObjectSchema as UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema';
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema as UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema';
import { UserCreateWithoutRentalsInputObjectSchema as UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema as UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRentalsInput>;
export const UserUpsertWithoutRentalsInputObjectZodSchema = makeSchema();
