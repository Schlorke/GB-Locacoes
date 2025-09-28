/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAddressesInputObjectSchema as UserUpdateWithoutAddressesInputObjectSchema } from './UserUpdateWithoutAddressesInput.schema';
import { UserUncheckedUpdateWithoutAddressesInputObjectSchema as UserUncheckedUpdateWithoutAddressesInputObjectSchema } from './UserUncheckedUpdateWithoutAddressesInput.schema';
import { UserCreateWithoutAddressesInputObjectSchema as UserCreateWithoutAddressesInputObjectSchema } from './UserCreateWithoutAddressesInput.schema';
import { UserUncheckedCreateWithoutAddressesInputObjectSchema as UserUncheckedCreateWithoutAddressesInputObjectSchema } from './UserUncheckedCreateWithoutAddressesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAddressesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAddressesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAddressesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAddressesInput>;
export const UserUpsertWithoutAddressesInputObjectZodSchema = makeSchema();
