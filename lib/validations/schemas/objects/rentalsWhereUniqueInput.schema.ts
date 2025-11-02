import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const rentalsWhereUniqueInputObjectSchema: z.ZodType<Prisma.rentalsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsWhereUniqueInput>;
export const rentalsWhereUniqueInputObjectZodSchema = makeSchema();
