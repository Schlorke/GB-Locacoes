/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAddressesInputObjectSchema as UserUpdateWithoutAddressesInputObjectSchema } from './UserUpdateWithoutAddressesInput.schema';
import { UserUncheckedUpdateWithoutAddressesInputObjectSchema as UserUncheckedUpdateWithoutAddressesInputObjectSchema } from './UserUncheckedUpdateWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAddressesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAddressesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAddressesInput>;
export const UserUpdateToOneWithWhereWithoutAddressesInputObjectZodSchema = makeSchema();
