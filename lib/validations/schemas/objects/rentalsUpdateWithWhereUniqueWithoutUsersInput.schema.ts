import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithoutUsersInputObjectSchema } from './rentalsUpdateWithoutUsersInput.schema';
import { rentalsUncheckedUpdateWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateWithoutUsersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateWithoutUsersInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutUsersInputObjectSchema)])
}).strict();
export const rentalsUpdateWithWhereUniqueWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUpdateWithWhereUniqueWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateWithWhereUniqueWithoutUsersInput>;
export const rentalsUpdateWithWhereUniqueWithoutUsersInputObjectZodSchema = makeSchema();
