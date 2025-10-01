/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutQuotesInputObjectSchema as UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema';
import { UserUncheckedCreateWithoutQuotesInputObjectSchema as UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema';
import { UserCreateOrConnectWithoutQuotesInputObjectSchema as UserCreateOrConnectWithoutQuotesInputObjectSchema } from './UserCreateOrConnectWithoutQuotesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuotesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutQuotesInput>;
export const UserCreateNestedOneWithoutQuotesInputObjectZodSchema = makeSchema();
