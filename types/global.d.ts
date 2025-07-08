declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    DIRECT_URL?: string;
    NEXTAUTH_SECRET: string;
    STRIPE_SECRET_KEY?: string;
    RESEND_API_KEY?: string;
    ZAPSIGN_TOKEN?: string;
    MELHOR_ENVIO_TOKEN?: string;
    LOG_LEVEL?: string;
  }
}
