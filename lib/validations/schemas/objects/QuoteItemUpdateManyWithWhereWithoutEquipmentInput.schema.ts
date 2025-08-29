import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteItemScalarWhereInputObjectSchema } from './QuoteItemScalarWhereInput.schema';
import { QuoteItemUpdateManyMutationInputObjectSchema } from './QuoteItemUpdateManyMutationInput.schema';
import { QuoteItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedUpdateManyWithoutEquipmentInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => QuoteItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => QuoteItemUpdateManyMutationInputObjectSchema), z.lazy(() => QuoteItemUncheckedUpdateManyWithoutEquipmentInputObjectSchema)])
}).strict();
export const QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyWithWhereWithoutEquipmentInput>;
export const QuoteItemUpdateManyWithWhereWithoutEquipmentInputObjectZodSchema = makeSchema();
