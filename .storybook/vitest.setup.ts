import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import React from 'react'
import * as projectAnnotations from './preview'

// Mock Next.js navigation
const mockPathname = '/admin/dashboard'

// Mock usePathname
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    return React.createElement('img', { src, alt, ...props })
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock Lucide icons with dynamic handling
vi.mock('lucide-react', () => {
  const MockIcon = ({ className, ...props }: any) => {
    return React.createElement('svg', {
      className,
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...props,
    })
  }

  // Create a proxy that returns MockIcon for any icon name
  return new Proxy(
    {},
    {
      get(target, prop) {
        return MockIcon
      },
    }
  )
})

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) =>
      React.createElement('div', props, children),
    span: ({ children, ...props }: any) =>
      React.createElement('span', props, children),
    button: ({ children, ...props }: any) =>
      React.createElement('button', props, children),
    img: ({ ...props }: any) => React.createElement('img', props),
    section: ({ children, ...props }: any) =>
      React.createElement('section', props, children),
    article: ({ children, ...props }: any) =>
      React.createElement('article', props, children),
    header: ({ children, ...props }: any) =>
      React.createElement('header', props, children),
    footer: ({ children, ...props }: any) =>
      React.createElement('footer', props, children),
    nav: ({ children, ...props }: any) =>
      React.createElement('nav', props, children),
    ul: ({ children, ...props }: any) =>
      React.createElement('ul', props, children),
    li: ({ children, ...props }: any) =>
      React.createElement('li', props, children),
    a: ({ children, ...props }: any) =>
      React.createElement('a', props, children),
    p: ({ children, ...props }: any) =>
      React.createElement('p', props, children),
    h1: ({ children, ...props }: any) =>
      React.createElement('h1', props, children),
    h2: ({ children, ...props }: any) =>
      React.createElement('h2', props, children),
    h3: ({ children, ...props }: any) =>
      React.createElement('h3', props, children),
    h4: ({ children, ...props }: any) =>
      React.createElement('h4', props, children),
    h5: ({ children, ...props }: any) =>
      React.createElement('h5', props, children),
    h6: ({ children, ...props }: any) =>
      React.createElement('h6', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        image: '/placeholder.jpg',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: 'authenticated',
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn(),
  getProviders: vi.fn(),
  getCsrfToken: vi.fn(),
  SessionProvider: ({ children }: any) => children,
}))

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
