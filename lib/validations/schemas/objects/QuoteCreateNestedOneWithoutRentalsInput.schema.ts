import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutRentalsInputObjectSchema as QuoteCreateWithoutRentalsInputObjectSchema } from './QuoteCreateWithoutRentalsInput.schema';
import { QuoteUncheckedCreateWithoutRentalsInputObjectSchema as QuoteUncheckedCreateWithoutRentalsInputObjectSchema } from './QuoteUncheckedCreateWithoutRentalsInput.schema';
import { QuoteCreateOrConnectWithoutRentalsInputObjectSchema as QuoteCreateOrConnectWithoutRentalsInputObjectSchema } from './QuoteCreateOrConnectWithoutRentalsInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional()
}).strict();
export const QuoteCreateNestedOneWithoutRentalsInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateNestedOneWithoutRentalsInput>;
export const QuoteCreateNestedOneWithoutRentalsInputObjectZodSchema = makeSchema();
