import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteUpdateWithoutItemsInputObjectSchema as QuoteUpdateWithoutItemsInputObjectSchema } from './QuoteUpdateWithoutItemsInput.schema';
import { QuoteUncheckedUpdateWithoutItemsInputObjectSchema as QuoteUncheckedUpdateWithoutItemsInputObjectSchema } from './QuoteUncheckedUpdateWithoutItemsInput.schema';
import { QuoteCreateWithoutItemsInputObjectSchema as QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema';
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema as QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema)]),
  where: z.lazy(() => QuoteWhereInputObjectSchema).optional()
}).strict();
export const QuoteUpsertWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteUpsertWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpsertWithoutItemsInput>;
export const QuoteUpsertWithoutItemsInputObjectZodSchema = makeSchema();
