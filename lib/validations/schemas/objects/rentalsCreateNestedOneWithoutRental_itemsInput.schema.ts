import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema';
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema';
import { rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema } from './rentalsCreateOrConnectWithoutRental_itemsInput.schema';
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

export const rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedOneWithoutRental_itemsInput, Prisma.rentalsCreateNestedOneWithoutRental_itemsInput> = z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional()
}).strict();
export const rentalsCreateNestedOneWithoutRental_itemsInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional()
}).strict();
