/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsUpdateWithoutContractInputObjectSchema as rentalsUpdateWithoutContractInputObjectSchema } from './rentalsUpdateWithoutContractInput.schema';
import { rentalsUncheckedUpdateWithoutContractInputObjectSchema as rentalsUncheckedUpdateWithoutContractInputObjectSchema } from './rentalsUncheckedUpdateWithoutContractInput.schema';
import { rentalsCreateWithoutContractInputObjectSchema as rentalsCreateWithoutContractInputObjectSchema } from './rentalsCreateWithoutContractInput.schema';
import { rentalsUncheckedCreateWithoutContractInputObjectSchema as rentalsUncheckedCreateWithoutContractInputObjectSchema } from './rentalsUncheckedCreateWithoutContractInput.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => rentalsUpdateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutContractInputObjectSchema)]),
  create: z.union([z.lazy(() => rentalsCreateWithoutContractInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutContractInputObjectSchema)]),
  where: z.lazy(() => rentalsWhereInputObjectSchema).optional()
}).strict();
export const rentalsUpsertWithoutContractInputObjectSchema: z.ZodType<Prisma.rentalsUpsertWithoutContractInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpsertWithoutContractInput>;
export const rentalsUpsertWithoutContractInputObjectZodSchema = makeSchema();
