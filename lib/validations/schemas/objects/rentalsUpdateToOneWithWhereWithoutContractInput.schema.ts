/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema';
import { rentalsUpdateWithoutContractInputObjectSchema as rentalsUpdateWithoutContractInputObjectSchema } from './rentalsUpdateWithoutContractInput.schema';
import { rentalsUncheckedUpdateWithoutContractInputObjectSchema as rentalsUncheckedUpdateWithoutContractInputObjectSchema } from './rentalsUncheckedUpdateWithoutContractInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => rentalsUpdateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutContractInputObjectSchema)])
}).strict();
export const rentalsUpdateToOneWithWhereWithoutContractInputObjectSchema: z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutContractInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateToOneWithWhereWithoutContractInput>;
export const rentalsUpdateToOneWithWhereWithoutContractInputObjectZodSchema = makeSchema();
