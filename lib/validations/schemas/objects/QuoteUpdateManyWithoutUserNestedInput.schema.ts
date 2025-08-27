import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteCreateWithoutUserInputObjectSchema } from './QuoteCreateWithoutUserInput.schema';
import { QuoteUncheckedCreateWithoutUserInputObjectSchema } from './QuoteUncheckedCreateWithoutUserInput.schema';
import { QuoteCreateOrConnectWithoutUserInputObjectSchema } from './QuoteCreateOrConnectWithoutUserInput.schema';
import { QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './QuoteUpsertWithWhereUniqueWithoutUserInput.schema';
import { QuoteCreateManyUserInputEnvelopeObjectSchema } from './QuoteCreateManyUserInputEnvelope.schema';
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './QuoteUpdateWithWhereUniqueWithoutUserInput.schema';
import { QuoteUpdateManyWithWhereWithoutUserInputObjectSchema } from './QuoteUpdateManyWithWhereWithoutUserInput.schema';
import { QuoteScalarWhereInputObjectSchema } from './QuoteScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteCreateWithoutUserInputObjectSchema).array(), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => QuoteCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => QuoteWhereUniqueInputObjectSchema), z.lazy(() => QuoteWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const QuoteUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateManyWithoutUserNestedInput>;
export const QuoteUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
