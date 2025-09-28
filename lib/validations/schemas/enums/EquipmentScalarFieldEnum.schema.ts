/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const EquipmentScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'pricePerDay', 'images', 'available', 'categoryId', 'specifications', 'maxStock', 'dailyDiscount', 'weeklyDiscount', 'biweeklyDiscount', 'monthlyDiscount', 'popularPeriod', 'dailyDirectValue', 'weeklyDirectValue', 'biweeklyDirectValue', 'monthlyDirectValue', 'dailyUseDirectValue', 'weeklyUseDirectValue', 'biweeklyUseDirectValue', 'monthlyUseDirectValue', 'createdAt', 'updatedAt'])

export type EquipmentScalarFieldEnum = z.infer<typeof EquipmentScalarFieldEnumSchema>;