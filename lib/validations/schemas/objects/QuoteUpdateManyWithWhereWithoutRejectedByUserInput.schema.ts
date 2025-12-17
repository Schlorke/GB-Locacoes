import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteScalarWhereInputObjectSchema as QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema';
import { QuoteUpdateManyMutationInputObjectSchema as QuoteUpdateManyMutationInputObjectSchema } from './QuoteUpdateManyMutationInput.schema';
import { QuoteUncheckedUpdateManyWithoutRejectedByUserInputObjectSchema as QuoteUncheckedUpdateManyWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutRejectedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateManyWithoutRejectedByUserInputObjectSchema)])
}).strict();
export const QuoteUpdateManyWithWhereWithoutRejectedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutRejectedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutRejectedByUserInput>;
export const QuoteUpdateManyWithWhereWithoutRejectedByUserInputObjectZodSchema = makeSchema();
