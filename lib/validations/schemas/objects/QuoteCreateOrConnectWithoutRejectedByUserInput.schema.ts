import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteCreateWithoutRejectedByUserInputObjectSchema as QuoteCreateWithoutRejectedByUserInputObjectSchema } from './QuoteCreateWithoutRejectedByUserInput.schema';
import { QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema as QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutRejectedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteCreateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema)])
}).strict();
export const QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutRejectedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutRejectedByUserInput>;
export const QuoteCreateOrConnectWithoutRejectedByUserInputObjectZodSchema = makeSchema();
