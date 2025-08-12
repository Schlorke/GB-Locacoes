import type { Preview } from '@storybook/react'
import '../app/globals.css'

// Import fonts exactly as in the app
import { Inter, Jost } from 'next/font/google'
import React from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: false,
})

const preview: Preview = {
  parameters: {
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
          name: 'gray-50',
          value: '#f8fafc',
        },
        {
          name: 'gray-900',
          value: '#111827',
        },
      ],
    },
    docs: {
      toc: true,
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  globalTypes: {
    reducedMotion: {
      description: 'Reduce animations for accessibility',
      defaultValue: false,
      toolbar: {
        title: 'Reduced Motion',
        icon: 'eye',
        items: [
          { value: false, title: 'Enable animations' },
          { value: true, title: 'Reduce motion' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const reducedMotion = context.globals.reducedMotion

      return React.createElement(
        'div',
        {
          className: `${inter.variable} ${jost.variable} min-h-screen`,
          style: {
            fontFamily: 'var(--font-inter), sans-serif',
          },
        },
        reducedMotion &&
          React.createElement(
            'style',
            {},
            `
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            `
          ),
        React.createElement(Story)
      )
    },
  ],
}

export default preview
