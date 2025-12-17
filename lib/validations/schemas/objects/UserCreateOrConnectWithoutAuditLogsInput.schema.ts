import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAuditLogsInputObjectSchema as UserCreateWithoutAuditLogsInputObjectSchema } from './UserCreateWithoutAuditLogsInput.schema';
import { UserUncheckedCreateWithoutAuditLogsInputObjectSchema as UserUncheckedCreateWithoutAuditLogsInputObjectSchema } from './UserUncheckedCreateWithoutAuditLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAuditLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAuditLogsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuditLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAuditLogsInput>;
export const UserCreateOrConnectWithoutAuditLogsInputObjectZodSchema = makeSchema();
