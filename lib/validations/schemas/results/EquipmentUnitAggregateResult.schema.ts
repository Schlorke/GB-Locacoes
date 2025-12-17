/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const EquipmentUnitAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    equipmentId: z.number(),
    uniqueCode: z.number(),
    status: z.number(),
    hourMeter: z.number(),
    odometer: z.number(),
    serialNumber: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    equipment: z.number()
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
  }).nullable().optional()});