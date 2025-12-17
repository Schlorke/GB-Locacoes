/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutApprovedQuotesInputObjectSchema as UserCreateWithoutApprovedQuotesInputObjectSchema } from './UserCreateWithoutApprovedQuotesInput.schema';
import { UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema as UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutApprovedQuotesInput.schema';
import { UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema as UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema } from './UserCreateOrConnectWithoutApprovedQuotesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutApprovedQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutApprovedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutApprovedQuotesInput>;
export const UserCreateNestedOneWithoutApprovedQuotesInputObjectZodSchema = makeSchema();
