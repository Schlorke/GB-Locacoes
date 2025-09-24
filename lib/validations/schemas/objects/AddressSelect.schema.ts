import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  street: z.boolean().optional(),
  number: z.boolean().optional(),
  complement: z.boolean().optional(),
  neighborhood: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const AddressSelectObjectSchema: z.ZodType<Prisma.AddressSelect> = makeSchema() as unknown as z.ZodType<Prisma.AddressSelect>;
export const AddressSelectObjectZodSchema = makeSchema();
