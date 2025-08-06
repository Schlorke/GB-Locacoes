export interface ZapsignClient {
  token: string
}

export const createZapsignClient = (): ZapsignClient => {
  const token = process.env.ZAPSIGN_TOKEN ?? ''
  return { token }
}
