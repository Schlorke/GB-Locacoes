/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemCreateWithoutQuoteInputObjectSchema as QuoteItemCreateWithoutQuoteInputObjectSchema } from './QuoteItemCreateWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateWithoutQuoteInput.schema';
import { QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema as QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema } from './QuoteItemCreateOrConnectWithoutQuoteInput.schema';
import { QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema as QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema } from './QuoteItemUpsertWithWhereUniqueWithoutQuoteInput.schema';
import { QuoteItemCreateManyQuoteInputEnvelopeObjectSchema as QuoteItemCreateManyQuoteInputEnvelopeObjectSchema } from './QuoteItemCreateManyQuoteInputEnvelope.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema as QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema } from './QuoteItemUpdateWithWhereUniqueWithoutQuoteInput.schema';
import { QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema as QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema } from './QuoteItemUpdateManyWithWhereWithoutQuoteInput.schema';
import { QuoteItemScalarWhereInputObjectSchema as QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUpsertWithWhereUniqueWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUpdateWithWhereUniqueWithoutQuoteInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema), z.lazy(() => QuoteItemUpdateManyWithWhereWithoutQuoteInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const QuoteItemUpdateManyWithoutQuoteNestedInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateManyWithoutQuoteNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyWithoutQuoteNestedInput>;
export const QuoteItemUpdateManyWithoutQuoteNestedInputObjectZodSchema = makeSchema();
