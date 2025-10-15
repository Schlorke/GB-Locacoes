/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';

// prettier-ignore
export const CategoryModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    icon: z.string().nullable(),
    iconColor: z.string(),
    bgColor: z.string(),
    fontColor: z.string(),
    slug: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    equipments: z.array(z.unknown())
}).strict();

export type CategoryPureType = z.infer<typeof CategoryModelSchema>;
