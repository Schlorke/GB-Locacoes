import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PaymentWhereUniqueInputObjectSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentWhereUniqueInput>;
export const PaymentWhereUniqueInputObjectZodSchema = makeSchema();
