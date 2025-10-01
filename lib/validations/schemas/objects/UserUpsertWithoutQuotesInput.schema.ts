/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutQuotesInputObjectSchema as UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema';
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema as UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema';
import { UserCreateWithoutQuotesInputObjectSchema as UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema';
import { UserUncheckedCreateWithoutQuotesInputObjectSchema as UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutQuotesInput>;
export const UserUpsertWithoutQuotesInputObjectZodSchema = makeSchema();
