import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAccountsInputObjectSchema } from './UserUpdateWithoutAccountsInput.schema';
import { UserUncheckedUpdateWithoutAccountsInputObjectSchema } from './UserUncheckedUpdateWithoutAccountsInput.schema';
import { UserCreateWithoutAccountsInputObjectSchema } from './UserCreateWithoutAccountsInput.schema';
import { UserUncheckedCreateWithoutAccountsInputObjectSchema } from './UserUncheckedCreateWithoutAccountsInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAccountsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAccountsInput>;
export const UserUpsertWithoutAccountsInputObjectZodSchema = makeSchema();
