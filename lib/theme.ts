import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props),
        transitionProperty: 'background-color',
        transitionDuration: '1.5s',
        transitionTimingFunction: 'ease-in-out',
        lineHeight: 'base',
      },
      // Apply smooth transition to all elements for color changes
      '*, *::before, *::after': {
        transitionProperty: 'background-color, border-color, color, fill, stroke, box-shadow',
        transitionDuration: '1.5s', // Slower transition for smooth effect
        transitionTimingFunction: 'ease-in-out',
      },
    }),
  },
})

export default theme
