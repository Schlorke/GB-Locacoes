import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAccountsInputObjectSchema } from './UserCreateWithoutAccountsInput.schema';
import { UserUncheckedCreateWithoutAccountsInputObjectSchema } from './UserUncheckedCreateWithoutAccountsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput>;
export const UserCreateOrConnectWithoutAccountsInputObjectZodSchema = makeSchema();
