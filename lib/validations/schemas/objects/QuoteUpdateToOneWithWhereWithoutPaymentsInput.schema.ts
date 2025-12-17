/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema';
import { QuoteUpdateWithoutPaymentsInputObjectSchema as QuoteUpdateWithoutPaymentsInputObjectSchema } from './QuoteUpdateWithoutPaymentsInput.schema';
import { QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema as QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedUpdateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => QuoteUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema)])
}).strict();
export const QuoteUpdateToOneWithWhereWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.QuoteUpdateToOneWithWhereWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateToOneWithWhereWithoutPaymentsInput>;
export const QuoteUpdateToOneWithWhereWithoutPaymentsInputObjectZodSchema = makeSchema();
