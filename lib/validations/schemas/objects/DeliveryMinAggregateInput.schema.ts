import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rentalId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  status: z.literal(true).optional(),
  scheduledAt: z.literal(true).optional(),
  completedAt: z.literal(true).optional(),
  distance: z.literal(true).optional(),
  vehicleId: z.literal(true).optional(),
  driverId: z.literal(true).optional(),
  driverName: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const DeliveryMinAggregateInputObjectSchema: z.ZodType<Prisma.DeliveryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryMinAggregateInputType>;
export const DeliveryMinAggregateInputObjectZodSchema = makeSchema();
