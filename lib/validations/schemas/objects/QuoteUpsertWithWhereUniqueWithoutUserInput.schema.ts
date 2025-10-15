/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithoutUserInputObjectSchema as QuoteUpdateWithoutUserInputObjectSchema } from './QuoteUpdateWithoutUserInput.schema';
import { QuoteUncheckedUpdateWithoutUserInputObjectSchema as QuoteUncheckedUpdateWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateWithoutUserInput.schema';
import { QuoteCreateWithoutUserInputObjectSchema as QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema';
import { QuoteUncheckedCreateWithoutUserInputObjectSchema as QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => QuoteUpdateWithoutUserInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput>;
export const QuoteUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
