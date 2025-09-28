/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAddressesInputObjectSchema as UserCreateWithoutAddressesInputObjectSchema } from './UserCreateWithoutAddressesInput.schema';
import { UserUncheckedCreateWithoutAddressesInputObjectSchema as UserUncheckedCreateWithoutAddressesInputObjectSchema } from './UserUncheckedCreateWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAddressesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAddressesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAddressesInput>;
export const UserCreateOrConnectWithoutAddressesInputObjectZodSchema = makeSchema();
