import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemScalarWhereInputObjectSchema as QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema';
import { QuoteItemUpdateManyMutationInputObjectSchema as QuoteItemUpdateManyMutationInputObjectSchema } from './QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema as QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutQuoteInput>;
export const QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectZodSchema = makeSchema();
