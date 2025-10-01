/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './AddressWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AddressWhereInputObjectSchema).optional(),
  some: z.lazy(() => AddressWhereInputObjectSchema).optional(),
  none: z.lazy(() => AddressWhereInputObjectSchema).optional()
}).strict();
export const AddressListRelationFilterObjectSchema: z.ZodType<Prisma.AddressListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AddressListRelationFilter>;
export const AddressListRelationFilterObjectZodSchema = makeSchema();
