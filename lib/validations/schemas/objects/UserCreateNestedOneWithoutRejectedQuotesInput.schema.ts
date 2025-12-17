import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRejectedQuotesInputObjectSchema as UserCreateWithoutRejectedQuotesInputObjectSchema } from './UserCreateWithoutRejectedQuotesInput.schema';
import { UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema as UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutRejectedQuotesInput.schema';
import { UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema as UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema } from './UserCreateOrConnectWithoutRejectedQuotesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutRejectedQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRejectedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRejectedQuotesInput>;
export const UserCreateNestedOneWithoutRejectedQuotesInputObjectZodSchema = makeSchema();
