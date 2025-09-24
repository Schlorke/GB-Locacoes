import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAddressesInputObjectSchema } from './UserCreateWithoutAddressesInput.schema';
import { UserUncheckedCreateWithoutAddressesInputObjectSchema } from './UserUncheckedCreateWithoutAddressesInput.schema';
import { UserCreateOrConnectWithoutAddressesInputObjectSchema } from './UserCreateOrConnectWithoutAddressesInput.schema';
import { UserUpsertWithoutAddressesInputObjectSchema } from './UserUpsertWithoutAddressesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAddressesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAddressesInput.schema';
import { UserUpdateWithoutAddressesInputObjectSchema } from './UserUpdateWithoutAddressesInput.schema';
import { UserUncheckedUpdateWithoutAddressesInputObjectSchema } from './UserUncheckedUpdateWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAddressesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAddressesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAddressesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAddressesInputObjectSchema), z.lazy(() => UserUpdateWithoutAddressesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAddressesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAddressesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddressesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAddressesNestedInput>;
export const UserUpdateOneRequiredWithoutAddressesNestedInputObjectZodSchema = makeSchema();
