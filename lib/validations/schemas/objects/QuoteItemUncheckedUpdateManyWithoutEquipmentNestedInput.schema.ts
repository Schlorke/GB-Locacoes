import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemCreateWithoutEquipmentInputObjectSchema as QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema as QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema';
import { QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema as QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema } from './QuoteItemCreateOrConnectWithoutEquipmentInput.schema';
import { QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema as QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema } from './QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput.schema';
import { QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema as QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema } from './QuoteItemCreateManyEquipmentInputEnvelope.schema';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema as QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput.schema';
import { QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema as QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateManyWithWhereWithoutEquipmentInput.schema';
import { QuoteItemScalarWhereInputObjectSchema as QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema).array(), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => QuoteItemCreateManyEquipmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => QuoteItemWhereUniqueInputObjectSchema), z.lazy(() => QuoteItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInput>;
export const QuoteItemUncheckedUpdateManyWithoutEquipmentNestedInputObjectZodSchema = makeSchema();
