import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutRejectedByUserInputObjectSchema as QuoteCreateWithoutRejectedByUserInputObjectSchema } from './QuoteCreateWithoutRejectedByUserInput.schema';
import { QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema as QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema } from './QuoteUncheckedCreateWithoutRejectedByUserInput.schema';
import { QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema as QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema } from './QuoteCreateOrConnectWithoutRejectedByUserInput.schema';
import { QuoteUpsertWithWhereUniqueWithoutRejectedByUserInputObjectSchema as QuoteUpsertWithWhereUniqueWithoutRejectedByUserInputObjectSchema } from './QuoteUpsertWithWhereUniqueWithoutRejectedByUserInput.schema';
import { QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema as QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema } from './QuoteCreateManyRejectedByUserInputEnvelope.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithWhereUniqueWithoutRejectedByUserInputObjectSchema as QuoteUpdateWithWhereUniqueWithoutRejectedByUserInputObjectSchema } from './QuoteUpdateWithWhereUniqueWithoutRejectedByUserInput.schema';
import { QuoteUpdateManyWithWhereWithoutRejectedByUserInputObjectSchema as QuoteUpdateManyWithWhereWithoutRejectedByUserInputObjectSchema } from './QuoteUpdateManyWithWhereWithoutRejectedByUserInput.schema';
import { QuoteScalarWhereInputObjectSchema as QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutRejectedByUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => QuoteUpsertWithWhereUniqueWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUpsertWithWhereUniqueWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyRejectedByUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => QuoteUpdateWithWhereUniqueWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUpdateWithWhereUniqueWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => QuoteUpdateManyWithWhereWithoutRejectedByUserInputObjectSchema), z.lazy(() => QuoteUpdateManyWithWhereWithoutRejectedByUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInput>;
export const QuoteUncheckedUpdateManyWithoutRejectedByUserNestedInputObjectZodSchema = makeSchema();
