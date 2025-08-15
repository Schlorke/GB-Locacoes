import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema';
import { QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema } from './QuoteItemCreateOrConnectWithoutEquipmentInput.schema';
import { QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema } from './QuoteItemCreateManyEquipmentInputEnvelope.schema';
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema'

export const QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateNestedManyWithoutEquipmentInput, Prisma.QuoteItemCreateNestedManyWithoutEquipmentInput> = z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const QuoteItemCreateNestedManyWithoutEquipmentInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
