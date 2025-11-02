import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemScalarWhereInputObjectSchema as QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema';
import { QuoteItemUpdateManyMutationInputObjectSchema as QuoteItemUpdateManyMutationInputObjectSchema } from './QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema as QuoteItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema)])
}).strict();
export const QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutEquipmentInput>;
export const QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectZodSchema = makeSchema();
