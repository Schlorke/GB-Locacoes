/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteCreateWithoutRentalsInputObjectSchema as QuoteCreateWithoutRentalsInputObjectSchema } from './QuoteCreateWithoutRentalsInput.schema';
import { QuoteUncheckedCreateWithoutRentalsInputObjectSchema as QuoteUncheckedCreateWithoutRentalsInputObjectSchema } from './QuoteUncheckedCreateWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteCreateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRentalsInputObjectSchema)])
}).strict();
export const QuoteCreateOrConnectWithoutRentalsInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutRentalsInput>;
export const QuoteCreateOrConnectWithoutRentalsInputObjectZodSchema = makeSchema();
