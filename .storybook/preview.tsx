import type { Preview } from '@storybook/react'
import React from 'react'
import '../app/globals.css'

// Mock NextAuth useSession for all stories
const NextAuthDecorator = (Story: any) => {
  // Mock the useSession hook globally
  const originalUseSession = (globalThis as any).__nextAuth?.useSession

  // Override useSession to return mock data
  ;(globalThis as any).__nextAuth = {
    useSession: () => ({
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
    }),
  }

  return <Story />
}

// Mock SidebarProvider for components that need sidebar context
const SidebarProviderDecorator = (Story: any) => {
  // Mock the useSidebar hook
  const mockUseSidebar = {
    isOpen: false,
    setIsOpen: () => {},
    toggle: () => {},
  }

  // Override useSidebar to return mock data
  if (typeof window !== 'undefined') {
    ;(window as any).mockUseSidebar = mockUseSidebar
  }

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
    SidebarProviderDecorator,
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
      </div>
    ),
  ],
}

export default preview
