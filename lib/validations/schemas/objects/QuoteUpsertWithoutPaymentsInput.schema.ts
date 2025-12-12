/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteUpdateWithoutPaymentsInputObjectSchema as QuoteUpdateWithoutPaymentsInputObjectSchema } from './QuoteUpdateWithoutPaymentsInput.schema';
import { QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema as QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedUpdateWithoutPaymentsInput.schema';
import { QuoteCreateWithoutPaymentsInputObjectSchema as QuoteCreateWithoutPaymentsInputObjectSchema } from './QuoteCreateWithoutPaymentsInput.schema';
import { QuoteUncheckedCreateWithoutPaymentsInputObjectSchema as QuoteUncheckedCreateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedCreateWithoutPaymentsInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => QuoteUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteCreateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutPaymentsInputObjectSchema)]),
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const QuoteUpsertWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithoutPaymentsInput>;
export const QuoteUpsertWithoutPaymentsInputObjectZodSchema = makeSchema();
