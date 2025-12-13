/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const EquipmentUnitGroupByResultSchema = z.array(z.object({
  id: z.string(),
  equipmentId: z.string(),
  uniqueCode: z.string(),
  hourMeter: z.number(),
  odometer: z.number(),
  serialNumber: z.string(),
  notes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    equipmentId: z.number(),
    equipment: z.number(),
    uniqueCode: z.number(),
    status: z.number(),
    hourMeter: z.number(),
    odometer: z.number(),
    serialNumber: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    hourMeter: z.number().nullable(),
    odometer: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    hourMeter: z.number().nullable(),
    odometer: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    equipmentId: z.string().nullable(),
    uniqueCode: z.string().nullable(),
    hourMeter: z.number().nullable(),
    odometer: z.number().nullable(),
    serialNumber: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    equipmentId: z.string().nullable(),
    uniqueCode: z.string().nullable(),
    hourMeter: z.number().nullable(),
    odometer: z.number().nullable(),
    serialNumber: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));