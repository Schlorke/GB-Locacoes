import { initialize, mswDecorator } from 'msw-storybook-addon'

initialize({ onUnhandledRequest: 'bypass' })

export const withMSW = mswDecorator
