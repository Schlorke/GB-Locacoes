/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const EquipmentResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    pricePerDay: z.number(),
    images: z.array(z.string()),
    available: z.boolean(),
    categoryId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    biweeklyDiscount: z.number().int().nullable(),
    dailyDiscount: z.number().int().nullable(),
    maxStock: z.number().int().nullable(),
    monthlyDiscount: z.number().int().nullable(),
    popularPeriod: z.string().nullable(),
    weeklyDiscount: z.number().int().nullable(),
    specifications: z.unknown().nullable(),
    biweeklyDirectValue: z.number().nullable(),
    biweeklyUseDirectValue: z.boolean(),
    dailyDirectValue: z.number().nullable(),
    dailyUseDirectValue: z.boolean(),
    monthlyDirectValue: z.number().nullable(),
    monthlyUseDirectValue: z.boolean(),
    weeklyDirectValue: z.number().nullable(),
    weeklyUseDirectValue: z.boolean(),
    depreciationRate: z.number().nullable(),
    hourMeter: z.number().nullable(),
    odometer: z.number().nullable(),
    purchaseDate: z.date().nullable(),
    purchasePrice: z.number().nullable(),
    cartItems: z.array(z.unknown()),
    units: z.array(z.unknown()),
    category: z.unknown(),
    maintenances: z.array(z.unknown()),
    quoteItems: z.array(z.unknown()),
    rental_items: z.array(z.unknown())
}).strict();

export type EquipmentResultType = z.infer<typeof EquipmentResultSchema>;
