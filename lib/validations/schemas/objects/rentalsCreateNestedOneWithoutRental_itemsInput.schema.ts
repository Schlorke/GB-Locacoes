import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema';
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema';
import { rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema } from './rentalsCreateOrConnectWithoutRental_itemsInput.schema';
import { rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional()
}).strict();
export const rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.rentalsCreateNestedOneWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateNestedOneWithoutRental_itemsInput>;
export const rentalsCreateNestedOneWithoutRental_itemsInputObjectZodSchema = makeSchema();
