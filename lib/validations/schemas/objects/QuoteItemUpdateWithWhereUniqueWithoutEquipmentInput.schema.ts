import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutEquipmentInput.schema'

export const QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput, Prisma.QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput> = z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
export const QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema = z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
