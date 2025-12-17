import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema';
import { rentalsUpdateWithoutDeliveriesInputObjectSchema as rentalsUpdateWithoutDeliveriesInputObjectSchema } from './rentalsUpdateWithoutDeliveriesInput.schema';
import { rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema as rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema } from './rentalsUncheckedUpdateWithoutDeliveriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => rentalsUpdateWithoutDeliveriesInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutDeliveriesInputObjectSchema)])
}).strict();
export const rentalsUpdateToOneWithWhereWithoutDeliveriesInputObjectSchema: z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutDeliveriesInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutDeliveriesInput>;
export const rentalsUpdateToOneWithWhereWithoutDeliveriesInputObjectZodSchema = makeSchema();
