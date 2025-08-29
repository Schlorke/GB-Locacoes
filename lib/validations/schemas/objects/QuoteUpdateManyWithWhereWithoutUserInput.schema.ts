import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema';
import { QuoteUpdateManyMutationInputObjectSchema } from './QuoteUpdateManyMutationInput.schema';
import { QuoteUncheckedUpdateManyWithoutUserInputObjectSchema } from './QuoteUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => QuoteScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const QuoteUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutUserInput>;
export const QuoteUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
