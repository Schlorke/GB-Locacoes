import { z } from 'zod';

export const EquipmentScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'pricePerDay', 'images', 'available', 'categoryId', 'createdAt', 'updatedAt', 'category_id'])