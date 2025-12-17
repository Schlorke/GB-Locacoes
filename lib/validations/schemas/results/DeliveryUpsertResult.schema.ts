import * as z from 'zod';
export const DeliveryUpsertResultSchema = z.object({
  id: z.string(),
  rentalId: z.string(),
  type: z.unknown(),
  status: z.unknown(),
  scheduledAt: z.date(),
  completedAt: z.date().optional(),
  address: z.unknown(),
  distance: z.number().optional(),
  vehicleId: z.string().optional(),
  driverId: z.string().optional(),
  driverName: z.string().optional(),
  photos: z.array(z.string()),
  checklist: z.unknown().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  rental: z.unknown()
});