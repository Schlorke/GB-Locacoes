import { z } from 'zod';

// prettier-ignore
export const EquipmentResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    pricePerDay: z.number(),
    images: z.array(z.string()).array(),
    available: z.boolean(),
    categoryId: z.string(),
    specifications: z.unknown().nullable(),
    maxStock: z.number().int().nullable(),
    dailyDiscount: z.number().int().nullable(),
    weeklyDiscount: z.number().int().nullable(),
    biweeklyDiscount: z.number().int().nullable(),
    monthlyDiscount: z.number().int().nullable(),
    popularPeriod: z.string().nullable(),
    dailyDirectValue: z.number().nullable(),
    weeklyDirectValue: z.number().nullable(),
    biweeklyDirectValue: z.number().nullable(),
    monthlyDirectValue: z.number().nullable(),
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

export type EquipmentResultType = z.infer<typeof EquipmentResultSchema>;
