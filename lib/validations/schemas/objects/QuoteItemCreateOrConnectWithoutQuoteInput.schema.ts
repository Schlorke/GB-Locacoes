import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemCreateWithoutQuoteInputObjectSchema as QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateOrConnectWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateOrConnectWithoutQuoteInput>;
export const QuoteItemCreateOrConnectWithoutQuoteInputObjectZodSchema = makeSchema();
