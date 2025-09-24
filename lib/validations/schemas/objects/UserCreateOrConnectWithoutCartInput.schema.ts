import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCartInputObjectSchema } from './UserCreateWithoutCartInput.schema';
import { UserUncheckedCreateWithoutCartInputObjectSchema } from './UserUncheckedCreateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCartInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCartInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCartInput>;
export const UserCreateOrConnectWithoutCartInputObjectZodSchema = makeSchema();
