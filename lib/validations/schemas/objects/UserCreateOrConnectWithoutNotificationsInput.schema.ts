/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutNotificationsInputObjectSchema as UserCreateWithoutNotificationsInputObjectSchema } from './UserCreateWithoutNotificationsInput.schema';
import { UserUncheckedCreateWithoutNotificationsInputObjectSchema as UserUncheckedCreateWithoutNotificationsInputObjectSchema } from './UserUncheckedCreateWithoutNotificationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutNotificationsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput>;
export const UserCreateOrConnectWithoutNotificationsInputObjectZodSchema = makeSchema();
