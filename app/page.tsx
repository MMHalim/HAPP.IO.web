'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Flex,
  VStack,
  HStack,
  Image,
} from '@chakra-ui/react'
import { LOGO_URL } from '@/lib/constants'
import { FaCode, FaMobile, FaDesktop, FaDatabase, FaCloud, FaLock, FaRobot, FaBrain, FaRocket, FaCogs, FaBolt, FaCheck, FaStar, FaHeart, FaShieldAlt,
  FaUsers,
  FaTools,
  FaSearch,
  FaPaintBrush
} from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import { Button as AntButton, ConfigProvider, theme } from 'antd'
import { Button as ShadButton } from '@/components/ui/button'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-50%"
          left="-50%"
          w="200%"
          h="200%"
          bgGradient="radial(blue.100 0%, transparent 50%)"
          opacity={0.4}
          zIndex={0}
          display={useColorModeValue('block', 'none')}
        />
        <Container maxW={'5xl'} position="relative" zIndex={1}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={800}
              fontSize={{ base: '3xl', sm: '5xl', md: '7xl' }}
              lineHeight={'110%'}
              letterSpacing="tight"
              color={useColorModeValue('#10202D', 'white')}
            >
              {t('hero.title.prefix')} <br />
              <Text as={'span'} bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
                {t('hero.title.suffix')}
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'lg', md: '2xl' }} maxW="3xl" mx="auto">
              {t('hero.subtitle')}
            </Text>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
            >
              <Button
                as="a"
                href="#contact"
                bg={'#319795'}
                color={'white'}
                rounded={'full'}
                px={8}
                size="lg"
                fontWeight="bold"
                _hover={{
                  bg: '#2C7A7B',
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }}
              >
                {t('hero.cta.start')}
              </Button>
              <Button
                as="a"
                href="#services"
                variant="outline"
                colorScheme="blue"
                rounded={'full'}
                px={8}
                size="lg"
                fontWeight="bold"
                leftIcon={<Icon as={FaRocket} />}
              >
                {t('hero.cta.explore')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Services Section */}
      <Box id="services" p={4} py={20} position="relative" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color={useColorModeValue('#10202D', 'white')}>{t('services.title')}</Heading>
            <Text color={'gray.600'} fontSize={{ base: 'lg', md: 'xl' }}>
              {t('services.subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <ServiceCard
              icon={<Icon as={FaRobot} w={10} h={10} />}
              title={t('services.ai')}
              text={t('services.ai.desc')}
              color="purple.500"
            />
            <ServiceCard
              icon={<Icon as={FaBrain} w={10} h={10} />}
              title={t('services.automation')}
              text={t('services.automation.desc')}
              color="cyan.500"
            />
            <ServiceCard
              icon={<Icon as={FaCode} w={10} h={10} />}
              title={t('services.web')}
              text={t('services.web.desc')}
              color="blue.500"
            />
            <ServiceCard
              icon={<Icon as={FaMobile} w={10} h={10} />}
              title={t('services.mobile')}
              text={t('services.mobile.desc')}
              color="green.500"
            />
            <ServiceCard
              icon={<Icon as={FaCloud} w={10} h={10} />}
              title={t('services.cloud')}
              text={t('services.cloud.desc')}
              color="orange.500"
            />
            <ServiceCard
              icon={<Icon as={FaLock} w={10} h={10} />}
              title={t('services.security')}
              text={t('services.security.desc')}
              color="red.500"
            />
            <ServiceCard
              icon={<Icon as={FaUsers} w={10} h={10} />}
              title={t('services.crm')}
              text={t('services.crm.desc')}
              color="pink.500"
            />
            <ServiceCard
              icon={<Icon as={FaTools} w={10} h={10} />}
              title={t('services.sysadmin')}
              text={t('services.sysadmin.desc')}
              color="teal.500"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box id="why-us" py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color={useColorModeValue('#10202D', 'white')}>{t('why.title')}</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              {t('why.subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FaRocket} w={8} h={8} />}
              title={t('why.speed')}
              text={t('why.speed.desc')}
              color="blue.500"
            />
            <Feature
              icon={<Icon as={FaCogs} w={8} h={8} />}
              title={t('why.scalable')}
              text={t('why.scalable.desc')}
              color="purple.500"
            />
            <Feature
              icon={<Icon as={FaBrain} w={8} h={8} />}
              title={t('why.ai')}
              text={t('why.ai.desc')}
              color="green.500"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Workflow Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color={useColorModeValue('#10202D', 'white')}>{t('workflow.title')}</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize={'xl'}>
              {t('workflow.subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <WorkflowFeature
              index={0}
              icon={<Icon as={FaSearch} w={10} h={10} />}
              title={t('workflow.discovery')}
              text={t('workflow.discovery.desc')}
              color="blue.500"
            />
            <WorkflowFeature
              index={1}
              icon={<Icon as={FaPaintBrush} w={10} h={10} />}
              title={t('workflow.design')}
              text={t('workflow.design.desc')}
              color="purple.500"
            />
            <WorkflowFeature
              index={2}
              icon={<Icon as={FaCode} w={10} h={10} />}
              title={t('workflow.development')}
              text={t('workflow.development.desc')}
              color="green.500"
            />
            <WorkflowFeature
              index={3}
              icon={<Icon as={FaRocket} w={10} h={10} />}
              title={t('workflow.launch')}
              text={t('workflow.launch.desc')}
              color="orange.500"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Framework Mix Showcase */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color={useColorModeValue('#10202D', 'white')}>{t('frameworks.title')}</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize={'xl'}>
              {t('frameworks.subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {/* Chakra UI Card */}
            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'lg'}
              p={8}
              rounded={'xl'}
              align={'center'}
              spacing={4}
            >
              <Heading size="md">Chakra UI</Heading>
              <Text textAlign="center" fontSize="sm">{t('frameworks.chakra')}</Text>
              <Button colorScheme="teal" size="lg">
                Chakra Button
              </Button>
              <HStack spacing={4} pt={2}>
                <Icon as={FaBolt} w={5} h={5} color="teal.500" />
                <Icon as={FaStar} w={5} h={5} color="teal.500" />
                <Icon as={FaCheck} w={5} h={5} color="teal.500" />
              </HStack>
            </Stack>

            {/* Ant Design Card */}
            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'lg'}
              p={8}
              rounded={'xl'}
              align={'center'}
              spacing={4}
            >
              <Heading size="md">Ant Design</Heading>
              <Text textAlign="center" fontSize="sm">{t('frameworks.antd')}</Text>
              <ConfigProvider theme={{
                token: { colorPrimary: '#1677ff' },
                algorithm: useColorModeValue(theme.defaultAlgorithm, theme.darkAlgorithm)
              }}>
                <AntButton type="primary" size="large">
                  Ant Design Button
                </AntButton>
              </ConfigProvider>
              <HStack spacing={4} pt={2}>
                <Icon as={FaShieldAlt} w={5} h={5} color="blue.500" />
                <Icon as={FaDatabase} w={5} h={5} color="blue.500" />
                <Icon as={FaDesktop} w={5} h={5} color="blue.500" />
              </HStack>
            </Stack>

            {/* shadcn/ui Card */}
            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'lg'}
              p={8}
              rounded={'xl'}
              align={'center'}
              spacing={4}
            >
              <Heading size="md">shadcn/ui</Heading>
              <Text textAlign="center" fontSize="sm">{t('frameworks.shadcn')}</Text>
              <ShadButton variant="default" size="lg">
                shadcn Button
              </ShadButton>
              <HStack spacing={4} pt={2}>
                <Icon as={FaCode} w={5} h={5} className="text-zinc-900 dark:text-zinc-100" />
                <Icon as={FaRocket} w={5} h={5} className="text-zinc-900 dark:text-zinc-100" />
                <Icon as={FaLock} w={5} h={5} className="text-zinc-900 dark:text-zinc-100" />
              </HStack>
            </Stack>

            {/* daisyUI Card */}
            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'lg'}
              p={8}
              rounded={'xl'}
              align={'center'}
              spacing={4}
            >
              <Heading size="md">daisyUI</Heading>
              <Text textAlign="center" fontSize="sm">{t('frameworks.daisy')}</Text>
              <button className="btn btn-primary btn-lg">
                daisyUI Button
              </button>
              <HStack spacing={4} pt={2}>
                <Icon as={FaHeart} w={5} h={5} className="text-primary" />
                <Icon as={FaCloud} w={5} h={5} className="text-primary" />
                <Icon as={FaMobile} w={5} h={5} className="text-primary" />
              </HStack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>


      {/* Contact Section */}
      <ContactForm />
      
      {/* Footer */}
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <HStack spacing={2}>
            <Text>© {new Date().getFullYear()}</Text>
            <Image src={LOGO_URL} alt="HAPP.IO" h="30px" objectFit="contain" borderRadius="md" />
            <Text> {t('footer.rights')}</Text>
          </HStack>
        </Container>
      </Box>
    </>
  )
}

interface FeatureProps {
  title: string
  text: string
  icon: React.ReactElement
  color?: string
}

const ServiceCard = ({ title, text, icon, color }: FeatureProps) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={6}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
    >
      <Flex
        w={14}
        h={14}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={color || 'blue.500'}
        mb={4}
      >
        {icon}
      </Flex>
      <Heading size="md" mb={2} textAlign="center">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="center" fontSize="sm">{text}</Text>
    </Stack>
  )
}

const WorkflowFeature = ({ title, text, icon, index, color }: FeatureProps & { index: number }) => {
  const showDividerMd = index % 2 === 0
  const showDividerLg = index < 3
  const defaultBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box position="relative" h="full">
      <Stack align={'center'} textAlign={'center'} h="full">
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={color || defaultBg}
          mb={1}
        >
          {icon}
        </Flex>
        <Heading size="md" fontWeight="bold" mb={2}>{title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
      </Stack>
      <Box
        position="absolute"
        right={{ base: 0, md: '-20px' }}
        top="10%"
        bottom="10%"
        width="1px"
        bg="#38B2AC"
        display={{
          base: 'none',
          md: showDividerMd ? 'block' : 'none',
          lg: showDividerLg ? 'block' : 'none'
        }}
      />
    </Box>
  )
}

const Feature = ({ title, text, icon, color }: FeatureProps) => {
  const defaultBg = useColorModeValue('gray.100', 'gray.700')
  return (
    <Stack align={'center'} textAlign={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={color || defaultBg}
        mb={1}
      >
        {icon}
      </Flex>
      <Heading size="md" fontWeight="bold" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  )
}
