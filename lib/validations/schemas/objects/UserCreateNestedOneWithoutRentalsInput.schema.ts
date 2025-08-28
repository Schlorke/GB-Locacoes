import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema';
import { UserCreateOrConnectWithoutRentalsInputObjectSchema } from './UserCreateOrConnectWithoutRentalsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRentalsInput>;
export const UserCreateNestedOneWithoutRentalsInputObjectZodSchema = makeSchema();
