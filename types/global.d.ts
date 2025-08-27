declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Next.js variables
      readonly NODE_ENV: 'development' | 'production' | 'test'

      // Project specific variables
      DATABASE_URL: string
      DIRECT_URL?: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL?: string
      NEXTAUTH_DEBUG?: string
      STRIPE_SECRET_KEY?: string
      RESEND_API_KEY?: string
      ZAPSIGN_TOKEN?: string
      MELHOR_ENVIO_TOKEN?: string
      LOG_LEVEL?: string
    }
  }
}
