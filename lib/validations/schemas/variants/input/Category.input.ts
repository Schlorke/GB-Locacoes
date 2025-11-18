/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
// prettier-ignore
export const CategoryInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    iconColor: z.string(),
    bgColor: z.string(),
    fontColor: z.string(),
    slug: z.string(),
    placement: z.string().optional().nullable(),
    customIcon: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    equipments: z.array(z.unknown())
}).strict();

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;
