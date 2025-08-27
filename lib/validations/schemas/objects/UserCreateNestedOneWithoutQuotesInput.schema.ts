import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema';
import { UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema';
import { UserCreateOrConnectWithoutQuotesInputObjectSchema } from './UserCreateOrConnectWithoutQuotesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuotesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutQuotesInput>;
export const UserCreateNestedOneWithoutQuotesInputObjectZodSchema = makeSchema();
