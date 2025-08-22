import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutQuotesInputObjectSchema } from './UserUpdateWithoutQuotesInput.schema';
import { UserUncheckedUpdateWithoutQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutQuotesInput.schema'

export const UserUpdateToOneWithWhereWithoutQuotesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutQuotesInput, Prisma.UserUpdateToOneWithWhereWithoutQuotesInput> = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutQuotesInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutQuotesInputObjectSchema)])
}).strict();
