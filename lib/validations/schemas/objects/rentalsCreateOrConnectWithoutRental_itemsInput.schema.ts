/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutRental_itemsInputObjectSchema as rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema';
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema as rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutRental_itemsInput>;
export const rentalsCreateOrConnectWithoutRental_itemsInputObjectZodSchema = makeSchema();
