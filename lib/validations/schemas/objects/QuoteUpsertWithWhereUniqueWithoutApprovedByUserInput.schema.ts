/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithoutApprovedByUserInputObjectSchema as QuoteUpdateWithoutApprovedByUserInputObjectSchema } from './QuoteUpdateWithoutApprovedByUserInput.schema';
import { QuoteUncheckedUpdateWithoutApprovedByUserInputObjectSchema as QuoteUncheckedUpdateWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutApprovedByUserInput.schema';
import { QuoteCreateWithoutApprovedByUserInputObjectSchema as QuoteCreateWithoutApprovedByUserInputObjectSchema } from './QuoteCreateWithoutApprovedByUserInput.schema';
import { QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema as QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutApprovedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => QuoteUpdateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutApprovedByUserInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteCreateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema)])
}).strict();
export const QuoteUpsertWithWhereUniqueWithoutApprovedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutApprovedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutApprovedByUserInput>;
export const QuoteUpsertWithWhereUniqueWithoutApprovedByUserInputObjectZodSchema = makeSchema();
