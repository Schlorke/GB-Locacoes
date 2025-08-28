import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema';
import { QuoteItemUpdateManyMutationInputObjectSchema } from './QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutQuoteInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateManyWithoutQuoteInputObjectSchema)])
}).strict();
export const QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutQuoteInput>;
export const QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectZodSchema = makeSchema();
