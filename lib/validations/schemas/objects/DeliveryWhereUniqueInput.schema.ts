import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const DeliveryWhereUniqueInputObjectSchema: z.ZodType<Prisma.DeliveryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryWhereUniqueInput>;
export const DeliveryWhereUniqueInputObjectZodSchema = makeSchema();
