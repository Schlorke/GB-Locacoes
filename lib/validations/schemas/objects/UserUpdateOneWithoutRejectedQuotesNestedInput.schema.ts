import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRejectedQuotesInputObjectSchema as UserCreateWithoutRejectedQuotesInputObjectSchema } from './UserCreateWithoutRejectedQuotesInput.schema';
import { UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema as UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutRejectedQuotesInput.schema';
import { UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema as UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema } from './UserCreateOrConnectWithoutRejectedQuotesInput.schema';
import { UserUpsertWithoutRejectedQuotesInputObjectSchema as UserUpsertWithoutRejectedQuotesInputObjectSchema } from './UserUpsertWithoutRejectedQuotesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutRejectedQuotesInputObjectSchema as UserUpdateToOneWithWhereWithoutRejectedQuotesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutRejectedQuotesInput.schema';
import { UserUpdateWithoutRejectedQuotesInputObjectSchema as UserUpdateWithoutRejectedQuotesInputObjectSchema } from './UserUpdateWithoutRejectedQuotesInput.schema';
import { UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema as UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutRejectedQuotesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRejectedQuotesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUpdateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutRejectedQuotesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutRejectedQuotesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutRejectedQuotesNestedInput>;
export const UserUpdateOneWithoutRejectedQuotesNestedInputObjectZodSchema = makeSchema();
