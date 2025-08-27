import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema';
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema';
import { UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRentalsInput>;
export const UserUpsertWithoutRentalsInputObjectZodSchema = makeSchema();
