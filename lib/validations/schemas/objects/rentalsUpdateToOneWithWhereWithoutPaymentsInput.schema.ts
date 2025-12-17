import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema';
import { rentalsUpdateWithoutPaymentsInputObjectSchema as rentalsUpdateWithoutPaymentsInputObjectSchema } from './rentalsUpdateWithoutPaymentsInput.schema';
import { rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema as rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema } from './rentalsUncheckedUpdateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => rentalsUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutPaymentsInputObjectSchema)])
}).strict();
export const rentalsUpdateToOneWithWhereWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutPaymentsInput>;
export const rentalsUpdateToOneWithWhereWithoutPaymentsInputObjectZodSchema = makeSchema();
