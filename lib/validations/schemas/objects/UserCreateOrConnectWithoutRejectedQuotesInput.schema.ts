import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRejectedQuotesInputObjectSchema as UserCreateWithoutRejectedQuotesInputObjectSchema } from './UserCreateWithoutRejectedQuotesInput.schema';
import { UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema as UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedCreateWithoutRejectedQuotesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRejectedQuotesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutRejectedQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRejectedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutRejectedQuotesInput>;
export const UserCreateOrConnectWithoutRejectedQuotesInputObjectZodSchema = makeSchema();
