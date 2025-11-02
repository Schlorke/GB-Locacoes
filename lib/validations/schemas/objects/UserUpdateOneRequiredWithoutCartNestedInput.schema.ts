import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCartInputObjectSchema as UserCreateWithoutCartInputObjectSchema } from './UserCreateWithoutCartInput.schema';
import { UserUncheckedCreateWithoutCartInputObjectSchema as UserUncheckedCreateWithoutCartInputObjectSchema } from './UserUncheckedCreateWithoutCartInput.schema';
import { UserCreateOrConnectWithoutCartInputObjectSchema as UserCreateOrConnectWithoutCartInputObjectSchema } from './UserCreateOrConnectWithoutCartInput.schema';
import { UserUpsertWithoutCartInputObjectSchema as UserUpsertWithoutCartInputObjectSchema } from './UserUpsertWithoutCartInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCartInputObjectSchema as UserUpdateToOneWithWhereWithoutCartInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCartInput.schema';
import { UserUpdateWithoutCartInputObjectSchema as UserUpdateWithoutCartInputObjectSchema } from './UserUpdateWithoutCartInput.schema';
import { UserUncheckedUpdateWithoutCartInputObjectSchema as UserUncheckedUpdateWithoutCartInputObjectSchema } from './UserUncheckedUpdateWithoutCartInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCartInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCartInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCartInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCartInputObjectSchema), z.lazy(() => UserUpdateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCartInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCartNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCartNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCartNestedInput>;
export const UserUpdateOneRequiredWithoutCartNestedInputObjectZodSchema = makeSchema();
