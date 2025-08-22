import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema';
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema'

export const rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutRental_itemsInput, Prisma.rentalsCreateOrConnectWithoutRental_itemsInput> = z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutRental_itemsInputObjectZodSchema = z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)])
}).strict();
