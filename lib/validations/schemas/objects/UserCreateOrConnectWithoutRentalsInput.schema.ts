import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRentalsInputObjectSchema as UserCreateWithoutRentalsInputObjectSchema } from './UserCreateWithoutRentalsInput.schema';
import { UserUncheckedCreateWithoutRentalsInputObjectSchema as UserUncheckedCreateWithoutRentalsInputObjectSchema } from './UserUncheckedCreateWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutRentalsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutRentalsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutRentalsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutRentalsInput>;
export const UserCreateOrConnectWithoutRentalsInputObjectZodSchema = makeSchema();
