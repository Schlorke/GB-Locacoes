import 'dotenv/config'

import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
    // directUrl é usado apenas para migrations via variável de ambiente DIRECT_URL
    // Não precisa estar aqui no Prisma 7.1.0
  },
})
