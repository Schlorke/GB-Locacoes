import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutApprovedByUserInputObjectSchema as QuoteCreateWithoutApprovedByUserInputObjectSchema } from './QuoteCreateWithoutApprovedByUserInput.schema';
import { QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema as QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutApprovedByUserInput.schema';
import { QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema as QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema } from './QuoteCreateOrConnectWithoutApprovedByUserInput.schema';
import { QuoteUpsertWithWhereUniqueWithoutApprovedByUserInputObjectSchema as QuoteUpsertWithWhereUniqueWithoutApprovedByUserInputObjectSchema } from './QuoteUpsertWithWhereUniqueWithoutApprovedByUserInput.schema';
import { QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema as QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema } from './QuoteCreateManyApprovedByUserInputEnvelope.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithWhereUniqueWithoutApprovedByUserInputObjectSchema as QuoteUpdateWithWhereUniqueWithoutApprovedByUserInputObjectSchema } from './QuoteUpdateWithWhereUniqueWithoutApprovedByUserInput.schema';
import { QuoteUpdateManyWithWhereWithoutApprovedByUserInputObjectSchema as QuoteUpdateManyWithWhereWithoutApprovedByUserInputObjectSchema } from './QuoteUpdateManyWithWhereWithoutApprovedByUserInput.schema';
import { QuoteScalarWhereInputObjectSchema as QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutApprovedByUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => QuoteUpsertWithWhereUniqueWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUpsertWithWhereUniqueWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyApprovedByUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => QuoteUpdateWithWhereUniqueWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUpdateWithWhereUniqueWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => QuoteUpdateManyWithWhereWithoutApprovedByUserInputObjectSchema), z.lazy(() => QuoteUpdateManyWithWhereWithoutApprovedByUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const QuoteUpdateManyWithoutApprovedByUserNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutApprovedByUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithoutApprovedByUserNestedInput>;
export const QuoteUpdateManyWithoutApprovedByUserNestedInputObjectZodSchema = makeSchema();
