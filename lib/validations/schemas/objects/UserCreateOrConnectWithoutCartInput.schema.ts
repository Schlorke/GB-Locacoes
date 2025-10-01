/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCartInputObjectSchema as UserCreateWithoutCartInputObjectSchema } from './UserCreateWithoutCartInput.schema';
import { UserUncheckedCreateWithoutCartInputObjectSchema as UserUncheckedCreateWithoutCartInputObjectSchema } from './UserUncheckedCreateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCartInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCartInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCartInput>;
export const UserCreateOrConnectWithoutCartInputObjectZodSchema = makeSchema();
