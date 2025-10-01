/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutItemsInputObjectSchema as QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema';
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema as QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema';
import { QuoteCreateOrConnectWithoutItemsInputObjectSchema as QuoteCreateOrConnectWithoutItemsInputObjectSchema } from './QuoteCreateOrConnectWithoutItemsInput.schema';
import { QuoteUpsertWithoutItemsInputObjectSchema as QuoteUpsertWithoutItemsInputObjectSchema } from './QuoteUpsertWithoutItemsInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema as QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema } from './QuoteUpdateToOneWithWhereWithoutItemsInput.schema';
import { QuoteUpdateWithoutItemsInputObjectSchema as QuoteUpdateWithoutItemsInputObjectSchema } from './QuoteUpdateWithoutItemsInput.schema';
import { QuoteUncheckedUpdateWithoutItemsInputObjectSchema as QuoteUncheckedUpdateWithoutItemsInputObjectSchema } from './QuoteUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => QuoteUpdateToOneWithWhereWithoutItemsInputObjectSchema), z.lazy(() => QuoteUpdateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutItemsInputObjectSchema)]).optional()
}).strict();
export const QuoteUpdateOneRequiredWithoutItemsNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateOneRequiredWithoutItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateOneRequiredWithoutItemsNestedInput>;
export const QuoteUpdateOneRequiredWithoutItemsNestedInputObjectZodSchema = makeSchema();
