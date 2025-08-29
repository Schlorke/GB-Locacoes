import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema';
import { EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateOrConnectWithoutQuoteItemsInput.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema).optional(),
  connect: z.lazy(() => EquipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateNestedOneWithoutQuoteItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateNestedOneWithoutQuoteItemsInput>;
export const EquipmentCreateNestedOneWithoutQuoteItemsInputObjectZodSchema = makeSchema();
