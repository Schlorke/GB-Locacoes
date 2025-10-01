/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithoutEquipmentInputObjectSchema as QuoteItemUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema as QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutEquipmentInput.schema';
import { QuoteItemCreateWithoutEquipmentInputObjectSchema as QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema as QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema)])
}).strict();
export const QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpsertWithWhereUniqueWithoutEquipmentInput>;
export const QuoteItemUpsertWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
