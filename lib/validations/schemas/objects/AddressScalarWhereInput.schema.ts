import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const addressscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AddressScalarWhereInputObjectSchema), z.lazy(() => AddressScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AddressScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AddressScalarWhereInputObjectSchema), z.lazy(() => AddressScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  street: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  number: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  complement: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  neighborhood: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  state: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  zipCode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isPrimary: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AddressScalarWhereInputObjectSchema: z.ZodType<Prisma.AddressScalarWhereInput> = addressscalarwhereinputSchema as unknown as z.ZodType<Prisma.AddressScalarWhereInput>;
export const AddressScalarWhereInputObjectZodSchema = addressscalarwhereinputSchema;
