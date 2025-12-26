/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutNotificationsInputObjectSchema as UserUpdateWithoutNotificationsInputObjectSchema } from './UserUpdateWithoutNotificationsInput.schema';
import { UserUncheckedUpdateWithoutNotificationsInputObjectSchema as UserUncheckedUpdateWithoutNotificationsInputObjectSchema } from './UserUncheckedUpdateWithoutNotificationsInput.schema';
import { UserCreateWithoutNotificationsInputObjectSchema as UserCreateWithoutNotificationsInputObjectSchema } from './UserCreateWithoutNotificationsInput.schema';
import { UserUncheckedCreateWithoutNotificationsInputObjectSchema as UserUncheckedCreateWithoutNotificationsInputObjectSchema } from './UserUncheckedCreateWithoutNotificationsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutNotificationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutNotificationsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutNotificationsInput>;
export const UserUpsertWithoutNotificationsInputObjectZodSchema = makeSchema();
