import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCartInputObjectSchema } from './UserCreateWithoutCartInput.schema';
import { UserUncheckedCreateWithoutCartInputObjectSchema } from './UserUncheckedCreateWithoutCartInput.schema';
import { UserCreateOrConnectWithoutCartInputObjectSchema } from './UserCreateOrConnectWithoutCartInput.schema';
import { UserUpsertWithoutCartInputObjectSchema } from './UserUpsertWithoutCartInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCartInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCartInput.schema';
import { UserUpdateWithoutCartInputObjectSchema } from './UserUpdateWithoutCartInput.schema';
import { UserUncheckedUpdateWithoutCartInputObjectSchema } from './UserUncheckedUpdateWithoutCartInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCartInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCartInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCartInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCartInputObjectSchema), z.lazy(() => UserUpdateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCartInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCartNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCartNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCartNestedInput>;
export const UserUpdateOneRequiredWithoutCartNestedInputObjectZodSchema = makeSchema();
