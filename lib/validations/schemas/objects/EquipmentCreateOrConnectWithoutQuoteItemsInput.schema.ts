import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './EquipmentWhereUniqueInput.schema';
import { EquipmentCreateWithoutQuoteItemsInputObjectSchema as EquipmentCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateWithoutQuoteItemsInput.schema';
import { EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema as EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema } from './EquipmentUncheckedCreateWithoutQuoteItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EquipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EquipmentCreateWithoutQuoteItemsInputObjectSchema), z.lazy(() => EquipmentUncheckedCreateWithoutQuoteItemsInputObjectSchema)])
}).strict();
export const EquipmentCreateOrConnectWithoutQuoteItemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateOrConnectWithoutQuoteItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateOrConnectWithoutQuoteItemsInput>;
export const EquipmentCreateOrConnectWithoutQuoteItemsInputObjectZodSchema = makeSchema();
