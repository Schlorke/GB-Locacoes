import { z } from 'zod';

// prettier-ignore
export const EquipmentInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    pricePerDay: z.number(),
    images: z.array(z.string()).array(),
    available: z.boolean(),
    categoryId: z.string(),
    specifications: z.unknown().optional().nullable(),
    maxStock: z.number().int().optional().nullable(),
    dailyDiscount: z.number().int().optional().nullable(),
    weeklyDiscount: z.number().int().optional().nullable(),
    biweeklyDiscount: z.number().int().optional().nullable(),
    monthlyDiscount: z.number().int().optional().nullable(),
    popularPeriod: z.string().optional().nullable(),
    dailyDirectValue: z.number().optional().nullable(),
    weeklyDirectValue: z.number().optional().nullable(),
    biweeklyDirectValue: z.number().optional().nullable(),
    monthlyDirectValue: z.number().optional().nullable(),
    dailyUseDirectValue: z.boolean(),
    weeklyUseDirectValue: z.boolean(),
    biweeklyUseDirectValue: z.boolean(),
    monthlyUseDirectValue: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    category: z.unknown(),
    quoteItems: z.array(z.unknown()).array(),
    rental_items: z.array(z.unknown()).array(),
    cartItems: z.array(z.unknown()).array()
}).strict();

export type EquipmentInputType = z.infer<typeof EquipmentInputSchema>;
