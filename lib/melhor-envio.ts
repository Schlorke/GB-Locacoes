export interface MelhorEnvioClient {
  token: string
}

export const createMelhorEnvioClient = (): MelhorEnvioClient => {
  const token = process.env.MELHOR_ENVIO_TOKEN ?? ''
  return { token }
}
