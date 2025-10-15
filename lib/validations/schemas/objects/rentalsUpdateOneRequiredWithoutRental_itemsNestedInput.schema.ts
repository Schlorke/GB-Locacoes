/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsCreateWithoutRental_itemsInputObjectSchema as rentalsCreateWithoutRental_itemsInputObjectSchema } from './rentalsCreateWithoutRental_itemsInput.schema';
import { rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema as rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedCreateWithoutRental_itemsInput.schema';
import { rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema as rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema } from './rentalsCreateOrConnectWithoutRental_itemsInput.schema';
import { rentalsUpsertWithoutRental_itemsInputObjectSchema as rentalsUpsertWithoutRental_itemsInputObjectSchema } from './rentalsUpsertWithoutRental_itemsInput.schema';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema as rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema } from './rentalsUpdateToOneWithWhereWithoutRental_itemsInput.schema';
import { rentalsUpdateWithoutRental_itemsInputObjectSchema as rentalsUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUpdateWithoutRental_itemsInput.schema';
import { rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema as rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema } from './rentalsUncheckedUpdateWithoutRental_itemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => rentalsCreateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutRental_itemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => rentalsCreateOrConnectWithoutRental_itemsInputObjectSchema).optional(),
  upsert: z.lazy(() => rentalsUpsertWithoutRental_itemsInputObjectSchema).optional(),
  connect: z.lazy(() => rentalsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => rentalsUpdateToOneWithWhereWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUpdateWithoutRental_itemsInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutRental_itemsInputObjectSchema)]).optional()
}).strict();
export const rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectSchema: z.ZodType<Prisma.rentalsUpdateOneRequiredWithoutRental_itemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateOneRequiredWithoutRental_itemsNestedInput>;
export const rentalsUpdateOneRequiredWithoutRental_itemsNestedInputObjectZodSchema = makeSchema();
