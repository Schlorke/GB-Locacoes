/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithoutRejectedByUserInputObjectSchema as QuoteUpdateWithoutRejectedByUserInputObjectSchema } from './QuoteUpdateWithoutRejectedByUserInput.schema';
import { QuoteUncheckedUpdateWithoutRejectedByUserInputObjectSchema as QuoteUncheckedUpdateWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutRejectedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutRejectedByUserInputObjectSchema)])
}).strict();
export const QuoteUpdateWithWhereUniqueWithoutRejectedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutRejectedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutRejectedByUserInput>;
export const QuoteUpdateWithWhereUniqueWithoutRejectedByUserInputObjectZodSchema = makeSchema();
