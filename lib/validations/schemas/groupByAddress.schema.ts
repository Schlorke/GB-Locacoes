/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AddressWhereInputObjectSchema as AddressWhereInputObjectSchema } from './objects/AddressWhereInput.schema';
import { AddressOrderByWithAggregationInputObjectSchema as AddressOrderByWithAggregationInputObjectSchema } from './objects/AddressOrderByWithAggregationInput.schema';
import { AddressScalarWhereWithAggregatesInputObjectSchema as AddressScalarWhereWithAggregatesInputObjectSchema } from './objects/AddressScalarWhereWithAggregatesInput.schema';
import { AddressScalarFieldEnumSchema as AddressScalarFieldEnum } from './enums/AddressScalarFieldEnum.schema';
import { AddressCountAggregateInputObjectSchema as AddressCountAggregateInputObjectSchema } from './objects/AddressCountAggregateInput.schema';
import { AddressMinAggregateInputObjectSchema as AddressMinAggregateInputObjectSchema } from './objects/AddressMinAggregateInput.schema';
import { AddressMaxAggregateInputObjectSchema as AddressMaxAggregateInputObjectSchema } from './objects/AddressMaxAggregateInput.schema';

export const AddressGroupBySchema: z.ZodType<Prisma.AddressGroupByArgs> = z.object({ where: AddressWhereInputObjectSchema.optional(), orderBy: z.union([AddressOrderByWithAggregationInputObjectSchema, AddressOrderByWithAggregationInputObjectSchema.array()]).optional(), having: AddressScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(AddressScalarFieldEnum), _count: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional(), _min: AddressMinAggregateInputObjectSchema.optional(), _max: AddressMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AddressGroupByArgs>;

export const AddressGroupByZodSchema = z.object({ where: AddressWhereInputObjectSchema.optional(), orderBy: z.union([AddressOrderByWithAggregationInputObjectSchema, AddressOrderByWithAggregationInputObjectSchema.array()]).optional(), having: AddressScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(AddressScalarFieldEnum), _count: z.union([ z.literal(true), AddressCountAggregateInputObjectSchema ]).optional(), _min: AddressMinAggregateInputObjectSchema.optional(), _max: AddressMaxAggregateInputObjectSchema.optional() }).strict();