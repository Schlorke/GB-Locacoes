/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteScalarWhereInputObjectSchema as QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema';
import { QuoteUpdateManyMutationInputObjectSchema as QuoteUpdateManyMutationInputObjectSchema } from './QuoteUpdateManyMutationInput.schema';
import { QuoteUncheckedUpdateManyWithoutApprovedByUserInputObjectSchema as QuoteUncheckedUpdateManyWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutApprovedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateManyWithoutApprovedByUserInputObjectSchema)])
}).strict();
export const QuoteUpdateManyWithWhereWithoutApprovedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutApprovedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutApprovedByUserInput>;
export const QuoteUpdateManyWithWhereWithoutApprovedByUserInputObjectZodSchema = makeSchema();
