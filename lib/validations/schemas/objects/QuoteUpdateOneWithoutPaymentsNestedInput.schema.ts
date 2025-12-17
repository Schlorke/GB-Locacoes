import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteCreateWithoutPaymentsInputObjectSchema as QuoteCreateWithoutPaymentsInputObjectSchema } from './QuoteCreateWithoutPaymentsInput.schema';
import { QuoteUncheckedCreateWithoutPaymentsInputObjectSchema as QuoteUncheckedCreateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedCreateWithoutPaymentsInput.schema';
import { QuoteCreateOrConnectWithoutPaymentsInputObjectSchema as QuoteCreateOrConnectWithoutPaymentsInputObjectSchema } from './QuoteCreateOrConnectWithoutPaymentsInput.schema';
import { QuoteUpsertWithoutPaymentsInputObjectSchema as QuoteUpsertWithoutPaymentsInputObjectSchema } from './QuoteUpsertWithoutPaymentsInput.schema';
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema';
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './QuoteWhereUniqueInput.schema';
import { QuoteUpdateToOneWithWhereWithoutPaymentsInputObjectSchema as QuoteUpdateToOneWithWhereWithoutPaymentsInputObjectSchema } from './QuoteUpdateToOneWithWhereWithoutPaymentsInput.schema';
import { QuoteUpdateWithoutPaymentsInputObjectSchema as QuoteUpdateWithoutPaymentsInputObjectSchema } from './QuoteUpdateWithoutPaymentsInput.schema';
import { QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema as QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema } from './QuoteUncheckedUpdateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => QuoteCreateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedCreateWithoutPaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPaymentsInputObjectSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutPaymentsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => QuoteWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => QuoteWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => QuoteUpdateToOneWithWhereWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => QuoteUncheckedUpdateWithoutPaymentsInputObjectSchema)]).optional()
}).strict();
export const QuoteUpdateOneWithoutPaymentsNestedInputObjectSchema: z.ZodType<Prisma.QuoteUpdateOneWithoutPaymentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUpdateOneWithoutPaymentsNestedInput>;
export const QuoteUpdateOneWithoutPaymentsNestedInputObjectZodSchema = makeSchema();
