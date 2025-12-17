import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAddressesInputObjectSchema as UserCreateWithoutAddressesInputObjectSchema } from './UserCreateWithoutAddressesInput.schema';
import { UserUncheckedCreateWithoutAddressesInputObjectSchema as UserUncheckedCreateWithoutAddressesInputObjectSchema } from './UserUncheckedCreateWithoutAddressesInput.schema';
import { UserCreateOrConnectWithoutAddressesInputObjectSchema as UserCreateOrConnectWithoutAddressesInputObjectSchema } from './UserCreateOrConnectWithoutAddressesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAddressesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddressesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAddressesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAddressesInput>;
export const UserCreateNestedOneWithoutAddressesInputObjectZodSchema = makeSchema();
