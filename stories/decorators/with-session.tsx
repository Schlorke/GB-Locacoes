import type { Decorator } from '@storybook/react'
import { SessionProvider } from 'next-auth/react'

interface SessionArgs {
  authState?: 'authenticated' | 'unauthenticated'
  userRole?: 'ADMIN' | 'CLIENT'
}

export const withSession: Decorator = (Story, context) => {
  const { authState = 'authenticated', userRole = 'ADMIN' } =
    context.args as SessionArgs

  const session =
    authState === 'authenticated'
      ? {
          user: {
            id: '1',
            name: 'Story User',
            email: 'user@example.com',
            role: userRole,
          },
          expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        }
      : null

  return (
    <SessionProvider session={session}>
      <Story />
    </SessionProvider>
  )
}
