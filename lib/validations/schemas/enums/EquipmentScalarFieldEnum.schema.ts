import { z } from 'zod';

export const EquipmentScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'pricePerDay', 'images', 'available', 'categoryId', 'maxStock', 'dailyDiscount', 'weeklyDiscount', 'biweeklyDiscount', 'monthlyDiscount', 'popularPeriod', 'createdAt', 'updatedAt', 'category_id'])