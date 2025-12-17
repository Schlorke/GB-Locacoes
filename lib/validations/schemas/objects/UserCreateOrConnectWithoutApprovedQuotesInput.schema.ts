/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutApprovedQuotesInputObjectSchema as UserCreateWithoutApprovedQuotesInputObjectSchema } from './UserCreateWithoutApprovedQuotesInput.schema';
import { UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema as UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutApprovedQuotesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutApprovedQuotesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutApprovedQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutApprovedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutApprovedQuotesInput>;
export const UserCreateOrConnectWithoutApprovedQuotesInputObjectZodSchema = makeSchema();
