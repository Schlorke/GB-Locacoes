import { ReactNode } from 'react'

// Mock components for Storybook environment
export const MockLink = ({
  children,
  href,
  ...props
}: {
  children: ReactNode
  href: string
  [key: string]: any
}) => {
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        e.preventDefault()
        console.log('Link clicked:', href)
      }}
    >
      {children}
    </a>
  )
}

export const MockImage = ({
  src,
  alt,
  width,
  height,
  priority,
  className,
  ...props
}: any) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        ...props.style,
      }}
      {...props}
    />
  )
}

// Mock hooks for components that use Next.js navigation
export const mockNextNavigation = {
  useRouter: () => ({
    push: (url: string) => console.log('Router push:', url),
    replace: (url: string) => console.log('Router replace:', url),
    back: () => console.log('Router back'),
    pathname: '/',
    query: {},
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}

export const NextRouterDecorator = (Story: any) => {
  return <Story />
}
