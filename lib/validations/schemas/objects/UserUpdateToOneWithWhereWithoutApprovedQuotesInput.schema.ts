import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutApprovedQuotesInputObjectSchema as UserUpdateWithoutApprovedQuotesInputObjectSchema } from './UserUpdateWithoutApprovedQuotesInput.schema';
import { UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema as UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema } from './UserUncheckedUpdateWithoutApprovedQuotesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutApprovedQuotesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutApprovedQuotesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutApprovedQuotesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutApprovedQuotesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutApprovedQuotesInput>;
export const UserUpdateToOneWithWhereWithoutApprovedQuotesInputObjectZodSchema = makeSchema();
