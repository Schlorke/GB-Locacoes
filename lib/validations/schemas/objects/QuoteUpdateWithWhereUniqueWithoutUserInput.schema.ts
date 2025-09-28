/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithoutUserInputObjectSchema as QuoteUpdateWithoutUserInputObjectSchema } from './QuoteUpdateWithoutUserInput.schema';
import { QuoteUncheckedUpdateWithoutUserInputObjectSchema as QuoteUncheckedUpdateWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateWithoutUserInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutUserInput>;
export const QuoteUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
