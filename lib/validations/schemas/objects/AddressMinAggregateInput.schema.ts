import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  street: z.literal(true).optional(),
  number: z.literal(true).optional(),
  complement: z.literal(true).optional(),
  neighborhood: z.literal(true).optional(),
  city: z.literal(true).optional(),
  state: z.literal(true).optional(),
  zipCode: z.literal(true).optional(),
  isPrimary: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AddressMinAggregateInputObjectSchema: z.ZodType<Prisma.AddressMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AddressMinAggregateInputType>;
export const AddressMinAggregateInputObjectZodSchema = makeSchema();
