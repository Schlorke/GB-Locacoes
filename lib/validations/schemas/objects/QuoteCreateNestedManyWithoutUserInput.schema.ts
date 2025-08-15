import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema';
import { QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema';
import { QuoteCreateOrConnectWithoutUserInputObjectSchema } from './QuoteCreateOrConnectWithoutUserInput.schema';
import { QuoteCreateManyUserInputEnvelopeObjectSchema } from './QuoteCreateManyUserInputEnvelope.schema';
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

export const QuoteCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutUserInput, Prisma.QuoteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteCreateNestedManyWithoutUserInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
