/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutApprovedByUserInputObjectSchema as QuoteCreateWithoutApprovedByUserInputObjectSchema } from './QuoteCreateWithoutApprovedByUserInput.schema';
import { QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema as QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutApprovedByUserInput.schema';
import { QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema as QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema } from './QuoteCreateOrConnectWithoutApprovedByUserInput.schema';
import { QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema as QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema } from './QuoteCreateManyApprovedByUserInputEnvelope.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutApprovedByUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteCreateNestedManyWithoutApprovedByUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutApprovedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateNestedManyWithoutApprovedByUserInput>;
export const QuoteCreateNestedManyWithoutApprovedByUserInputObjectZodSchema = makeSchema();
