import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsScalarWhereInputObjectSchema } from './rentalsScalarWhereInput.schema';
import { rentalsUpdateManyMutationInputObjectSchema } from './rentalsUpdateManyMutationInput.schema';
import { rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateManyWithoutUsersInput.schema'

export const rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutUsersInput, Prisma.rentalsUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => rentalsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateManyMutationInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema)])
}).strict();
export const rentalsUpdateManyWithWhereWithoutUsersInputObjectZodSchema = z.object({
  where: z.lazy(() => rentalsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateManyMutationInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema)])
}).strict();
