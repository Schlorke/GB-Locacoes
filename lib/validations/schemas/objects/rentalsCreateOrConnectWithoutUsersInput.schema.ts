/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutUsersInputObjectSchema as rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema';
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema as rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutUsersInput>;
export const rentalsCreateOrConnectWithoutUsersInputObjectZodSchema = makeSchema();
