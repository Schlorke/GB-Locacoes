import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumContractStatusFilterObjectSchema as EnumContractStatusFilterObjectSchema } from './EnumContractStatusFilter.schema';
import { ContractStatusSchema } from '../enums/ContractStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RentalsScalarRelationFilterObjectSchema as RentalsScalarRelationFilterObjectSchema } from './RentalsScalarRelationFilter.schema';
import { rentalsWhereInputObjectSchema as rentalsWhereInputObjectSchema } from './rentalsWhereInput.schema'

const contractwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ContractWhereInputObjectSchema), z.lazy(() => ContractWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ContractWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ContractWhereInputObjectSchema), z.lazy(() => ContractWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rentalId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  template: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  content: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  pdfUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  signedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  signedBy: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  zapSignId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumContractStatusFilterObjectSchema), ContractStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  rental: z.union([z.lazy(() => RentalsScalarRelationFilterObjectSchema), z.lazy(() => rentalsWhereInputObjectSchema)]).optional()
}).strict();
export const ContractWhereInputObjectSchema: z.ZodType<Prisma.ContractWhereInput> = contractwhereinputSchema as unknown as z.ZodType<Prisma.ContractWhereInput>;
export const ContractWhereInputObjectZodSchema = contractwhereinputSchema;
