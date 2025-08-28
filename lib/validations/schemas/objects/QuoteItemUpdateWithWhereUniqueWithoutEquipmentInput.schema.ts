import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUpdateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateWithoutEquipmentInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateWithoutEquipmentInputObjectSchema)])
}).strict();
export const QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateWithWhereUniqueWithoutEquipmentInput>;
export const QuoteItemUpdateWithWhereUniqueWithoutEquipmentInputObjectZodSchema = makeSchema();
