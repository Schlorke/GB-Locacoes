import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema';
import { QuoteUpdateManyMutationInputObjectSchema } from './QuoteUpdateManyMutationInput.schema';
import { QuoteUncheckedUpdateManyWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutUserInput.schema'

export const QuoteUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutUserInput, Prisma.QuoteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => QuoteScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const QuoteUpdateManyWithWhereWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => QuoteScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
