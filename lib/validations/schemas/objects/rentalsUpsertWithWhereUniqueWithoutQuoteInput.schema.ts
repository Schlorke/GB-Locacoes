/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithoutQuoteInputObjectSchema as rentalsUpdateWithoutQuoteInputObjectSchema } from './rentalsUpdateWithoutQuoteInput.schema';
import { rentalsUncheckedUpdateWithoutQuoteInputObjectSchema as rentalsUncheckedUpdateWithoutQuoteInputObjectSchema } from './rentalsUncheckedUpdateWithoutQuoteInput.schema';
import { rentalsCreateWithoutQuoteInputObjectSchema as rentalsCreateWithoutQuoteInputObjectSchema } from './rentalsCreateWithoutQuoteInput.schema';
import { rentalsUncheckedCreateWithoutQuoteInputObjectSchema as rentalsUncheckedCreateWithoutQuoteInputObjectSchema } from './rentalsUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => rentalsUpdateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutQuoteInputObjectSchema)]),
  create: z.union([z.lazy(() => rentalsCreateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const rentalsUpsertWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.rentalsUpsertWithWhereUniqueWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpsertWithWhereUniqueWithoutQuoteInput>;
export const rentalsUpsertWithWhereUniqueWithoutQuoteInputObjectZodSchema = makeSchema();
