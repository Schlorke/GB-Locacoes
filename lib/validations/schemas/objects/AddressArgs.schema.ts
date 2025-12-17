/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressSelectObjectSchema as AddressSelectObjectSchema } from './AddressSelect.schema';
import { AddressIncludeObjectSchema as AddressIncludeObjectSchema } from './AddressInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AddressSelectObjectSchema).optional(),
  include: z.lazy(() => AddressIncludeObjectSchema).optional()
}).strict();
export const AddressArgsObjectSchema = makeSchema();
export const AddressArgsObjectZodSchema = makeSchema();
