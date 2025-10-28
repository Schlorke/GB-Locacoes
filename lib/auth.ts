import bcrypt from 'bcryptjs'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

// Runtime-only Prisma import to prevent build-time initialization
async function getPrisma() {
  const { prisma } = await import('./prisma')
  return prisma
}

// Helper function for debug logging
const debugLog = (message: string, data?: unknown) => {
  // Only log in development and when explicitly enabled
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXTAUTH_DEBUG === 'true'
  ) {
    console.warn(`[AUTH DEBUG] ${message}`, data || '')
  }
}

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(await getPrisma()), // Temporariamente desabilitado devido a incompatibilidade de versões
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        debugLog('Iniciando autenticação')

        if (!credentials?.email || !credentials.password) {
          debugLog('Credenciais ausentes')
          return null
        }

        try {
          const normalizedEmail = credentials.email.trim().toLowerCase()
          debugLog('Buscando usuário', { email: normalizedEmail })

          const prisma = await getPrisma()
          const user = await prisma.user.findFirst({
            where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
          })

          if (!user) {
            debugLog('Usuário não encontrado')
            return null
          }

          if (!user.password) {
            debugLog('Usuário sem senha')
            return null
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isValidPassword) {
            // Fallback: se a senha no banco estiver em texto puro de versões antigas,
            // aceita uma única vez e re-hash automaticamente para bcrypt.
            if (credentials.password === user.password) {
              debugLog(
                'Senha em texto puro detectada. Realizando re-hash automático.'
              )
              try {
                const hashed = bcrypt.hashSync(credentials.password, 12)
                await prisma.user.update({
                  where: { id: user.id },
                  data: { password: hashed },
                })
              } catch (rehashErr) {
                console.error(
                  '[AUTH] Falha ao re-hash da senha antiga:',
                  rehashErr
                )
              }
            } else {
              debugLog('Senha inválida')
              return null
            }
          }

          debugLog('Autenticação bem-sucedida', {
            id: user.id,
            email: user.email,
            role: user.role,
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('💥 [AUTH] Erro:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Primeira vez que o usuário faz login
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      // Para OAuth (Google/Facebook), criar ou atualizar usuário no banco
      if (account && profile && user) {
        try {
          const prisma = await getPrisma()
          const normalizedEmail = user.email?.trim().toLowerCase()

          if (normalizedEmail) {
            // Verificar se usuário já existe
            const existingUser = await prisma.user.findFirst({
              where: {
                email: { equals: normalizedEmail, mode: 'insensitive' },
              },
            })

            if (existingUser) {
              // Atualizar informações do usuário existente
              await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  name: user.name || existingUser.name,
                  image: user.image || existingUser.image,
                  // Não sobrescrever role se já existir
                  role: existingUser.role || 'CLIENT',
                },
              })
              token.id = existingUser.id
              token.role = existingUser.role || 'CLIENT'
            } else {
              // Criar novo usuário
              const newUser = await prisma.user.create({
                data: {
                  email: normalizedEmail,
                  name: user.name || '',
                  image: user.image || null,
                  role: 'CLIENT', // Usuários OAuth são sempre CLIENT por padrão
                  // Campos opcionais para OAuth (podem ser preenchidos depois)
                  phone: null,
                  cpf: null,
                  cnpj: null,
                },
              })
              token.id = newUser.id
              token.role = newUser.role
            }
          }
        } catch (error) {
          console.error('Erro ao processar login OAuth:', error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'ADMIN' | 'CLIENT'
      }
      return session
    },
    async signIn({ account }) {
      // Permitir login para todos os usuários
      // A lógica de criação/atualização está no callback jwt

      // Para OAuth (Google/Facebook), verificar role e redirecionar
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        // O role será definido no callback jwt, então retornamos true
        // O redirecionamento será feito com base no callbackUrl
        return true
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      // Permite que a aplicação redirecione para URLs relativas ou absolutas que começam com baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      // Permite callback URLs que começam com baseUrl
      if (url.startsWith(baseUrl)) {
        return url
      }

      return baseUrl
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false, // Disabled to prevent warnings
}

export default NextAuth(authOptions)
