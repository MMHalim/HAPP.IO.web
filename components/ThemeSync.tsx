'use client'

import { useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'

export function ThemeSync() {
  const { colorMode } = useColorMode()

  useEffect(() => {
    const root = document.documentElement
    if (colorMode === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
  }, [colorMode])

  return null
}
