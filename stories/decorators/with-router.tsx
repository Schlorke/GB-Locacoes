import type { Decorator } from '@storybook/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { createMockRouter } from 'next-router-mock'

interface RouterArgs {
  pathname?: string
  query?: Record<string, string | string[]>
}

export const withRouter: Decorator = (Story, context) => {
  const { pathname = '/', query = {} } = context.args as RouterArgs
  const router = createMockRouter({ pathname, query })

  return (
    <RouterContext.Provider value={router}>
      <Story />
    </RouterContext.Provider>
  )
}
