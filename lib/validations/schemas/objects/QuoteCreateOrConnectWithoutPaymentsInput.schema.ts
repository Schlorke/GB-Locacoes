/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteCreateWithoutPaymentsInputObjectSchema as QuoteCreateWithoutPaymentsInputObjectSchema } from './QuoteCreateWithoutPaymentsInput.schema';
import { QuoteUncheckedCreateWithoutPaymentsInputObjectSchema as QuoteUncheckedCreateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedCreateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteCreateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutPaymentsInputObjectSchema)])
}).strict();
export const QuoteCreateOrConnectWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutPaymentsInput>;
export const QuoteCreateOrConnectWithoutPaymentsInputObjectZodSchema = makeSchema();
