import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema';
import { QuoteUpdateWithoutRentalsInputObjectSchema as QuoteUpdateWithoutRentalsInputObjectSchema } from './QuoteUpdateWithoutRentalsInput.schema';
import { QuoteUncheckedUpdateWithoutRentalsInputObjectSchema as QuoteUncheckedUpdateWithoutRentalsInputObjectSchema } from './QuoteUncheckedUpdateWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => QuoteUpdateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutRentalsInputObjectSchema)])
}).strict();
export const QuoteUpdateToOneWithWhereWithoutRentalsInputObjectSchema: z.ZodType<Prisma.QuoteUpdateToOneWithWhereWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateToOneWithWhereWithoutRentalsInput>;
export const QuoteUpdateToOneWithWhereWithoutRentalsInputObjectZodSchema = makeSchema();
