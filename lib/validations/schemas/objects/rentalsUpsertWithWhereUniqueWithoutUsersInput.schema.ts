/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithoutUsersInputObjectSchema as rentalsUpdateWithoutUsersInputObjectSchema } from './rentalsUpdateWithoutUsersInput.schema';
import { rentalsUncheckedUpdateWithoutUsersInputObjectSchema as rentalsUncheckedUpdateWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateWithoutUsersInput.schema';
import { rentalsCreateWithoutUsersInputObjectSchema as rentalsCreateWithoutUsersInputObjectSchema } from './rentalsCreateWithoutUsersInput.schema';
import { rentalsUncheckedCreateWithoutUsersInputObjectSchema as rentalsUncheckedCreateWithoutUsersInputObjectSchema } from './rentalsUncheckedCreateWithoutUsersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema)]),
  create: z.union([z.lazy(() => rentalsCreateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutUsersInputObjectSchema)])
}).strict();
export const rentalsUpsertWithWhereUniqueWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUpsertWithWhereUniqueWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpsertWithWhereUniqueWithoutUsersInput>;
export const rentalsUpsertWithWhereUniqueWithoutUsersInputObjectZodSchema = makeSchema();
