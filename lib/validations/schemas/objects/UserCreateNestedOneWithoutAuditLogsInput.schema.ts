/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAuditLogsInputObjectSchema as UserCreateWithoutAuditLogsInputObjectSchema } from './UserCreateWithoutAuditLogsInput.schema';
import { UserUncheckedCreateWithoutAuditLogsInputObjectSchema as UserUncheckedCreateWithoutAuditLogsInputObjectSchema } from './UserUncheckedCreateWithoutAuditLogsInput.schema';
import { UserCreateOrConnectWithoutAuditLogsInputObjectSchema as UserCreateOrConnectWithoutAuditLogsInputObjectSchema } from './UserCreateOrConnectWithoutAuditLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAuditLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAuditLogsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuditLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAuditLogsInput>;
export const UserCreateNestedOneWithoutAuditLogsInputObjectZodSchema = makeSchema();
