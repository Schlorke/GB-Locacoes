/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema';
import { QuoteUpdateWithoutItemsInputObjectSchema as QuoteUpdateWithoutItemsInputObjectSchema } from './QuoteUpdateWithoutItemsInput.schema';
import { QuoteUncheckedUpdateWithoutItemsInputObjectSchema as QuoteUncheckedUpdateWithoutItemsInputObjectSchema } from './QuoteUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema)])
}).strict();
export const QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteUpdateToOneWithWhereWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateToOneWithWhereWithoutItemsInput>;
export const QuoteUpdateToOneWithWhereWithoutItemsInputObjectZodSchema = makeSchema();
