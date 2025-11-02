import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsScalarWhereInputObjectSchema as rentalsScalarWhereInputObjectSchema } from './rentalsScalarWhereInput.schema';
import { rentalsUpdateManyMutationInputObjectSchema as rentalsUpdateManyMutationInputObjectSchema } from './rentalsUpdateManyMutationInput.schema';
import { rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema as rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema } from './rentalsUncheckedUpdateManyWithoutUsersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateManyMutationInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateManyWithoutUsersInputObjectSchema)])
}).strict();
export const rentalsUpdateManyWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutUsersInput>;
export const rentalsUpdateManyWithWhereWithoutUsersInputObjectZodSchema = makeSchema();
