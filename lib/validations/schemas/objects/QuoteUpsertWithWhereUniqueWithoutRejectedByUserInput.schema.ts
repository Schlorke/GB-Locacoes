/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithoutRejectedByUserInputObjectSchema as QuoteUpdateWithoutRejectedByUserInputObjectSchema } from './QuoteUpdateWithoutRejectedByUserInput.schema';
import { QuoteUncheckedUpdateWithoutRejectedByUserInputObjectSchema as QuoteUncheckedUpdateWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutRejectedByUserInput.schema';
import { QuoteCreateWithoutRejectedByUserInputObjectSchema as QuoteCreateWithoutRejectedByUserInputObjectSchema } from './QuoteCreateWithoutRejectedByUserInput.schema';
import { QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema as QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutRejectedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => QuoteUpdateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutRejectedByUserInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteCreateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema)])
}).strict();
export const QuoteUpsertWithWhereUniqueWithoutRejectedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutRejectedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutRejectedByUserInput>;
export const QuoteUpsertWithWhereUniqueWithoutRejectedByUserInputObjectZodSchema = makeSchema();
