import { z } from 'zod';

export const CategoryScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'icon', 'iconColor', 'bgColor', 'fontColor', 'slug', 'createdAt', 'updatedAt'])