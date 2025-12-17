import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsWhereUniqueInputObjectSchema as rentalsWhereUniqueInputObjectSchema } from './rentalsWhereUniqueInput.schema';
import { rentalsUpdateWithoutQuoteInputObjectSchema as rentalsUpdateWithoutQuoteInputObjectSchema } from './rentalsUpdateWithoutQuoteInput.schema';
import { rentalsUncheckedUpdateWithoutQuoteInputObjectSchema as rentalsUncheckedUpdateWithoutQuoteInputObjectSchema } from './rentalsUncheckedUpdateWithoutQuoteInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => rentalsWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => rentalsUpdateWithoutQuoteInputObjectSchema), z.lazy(() => rentalsUncheckedUpdateWithoutQuoteInputObjectSchema)])
}).strict();
export const rentalsUpdateWithWhereUniqueWithoutQuoteInputObjectSchema: z.ZodType<Prisma.rentalsUpdateWithWhereUniqueWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateWithWhereUniqueWithoutQuoteInput>;
export const rentalsUpdateWithWhereUniqueWithoutQuoteInputObjectZodSchema = makeSchema();
