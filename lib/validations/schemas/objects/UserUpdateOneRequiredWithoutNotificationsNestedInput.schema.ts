/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutNotificationsInputObjectSchema as UserCreateWithoutNotificationsInputObjectSchema } from './UserCreateWithoutNotificationsInput.schema';
import { UserUncheckedCreateWithoutNotificationsInputObjectSchema as UserUncheckedCreateWithoutNotificationsInputObjectSchema } from './UserUncheckedCreateWithoutNotificationsInput.schema';
import { UserCreateOrConnectWithoutNotificationsInputObjectSchema as UserCreateOrConnectWithoutNotificationsInputObjectSchema } from './UserCreateOrConnectWithoutNotificationsInput.schema';
import { UserUpsertWithoutNotificationsInputObjectSchema as UserUpsertWithoutNotificationsInputObjectSchema } from './UserUpsertWithoutNotificationsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutNotificationsInputObjectSchema as UserUpdateToOneWithWhereWithoutNotificationsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutNotificationsInput.schema';
import { UserUpdateWithoutNotificationsInputObjectSchema as UserUpdateWithoutNotificationsInputObjectSchema } from './UserUpdateWithoutNotificationsInput.schema';
import { UserUncheckedUpdateWithoutNotificationsInputObjectSchema as UserUncheckedUpdateWithoutNotificationsInputObjectSchema } from './UserUncheckedUpdateWithoutNotificationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsInputObjectSchema), z.lazy(() => UserUpdateWithoutNotificationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutNotificationsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput>;
export const UserUpdateOneRequiredWithoutNotificationsNestedInputObjectZodSchema = makeSchema();
