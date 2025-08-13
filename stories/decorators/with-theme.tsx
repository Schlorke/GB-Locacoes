import type { Decorator } from '@storybook/react'
import { ThemeProvider } from '@/components/theme-provider'

export const withTheme: Decorator = (Story) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <div className="font-sans antialiased">
      <Story />
    </div>
  </ThemeProvider>
)
