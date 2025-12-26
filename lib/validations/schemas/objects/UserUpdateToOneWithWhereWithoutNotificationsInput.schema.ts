/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutNotificationsInputObjectSchema as UserUpdateWithoutNotificationsInputObjectSchema } from './UserUpdateWithoutNotificationsInput.schema';
import { UserUncheckedUpdateWithoutNotificationsInputObjectSchema as UserUncheckedUpdateWithoutNotificationsInputObjectSchema } from './UserUncheckedUpdateWithoutNotificationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutNotificationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutNotificationsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput>;
export const UserUpdateToOneWithWhereWithoutNotificationsInputObjectZodSchema = makeSchema();
