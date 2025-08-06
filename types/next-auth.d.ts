import type { DefaultSession, DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

// Define Role type manually to avoid import issues
type Role = 'ADMIN' | 'CLIENT'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: Role
  }
}
