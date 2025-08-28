import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema';
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema';
import { UserCreateWithoutQuotesInputObjectSchema } from './UserCreateWithoutQuotesInput.schema';
import { UserUncheckedCreateWithoutQuotesInputObjectSchema } from './UserUncheckedCreateWithoutQuotesInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutQuotesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutQuotesInput>;
export const UserUpsertWithoutQuotesInputObjectZodSchema = makeSchema();
