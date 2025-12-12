/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutQuoteInputObjectSchema as rentalsCreateWithoutQuoteInputObjectSchema } from './rentalsCreateWithoutQuoteInput.schema';
import { rentalsUncheckedCreateWithoutQuoteInputObjectSchema as rentalsUncheckedCreateWithoutQuoteInputObjectSchema } from './rentalsUncheckedCreateWithoutQuoteInput.schema';
import { rentalsCreateOrConnectWithoutQuoteInputObjectSchema as rentalsCreateOrConnectWithoutQuoteInputObjectSchema } from './rentalsCreateOrConnectWithoutQuoteInput.schema';
import { rentalsUpsertWithWhereUniqueWithoutQuoteInputObjectSchema as rentalsUpsertWithWhereUniqueWithoutQuoteInputObjectSchema } from './rentalsUpsertWithWhereUniqueWithoutQuoteInput.schema';
import { rentalsCreateManyQuoteInputEnvelopeObjectSchema as rentalsCreateManyQuoteInputEnvelopeObjectSchema } from './rentalsCreateManyQuoteInputEnvelope.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithWhereUniqueWithoutQuoteInputObjectSchema as rentalsUpdateWithWhereUniqueWithoutQuoteInputObjectSchema } from './rentalsUpdateWithWhereUniqueWithoutQuoteInput.schema';
import { rentalsUpdateManyWithWhereWithoutQuoteInputObjectSchema as rentalsUpdateManyWithWhereWithoutQuoteInputObjectSchema } from './rentalsUpdateManyWithWhereWithoutQuoteInput.schema';
import { rentalsScalarWhereInputObjectSchema as rentalsScalarWhereInputObjectSchema } from './rentalsScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsCreateWithoutQuoteInputObjectSchema).array(), z.lazy(() => rentalsUncheckedCreateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutQuoteInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => rentalsCreateOrConnectWithoutQuoteInputObjectSchema), z.lazy(() => rentalsCreateOrConnectWithoutQuoteInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => rentalsUpsertWithWhereUniqueWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUpsertWithWhereUniqueWithoutQuoteInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => rentalsCreateManyQuoteInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => rentalsWhereUniqueInputObjectSchema), z.lazy(() => rentalsWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => rentalsUpdateWithWhereUniqueWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUpdateWithWhereUniqueWithoutQuoteInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => rentalsUpdateManyWithWhereWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUpdateManyWithWhereWithoutQuoteInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => rentalsScalarWhereInputObjectSchema), z.lazy(() => rentalsScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const rentalsUpdateManyWithoutQuoteNestedInputObjectSchema: z.ZodType<Prisma.rentalsUpdateManyWithoutQuoteNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateManyWithoutQuoteNestedInput>;
export const rentalsUpdateManyWithoutQuoteNestedInputObjectZodSchema = makeSchema();
