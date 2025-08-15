import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { QuoteCreateWithoutItemsInputObjectSchema } from './QuoteCreateWithoutItemsInput.schema';
import { QuoteUncheckedCreateWithoutItemsInputObjectSchema } from './QuoteUncheckedCreateWithoutItemsInput.schema';
import { QuoteCreateOrConnectWithoutItemsInputObjectSchema } from './QuoteCreateOrConnectWithoutItemsInput.schema';
import { QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema'

export const QuoteCreateNestedOneWithoutItemsInputObjectSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutItemsInput, Prisma.QuoteCreateNestedOneWithoutItemsInput> = z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional()
}).strict();
export const QuoteCreateNestedOneWithoutItemsInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutItemsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional()
}).strict();
