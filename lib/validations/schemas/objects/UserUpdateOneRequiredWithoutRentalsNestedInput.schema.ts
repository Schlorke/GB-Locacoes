import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema';
import { UserCreateOrConnectWithoutRentalsInputObjectSchema } from './UserCreateOrConnectWithoutRentalsInput.schema';
import { UserUpsertWithoutRentalsInputObjectSchema } from './UserUpsertWithoutRentalsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutRentalsInput.schema';
import { UserUpdateWithoutRentalsInputObjectSchema } from './UserUpdateWithoutRentalsInput.schema';
import { UserUncheckedUpdateWithoutRentalsInputObjectSchema } from './UserUncheckedUpdateWithoutRentalsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRentalsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutRentalsInputObjectSchema), z.lazy(() => UserUpdateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRentalsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRentalsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutRentalsNestedInput>;
export const UserUpdateOneRequiredWithoutRentalsNestedInputObjectZodSchema = makeSchema();
