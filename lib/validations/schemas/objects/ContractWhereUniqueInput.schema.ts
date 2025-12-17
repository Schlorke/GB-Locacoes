import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  rentalId: z.string().optional()
}).strict();
export const ContractWhereUniqueInputObjectSchema: z.ZodType<Prisma.ContractWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ContractWhereUniqueInput>;
export const ContractWhereUniqueInputObjectZodSchema = makeSchema();
