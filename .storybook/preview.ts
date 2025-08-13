import type { Preview } from '@storybook/react'
import '@/app/globals.css'
import { withTheme } from '@/stories/decorators/with-theme'
import { withSession } from '@/stories/decorators/with-session'
import { withRouter } from '@/stories/decorators/with-router'
import { withMSW } from '@/stories/decorators/with-msw'

const preview: Preview = {
  decorators: [withTheme, withSession, withRouter, withMSW],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: { appDirectory: true },
  },
  argTypes: {
    authState: {
      control: { type: 'radio' },
      options: ['authenticated', 'unauthenticated'],
    },
    userRole: {
      control: { type: 'radio' },
      options: ['ADMIN', 'CLIENT'],
    },
    pathname: { control: 'text' },
  },
}

export default preview
