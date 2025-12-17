import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteCreateWithoutApprovedByUserInputObjectSchema as QuoteCreateWithoutApprovedByUserInputObjectSchema } from './QuoteCreateWithoutApprovedByUserInput.schema';
import { QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema as QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutApprovedByUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteCreateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema)])
}).strict();
export const QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutApprovedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutApprovedByUserInput>;
export const QuoteCreateOrConnectWithoutApprovedByUserInputObjectZodSchema = makeSchema();
