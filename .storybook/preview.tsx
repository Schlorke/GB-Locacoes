import type { Preview } from '@storybook/react'
import '../app/globals.css'

// Mock NextAuth useSession for all stories
const NextAuthDecorator = (Story: any) => {
  // Mock the useSession hook globally
  const originalUseSession = require('next-auth/react').useSession

  // Override useSession to return mock data
  require('next-auth/react').useSession = () => ({
    data: {
      user: {
        id: 'mock-user-id',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'ADMIN',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: 'authenticated',
  })

  return <Story />
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: false,
    },
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Design System',
          'Foundations',
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
          'Admin',
        ],
      },
    },
  },
  decorators: [
    NextAuthDecorator,
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
      </div>
    ),
  ],
}

export default preview
