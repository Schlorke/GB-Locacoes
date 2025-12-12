/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const MaintenanceGroupByResultSchema = z.array(z.object({
  id: z.string(),
  equipmentId: z.string(),
  scheduledAt: z.date(),
  completedAt: z.date(),
  cost: z.number(),
  laborCost: z.number(),
  partsCost: z.number(),
  description: z.string(),
  notes: z.string(),
  technician: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    equipmentId: z.number(),
    equipment: z.number(),
    type: z.number(),
    scheduledAt: z.number(),
    completedAt: z.number(),
    cost: z.number(),
    laborCost: z.number(),
    partsCost: z.number(),
    description: z.number(),
    notes: z.number(),
    technician: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    cost: z.number().nullable(),
    laborCost: z.number().nullable(),
    partsCost: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    cost: z.number().nullable(),
    laborCost: z.number().nullable(),
    partsCost: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    equipmentId: z.string().nullable(),
    scheduledAt: z.date().nullable(),
    completedAt: z.date().nullable(),
    cost: z.number().nullable(),
    laborCost: z.number().nullable(),
    partsCost: z.number().nullable(),
    description: z.string().nullable(),
    notes: z.string().nullable(),
    technician: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    equipmentId: z.string().nullable(),
    scheduledAt: z.date().nullable(),
    completedAt: z.date().nullable(),
    cost: z.number().nullable(),
    laborCost: z.number().nullable(),
    partsCost: z.number().nullable(),
    description: z.string().nullable(),
    notes: z.string().nullable(),
    technician: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));