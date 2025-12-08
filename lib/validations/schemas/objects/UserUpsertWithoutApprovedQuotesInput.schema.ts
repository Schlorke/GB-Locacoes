/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutApprovedQuotesInputObjectSchema as UserUpdateWithoutApprovedQuotesInputObjectSchema } from './UserUpdateWithoutApprovedQuotesInput.schema';
import { UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema as UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutApprovedQuotesInput.schema';
import { UserCreateWithoutApprovedQuotesInputObjectSchema as UserCreateWithoutApprovedQuotesInputObjectSchema } from './UserCreateWithoutApprovedQuotesInput.schema';
import { UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema as UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutApprovedQuotesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutApprovedQuotesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutApprovedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutApprovedQuotesInput>;
export const UserUpsertWithoutApprovedQuotesInputObjectZodSchema = makeSchema();
