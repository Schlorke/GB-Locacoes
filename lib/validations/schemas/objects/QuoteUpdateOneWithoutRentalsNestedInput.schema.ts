/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutRentalsInputObjectSchema as QuoteCreateWithoutRentalsInputObjectSchema } from './QuoteCreateWithoutRentalsInput.schema';
import { QuoteUncheckedCreateWithoutRentalsInputObjectSchema as QuoteUncheckedCreateWithoutRentalsInputObjectSchema } from './QuoteUncheckedCreateWithoutRentalsInput.schema';
import { QuoteCreateOrConnectWithoutRentalsInputObjectSchema as QuoteCreateOrConnectWithoutRentalsInputObjectSchema } from './QuoteCreateOrConnectWithoutRentalsInput.schema';
import { QuoteUpsertWithoutRentalsInputObjectSchema as QuoteUpsertWithoutRentalsInputObjectSchema } from './QuoteUpsertWithoutRentalsInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateToOneWithWhereWithoutRentalsInputObjectSchema as QuoteUpdateToOneWithWhereWithoutRentalsInputObjectSchema } from './QuoteUpdateToOneWithWhereWithoutRentalsInput.schema';
import { QuoteUpdateWithoutRentalsInputObjectSchema as QuoteUpdateWithoutRentalsInputObjectSchema } from './QuoteUpdateWithoutRentalsInput.schema';
import { QuoteUncheckedUpdateWithoutRentalsInputObjectSchema as QuoteUncheckedUpdateWithoutRentalsInputObjectSchema } from './QuoteUncheckedUpdateWithoutRentalsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRentalsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutRentalsInputObjectSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutRentalsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => QuoteWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => QuoteWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => QuoteUpdateToOneWithWhereWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUpdateWithoutRentalsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutRentalsInputObjectSchema)]).optional()
}).strict();
export const QuoteUpdateOneWithoutRentalsNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateOneWithoutRentalsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateOneWithoutRentalsNestedInput>;
export const QuoteUpdateOneWithoutRentalsNestedInputObjectZodSchema = makeSchema();
