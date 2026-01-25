'use client'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useColorMode,
  useBreakpointValue,
  useDisclosure,
  Container,
  Switch,
  HStack,
  Image,
} from '@chakra-ui/react'
import { LOGO_URL } from '@/lib/constants'
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  const { language, toggleLanguage, t } = useLanguage()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box position="sticky" top={0} zIndex={10} bg={useColorModeValue('gray.50', 'gray.800')} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')}>
      <Container maxW="container.xl">
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">
            <Image
              src={LOGO_URL}
              alt="HAPP.IO"
              h="50px"
              w="auto"
              objectFit="contain"
              borderRadius="lg"
            />

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav t={t} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            align={'center'}
          >
            <HStack>
              <Text fontSize="sm" fontWeight={language === 'en' ? 'bold' : 'normal'}>EN</Text>
              <Switch
                isChecked={language === 'ar'}
                onChange={toggleLanguage}
                sx={{
                  '.chakra-switch__track[data-checked]': {
                    bg: '#38B2AC'
                  },
                  '.chakra-switch__thumb': {
                    bg: 'white'
                  }
                }}
              />
              <Text fontSize="sm" fontWeight={language === 'ar' ? 'bold' : 'normal'}>AR</Text>
            </HStack>

            <IconButton
              aria-label="Toggle Dark Mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              rounded="full"
            />


            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#319795'}
              href={'#contact'}
              _hover={{
                bg: '#2C7A7B',
              }}
            >
              {t('nav.getStarted')}
            </Button>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav t={t} />
        </Collapse>
      </Container>
    </Box>
  )
}

const DesktopNav = ({ t }: { t: (key: string) => string }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')

  return (
    <Stack direction={'row'} spacing={4} align="center">
      <Box>
        <Box
          as="a"
          p={2}
          href={'#services'}
          fontSize={'sm'}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
        >
          {t('nav.services')}
        </Box>
      </Box>
      <Box>
        <Box
          as="a"
          p={2}
          href={'#why-us'}
          fontSize={'sm'}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
        >
          {t('nav.whyUs')}
        </Box>
      </Box>
    </Stack>
  )
}

const MobileNav = ({ t }: { t: (key: string) => string }) => {
  return (
    <Stack bg={useColorModeValue('gray.50', 'gray.800')} p={4} display={{ md: 'none' }}>
      <Stack spacing={4}>
        <Box
          as="a"
          py={2}
          href={'#services'}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {t('nav.services')}
          </Text>
        </Box>
        <Box
          as="a"
          py={2}
          href={'#why-us'}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {t('nav.whyUs')}
          </Text>
        </Box>
      </Stack>
    </Stack>
  )
}


