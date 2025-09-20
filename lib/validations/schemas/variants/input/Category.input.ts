import { z } from 'zod'

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
    createdAt: z.date(),
    updatedAt: z.date(),
    equipments: z.array(z.unknown()).array()
}).strict();

export type CategoryInputType = z.infer<typeof CategoryInputSchema>
