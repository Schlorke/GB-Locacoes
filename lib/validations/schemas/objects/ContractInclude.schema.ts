/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () => z.object({
  rental: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const ContractIncludeObjectSchema: z.ZodType<Prisma.ContractInclude> = makeSchema() as unknown as z.ZodType<Prisma.ContractInclude>;
export const ContractIncludeObjectZodSchema = makeSchema();
