'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeSync } from '@/components/ThemeSync'
import theme from '@/lib/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <LanguageProvider>
          <ThemeSync />
          {children}
        </LanguageProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
