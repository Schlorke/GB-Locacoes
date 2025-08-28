import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema';
import { QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema } from './QuoteItemCreateOrConnectWithoutQuoteInput.schema';
import { QuoteItemCreateManyQuoteInputEnvelopeObjectSchema } from './QuoteItemCreateManyQuoteInputEnvelope.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateNestedManyWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateNestedManyWithoutQuoteInput>;
export const QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectZodSchema = makeSchema();
