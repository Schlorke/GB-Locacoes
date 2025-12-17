/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsScalarWhereInputObjectSchema as rentalsScalarWhereInputObjectSchema } from './rentalsScalarWhereInput.schema';
import { rentalsUpdateManyMutationInputObjectSchema as rentalsUpdateManyMutationInputObjectSchema } from './rentalsUpdateManyMutationInput.schema';
import { rentalsUncheckedUpdateManyWithoutQuoteInputObjectSchema as rentalsUncheckedUpdateManyWithoutQuoteInputObjectSchema } from './rentalsUncheckedUpdateManyWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateManyMutationInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateManyWithoutQuoteInputObjectSchema)])
}).strict();
export const rentalsUpdateManyWithWhereWithoutQuoteInputObjectSchema: z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateManyWithWhereWithoutQuoteInput>;
export const rentalsUpdateManyWithWhereWithoutQuoteInputObjectZodSchema = makeSchema();
