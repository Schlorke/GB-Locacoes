import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteUpdateWithoutRentalsInputObjectSchema as QuoteUpdateWithoutRentalsInputObjectSchema } from './QuoteUpdateWithoutRentalsInput.schema';
import { QuoteUncheckedUpdateWithoutRentalsInputObjectSchema as QuoteUncheckedUpdateWithoutRentalsInputObjectSchema } from './QuoteUncheckedUpdateWithoutRentalsInput.schema';
import { QuoteCreateWithoutRentalsInputObjectSchema as QuoteCreateWithoutRentalsInputObjectSchema } from './QuoteCreateWithoutRentalsInput.schema';
import { QuoteUncheckedCreateWithoutRentalsInputObjectSchema as QuoteUncheckedCreateWithoutRentalsInputObjectSchema } from './QuoteUncheckedCreateWithoutRentalsInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => QuoteUpdateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutRentalsInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteCreateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRentalsInputObjectSchema)]),
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const QuoteUpsertWithoutRentalsInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithoutRentalsInput>;
export const QuoteUpsertWithoutRentalsInputObjectZodSchema = makeSchema();
