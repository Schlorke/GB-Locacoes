/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  rentalId: z.boolean().optional(),
  type: z.boolean().optional(),
  status: z.boolean().optional(),
  scheduledAt: z.boolean().optional(),
  completedAt: z.boolean().optional(),
  address: z.boolean().optional(),
  distance: z.boolean().optional(),
  vehicleId: z.boolean().optional(),
  driverId: z.boolean().optional(),
  driverName: z.boolean().optional(),
  photos: z.boolean().optional(),
  checklist: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  rental: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const DeliverySelectObjectSchema: z.ZodType<Prisma.DeliverySelect> = makeSchema() as unknown as z.ZodType<Prisma.DeliverySelect>;
export const DeliverySelectObjectZodSchema = makeSchema();
