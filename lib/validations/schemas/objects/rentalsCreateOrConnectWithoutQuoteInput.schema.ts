/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsCreateWithoutQuoteInputObjectSchema as rentalsCreateWithoutQuoteInputObjectSchema } from './rentalsCreateWithoutQuoteInput.schema';
import { rentalsUncheckedCreateWithoutQuoteInputObjectSchema as rentalsUncheckedCreateWithoutQuoteInputObjectSchema } from './rentalsUncheckedCreateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => rentalsCreateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUncheckedCreateWithoutQuoteInputObjectSchema)])
}).strict();
export const rentalsCreateOrConnectWithoutQuoteInputObjectSchema: z.ZodType<Prisma.rentalsCreateOrConnectWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateOrConnectWithoutQuoteInput>;
export const rentalsCreateOrConnectWithoutQuoteInputObjectZodSchema = makeSchema();
