/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteCreateWithoutItemsInputObjectSchema as QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema';
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema as QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => QuoteWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema)])
}).strict();
export const QuoteCreateOrConnectWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateOrConnectWithoutItemsInput>;
export const QuoteCreateOrConnectWithoutItemsInputObjectZodSchema = makeSchema();
