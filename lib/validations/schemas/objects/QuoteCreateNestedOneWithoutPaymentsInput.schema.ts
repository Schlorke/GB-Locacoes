/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutPaymentsInputObjectSchema as QuoteCreateWithoutPaymentsInputObjectSchema } from './QuoteCreateWithoutPaymentsInput.schema';
import { QuoteUncheckedCreateWithoutPaymentsInputObjectSchema as QuoteUncheckedCreateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedCreateWithoutPaymentsInput.schema';
import { QuoteCreateOrConnectWithoutPaymentsInputObjectSchema as QuoteCreateOrConnectWithoutPaymentsInputObjectSchema } from './QuoteCreateOrConnectWithoutPaymentsInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutPaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPaymentsInputObjectSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional()
}).strict();
export const QuoteCreateNestedOneWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateNestedOneWithoutPaymentsInput>;
export const QuoteCreateNestedOneWithoutPaymentsInputObjectZodSchema = makeSchema();
