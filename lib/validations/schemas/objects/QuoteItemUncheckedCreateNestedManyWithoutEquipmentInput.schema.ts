/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemCreateWithoutEquipmentInputObjectSchema as QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema as QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema';
import { QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema as QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema } from './QuoteItemCreateOrConnectWithoutEquipmentInput.schema';
import { QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema as QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema } from './QuoteItemCreateManyEquipmentInputEnvelope.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput>;
export const QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectZodSchema = makeSchema();
