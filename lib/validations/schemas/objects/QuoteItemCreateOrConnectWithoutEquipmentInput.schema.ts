/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './QuoteItemWhereUniqueInput.schema';
import { QuoteItemCreateWithoutEquipmentInputObjectSchema as QuoteItemCreateWithoutEquipmentInputObjectSchema } from './QuoteItemCreateWithoutEquipmentInput.schema';
import { QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema as QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateWithoutEquipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteItemCreateWithoutEquipmentInputObjectSchema), z.lazy(() => QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema)])
}).strict();
export const QuoteItemCreateOrConnectWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateOrConnectWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateOrConnectWithoutEquipmentInput>;
export const QuoteItemCreateOrConnectWithoutEquipmentInputObjectZodSchema = makeSchema();
