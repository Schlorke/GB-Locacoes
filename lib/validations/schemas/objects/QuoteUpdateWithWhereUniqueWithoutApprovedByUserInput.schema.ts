import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithoutApprovedByUserInputObjectSchema as QuoteUpdateWithoutApprovedByUserInputObjectSchema } from './QuoteUpdateWithoutApprovedByUserInput.schema';
import { QuoteUncheckedUpdateWithoutApprovedByUserInputObjectSchema as QuoteUncheckedUpdateWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutApprovedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutApprovedByUserInputObjectSchema)])
}).strict();
export const QuoteUpdateWithWhereUniqueWithoutApprovedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutApprovedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutApprovedByUserInput>;
export const QuoteUpdateWithWhereUniqueWithoutApprovedByUserInputObjectZodSchema = makeSchema();
