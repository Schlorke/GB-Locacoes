import type { Preview } from '@storybook/react'
import '../app/globals.css'
import { MockProvidersWrapper } from '../lib/storybook/mock-providers'

// Global Storybook decorator that provides all necessary context
const GlobalDecorator = (Story: any) => {
  // Set global flag to identify Storybook environment
  if (typeof window !== 'undefined') {
    ;(window as any).__STORYBOOK__ = true
  }

  return (
    <MockProvidersWrapper>
      <div className="font-sans antialiased">
        <Story />
      </div>
    </MockProvidersWrapper>
  )
}

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
      disable: false,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'alpha',
    },
    layout: 'centered',
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
            width: '1200px',
            height: '800px',
          },
        },
        wide: {
          name: 'Wide Screen',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'desktop',
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
          value: '#0f172a',
        },
        {
          name: 'gray',
          value: '#f8fafc',
        },
        {
          name: 'orange',
          value: '#fed7aa',
        },
      ],
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#storybook-docs',
        title: 'Table of Contents',
        disable: false,
      },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Design System',
          ['Overview', 'Colors', 'Typography', 'Icons'],
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
  decorators: [GlobalDecorator],
  tags: ['autodocs'],
}

export default preview
