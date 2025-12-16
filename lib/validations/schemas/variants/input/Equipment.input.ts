/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const EquipmentInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    pricePerDay: z.number(),
    images: z.array(z.string()),
    available: z.boolean(),
    categoryId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    biweeklyDiscount: z.number().int().optional().nullable(),
    dailyDiscount: z.number().int().optional().nullable(),
    maxStock: z.number().int().optional().nullable(),
    monthlyDiscount: z.number().int().optional().nullable(),
    popularPeriod: z.string().optional().nullable(),
    weeklyDiscount: z.number().int().optional().nullable(),
    specifications: z.unknown().optional().nullable(),
    biweeklyDirectValue: z.number().optional().nullable(),
    biweeklyUseDirectValue: z.boolean(),
    dailyDirectValue: z.number().optional().nullable(),
    dailyUseDirectValue: z.boolean(),
    monthlyDirectValue: z.number().optional().nullable(),
    monthlyUseDirectValue: z.boolean(),
    weeklyDirectValue: z.number().optional().nullable(),
    weeklyUseDirectValue: z.boolean(),
    depreciationRate: z.number().optional().nullable(),
    hourMeter: z.number().optional().nullable(),
    odometer: z.number().optional().nullable(),
    purchaseDate: z.date().optional().nullable(),
    purchasePrice: z.number().optional().nullable(),
    cartItems: z.array(z.unknown()),
    units: z.array(z.unknown()),
    category: z.unknown(),
    maintenances: z.array(z.unknown()),
    quoteItems: z.array(z.unknown()),
    rental_items: z.array(z.unknown())
}).strict();

export type EquipmentInputType = z.infer<typeof EquipmentInputSchema>;
