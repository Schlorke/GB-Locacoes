import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutRejectedByUserInputObjectSchema as QuoteCreateWithoutRejectedByUserInputObjectSchema } from './QuoteCreateWithoutRejectedByUserInput.schema';
import { QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema as QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutRejectedByUserInput.schema';
import { QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema as QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema } from './QuoteCreateOrConnectWithoutRejectedByUserInput.schema';
import { QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema as QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema } from './QuoteCreateManyRejectedByUserInputEnvelope.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutRejectedByUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteCreateNestedManyWithoutRejectedByUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutRejectedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateNestedManyWithoutRejectedByUserInput>;
export const QuoteCreateNestedManyWithoutRejectedByUserInputObjectZodSchema = makeSchema();
