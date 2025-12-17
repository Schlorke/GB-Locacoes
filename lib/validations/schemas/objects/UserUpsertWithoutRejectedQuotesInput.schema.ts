/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutRejectedQuotesInputObjectSchema as UserUpdateWithoutRejectedQuotesInputObjectSchema } from './UserUpdateWithoutRejectedQuotesInput.schema';
import { UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema as UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutRejectedQuotesInput.schema';
import { UserCreateWithoutRejectedQuotesInputObjectSchema as UserCreateWithoutRejectedQuotesInputObjectSchema } from './UserCreateWithoutRejectedQuotesInput.schema';
import { UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema as UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutRejectedQuotesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutRejectedQuotesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRejectedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRejectedQuotesInput>;
export const UserUpsertWithoutRejectedQuotesInputObjectZodSchema = makeSchema();
