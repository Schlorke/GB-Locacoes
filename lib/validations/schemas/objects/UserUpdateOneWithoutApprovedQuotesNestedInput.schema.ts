/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutApprovedQuotesInputObjectSchema as UserCreateWithoutApprovedQuotesInputObjectSchema } from './UserCreateWithoutApprovedQuotesInput.schema';
import { UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema as UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutApprovedQuotesInput.schema';
import { UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema as UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema } from './UserCreateOrConnectWithoutApprovedQuotesInput.schema';
import { UserUpsertWithoutApprovedQuotesInputObjectSchema as UserUpsertWithoutApprovedQuotesInputObjectSchema } from './UserUpsertWithoutApprovedQuotesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutApprovedQuotesInputObjectSchema as UserUpdateToOneWithWhereWithoutApprovedQuotesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutApprovedQuotesInput.schema';
import { UserUpdateWithoutApprovedQuotesInputObjectSchema as UserUpdateWithoutApprovedQuotesInputObjectSchema } from './UserUpdateWithoutApprovedQuotesInput.schema';
import { UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema as UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutApprovedQuotesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutApprovedQuotesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUpdateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutApprovedQuotesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutApprovedQuotesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutApprovedQuotesNestedInput>;
export const UserUpdateOneWithoutApprovedQuotesNestedInputObjectZodSchema = makeSchema();
