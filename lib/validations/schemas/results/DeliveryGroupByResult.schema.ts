/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const DeliveryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  rentalId: z.string(),
  scheduledAt: z.date(),
  completedAt: z.date(),
  address: z.unknown(),
  distance: z.number(),
  vehicleId: z.string(),
  driverId: z.string(),
  driverName: z.string(),
  photos: z.array(z.string()),
  checklist: z.unknown(),
  notes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    rentalId: z.number(),
    rental: z.number(),
    type: z.number(),
    status: z.number(),
    scheduledAt: z.number(),
    completedAt: z.number(),
    address: z.number(),
    distance: z.number(),
    vehicleId: z.number(),
    driverId: z.number(),
    driverName: z.number(),
    photos: z.number(),
    checklist: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    distance: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    distance: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    rentalId: z.string().nullable(),
    scheduledAt: z.date().nullable(),
    completedAt: z.date().nullable(),
    distance: z.number().nullable(),
    vehicleId: z.string().nullable(),
    driverId: z.string().nullable(),
    driverName: z.string().nullable(),
    photos: z.array(z.string()).nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    rentalId: z.string().nullable(),
    scheduledAt: z.date().nullable(),
    completedAt: z.date().nullable(),
    distance: z.number().nullable(),
    vehicleId: z.string().nullable(),
    driverId: z.string().nullable(),
    driverName: z.string().nullable(),
    photos: z.array(z.string()).nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));