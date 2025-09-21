import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EquipmentScalarRelationFilterObjectSchema } from './EquipmentScalarRelationFilter.schema';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema';
import { QuoteScalarRelationFilterObjectSchema } from './QuoteScalarRelationFilter.schema';
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const quoteitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => QuoteItemWhereInputObjectSchema), z.lazy(() => QuoteItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemWhereInputObjectSchema), z.lazy(() => QuoteItemWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quoteId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  equipment: z.union([z.lazy(() => EquipmentScalarRelationFilterObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema)]).optional(),
  quote: z.union([z.lazy(() => QuoteScalarRelationFilterObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema)]).optional()
}).strict();
export const QuoteItemWhereInputObjectSchema: z.ZodType<Prisma.QuoteItemWhereInput> = quoteitemwhereinputSchema as unknown as z.ZodType<Prisma.QuoteItemWhereInput>;
export const QuoteItemWhereInputObjectZodSchema = quoteitemwhereinputSchema;
