/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemCreateWithoutQuoteInputObjectSchema as QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema';
import { QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema as QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema } from './QuoteItemCreateOrConnectWithoutQuoteInput.schema';
import { QuoteItemCreateManyQuoteInputEnvelopeObjectSchema as QuoteItemCreateManyQuoteInputEnvelopeObjectSchema } from './QuoteItemCreateManyQuoteInputEnvelope.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateNestedManyWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateNestedManyWithoutQuoteInput>;
export const QuoteItemCreateNestedManyWithoutQuoteInputObjectZodSchema = makeSchema();
