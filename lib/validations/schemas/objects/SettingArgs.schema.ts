import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SettingSelectObjectSchema } from './SettingSelect.schema'

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => SettingSelectObjectSchema).optional(),
    })
    .strict()
export const SettingArgsObjectSchema = makeSchema()
export const SettingArgsObjectZodSchema = makeSchema()
