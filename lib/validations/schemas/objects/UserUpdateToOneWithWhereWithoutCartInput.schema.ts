/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCartInputObjectSchema as UserUpdateWithoutCartInputObjectSchema } from './UserUpdateWithoutCartInput.schema';
import { UserUncheckedUpdateWithoutCartInputObjectSchema as UserUncheckedUpdateWithoutCartInputObjectSchema } from './UserUncheckedUpdateWithoutCartInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCartInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCartInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCartInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCartInput>;
export const UserUpdateToOneWithWhereWithoutCartInputObjectZodSchema = makeSchema();
