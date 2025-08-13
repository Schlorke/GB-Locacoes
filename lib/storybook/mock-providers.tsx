import React, { createContext, ReactNode, useContext } from 'react'
import { mockUser } from './mock-data'

// Types
interface MockAuthContextType {
  user: typeof mockUser | null
  status: 'authenticated' | 'loading' | 'unauthenticated'
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

interface MockSidebarContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

// Auth Context
const MockAuthContext = createContext<MockAuthContextType | null>(null)

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const mockAuth: MockAuthContextType = {
    user: mockUser,
    status: 'authenticated',
    signIn: async () => console.log('Mock sign in'),
    signOut: async () => console.log('Mock sign out'),
  }

  return (
    <MockAuthContext.Provider value={mockAuth}>
      {children}
    </MockAuthContext.Provider>
  )
}

export const useMockAuth = () => {
  const context = useContext(MockAuthContext)
  if (!context) {
    throw new Error('useMockAuth must be used within MockAuthProvider')
  }
  return context
}

// Sidebar Context
const MockSidebarContext = createContext<MockSidebarContextType | null>(null)

export const MockSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const mockSidebar: MockSidebarContextType = {
    isOpen,
    setIsOpen,
    toggle: () => setIsOpen((prev) => !prev),
  }

  return (
    <MockSidebarContext.Provider value={mockSidebar}>
      {children}
    </MockSidebarContext.Provider>
  )
}

export const useMockSidebar = () => {
  const context = useContext(MockSidebarContext)
  if (!context) {
    throw new Error('useMockSidebar must be used within MockSidebarProvider')
  }
  return context
}

// Combined Providers
export const MockProvidersWrapper = ({ children }: { children: ReactNode }) => (
  <MockAuthProvider>
    <MockSidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    </MockSidebarProvider>
  </MockAuthProvider>
)
