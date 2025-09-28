/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithoutUsersInputObjectSchema as rentalsUpdateWithoutUsersInputObjectSchema } from './rentalsUpdateWithoutUsersInput.schema';
import { rentalsUncheckedUpdateWithoutUsersInputObjectSchema as rentalsUncheckedUpdateWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateWithoutUsersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema)])
}).strict();
export const rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUpdateWithWhereUniqueWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateWithWhereUniqueWithoutUsersInput>;
export const rentalsUpdateWithWhereUniqueWithoutUsersInputObjectZodSchema = makeSchema();
