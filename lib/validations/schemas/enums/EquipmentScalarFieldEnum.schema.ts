import * as z from 'zod';

export const EquipmentScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'pricePerDay', 'images', 'available', 'categoryId', 'createdAt', 'updatedAt', 'biweeklyDiscount', 'dailyDiscount', 'maxStock', 'monthlyDiscount', 'popularPeriod', 'weeklyDiscount', 'specifications', 'biweeklyDirectValue', 'biweeklyUseDirectValue', 'dailyDirectValue', 'dailyUseDirectValue', 'monthlyDirectValue', 'monthlyUseDirectValue', 'weeklyDirectValue', 'weeklyUseDirectValue', 'depreciationRate', 'hourMeter', 'odometer', 'purchaseDate', 'purchasePrice', 'partsLossHistory', 'partsLossCount'])

export type EquipmentScalarFieldEnum = z.infer<typeof EquipmentScalarFieldEnumSchema>;