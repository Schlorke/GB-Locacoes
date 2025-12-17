import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutRejectedQuotesInputObjectSchema as UserUpdateWithoutRejectedQuotesInputObjectSchema } from './UserUpdateWithoutRejectedQuotesInput.schema';
import { UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema as UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutRejectedQuotesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutRejectedQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRejectedQuotesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutRejectedQuotesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRejectedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRejectedQuotesInput>;
export const UserUpdateToOneWithWhereWithoutRejectedQuotesInputObjectZodSchema = makeSchema();
