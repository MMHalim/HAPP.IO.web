'use client'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Heading,
  Text,
  Container,
  Icon,
  HStack,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaPaperPlane, FaCamera, FaVideo } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'
import { supabase } from '@/lib/supabase'

export default function ContactForm() {
  const { t, language } = useLanguage()
  const borderColor = useColorModeValue('gray.200', 'white')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
    photoUrls: [] as string[],
    videoUrls: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video') => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (type === 'photo') setIsUploadingPhoto(true)
    else setIsUploadingVideo(true)

    try {
      const uploadedUrls: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
        
        const { error } = await supabase.storage.from('imgs').upload(filePath, file)
        
        if (error) throw error
        
        const { data } = supabase.storage.from('imgs').getPublicUrl(filePath)
        uploadedUrls.push(data.publicUrl)
      }
      
      setFormData(prev => ({
        ...prev,
        [type === 'photo' ? 'photoUrls' : 'videoUrls']: [
          ...prev[type === 'photo' ? 'photoUrls' : 'videoUrls'],
          ...uploadedUrls
        ]
      }))
      
      toast({
        title: t('contact.upload.success.title'),
        description: `${uploadedUrls.length} ${t('contact.upload.success.description')}`,
        status: 'success',
        duration: 3000,
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: t('contact.upload.error.title'),
        description: error.message || t('contact.error.description'),
        status: 'error',
        duration: 5000,
      })
    } finally {
      if (type === 'photo') setIsUploadingPhoto(false)
      else setIsUploadingVideo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit request')
      }

      toast({
        duration: 5000,
        isClosable: true,
        render: ({ onClose }) => (
          <Alert
            status="success"
            variant="solid"
            borderRadius="md"
            alignItems="start"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <AlertIcon />
            <Box
              flex="1"
              mr={language === 'ar' ? 2 : 0}
              ml={language === 'ar' ? 0 : 2}
              pl={language === 'ar' ? 8 : 0}
              pr={language === 'ar' ? 0 : 8}
            >
              <AlertTitle>{t('contact.success.title')}</AlertTitle>
              <AlertDescription>{t('contact.success.description')}</AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              top={2}
              right={language === 'ar' ? 'unset' : 2}
              left={language === 'ar' ? 2 : 'unset'}
              onClick={onClose}
            />
          </Alert>
        ),
      })
      setFormData({ name: '', email: '', phone: '', details: '', photoUrls: [], videoUrls: [] })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        duration: 5000,
        isClosable: true,
        render: ({ onClose }) => (
          <Alert
            status="error"
            variant="solid"
            borderRadius="md"
            alignItems="start"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <AlertIcon />
            <Box
              flex="1"
              mr={language === 'ar' ? 2 : 0}
              ml={language === 'ar' ? 0 : 2}
              pl={language === 'ar' ? 8 : 0}
              pr={language === 'ar' ? 0 : 8}
            >
              <AlertTitle>{t('contact.error.title')}</AlertTitle>
              <AlertDescription>{error.message || t('contact.error.description')}</AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              top={2}
              right={language === 'ar' ? 'unset' : 2}
              left={language === 'ar' ? 2 : 'unset'}
              onClick={onClose}
            />
          </Alert>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Box id="contact" py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              {t('contact.title')}
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              {t('contact.subtitle')}
            </Text>

          </Box>

          <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="xl" shadow="lg">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>{t('contact.name')}</FormLabel>
                  <Input
                    borderColor={borderColor}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.name')}
                  />
                </FormControl>

                <FormControl isRequired>  
                  <FormLabel>{t('contact.email')}</FormLabel>
                  <Input
                    borderColor={borderColor}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t('contact.phone')}</FormLabel>
                  <Input
                    borderColor={borderColor}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>{t('contact.details')}</FormLabel>
                  <Textarea
                    borderColor={borderColor}
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder={t('contact.details')}
                    rows={6}
                  />
                </FormControl>

                <HStack spacing={4} width="full" justify="flex-start">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={photoInputRef}
                    onChange={(e) => handleFileUpload(e, 'photo')}
                    style={{ display: 'none' }}
                  />
                  <Button
                    leftIcon={isUploadingPhoto ? <Spinner size="xs" /> : <Icon as={FaCamera} />}
                    onClick={() => photoInputRef.current?.click()}
                    isDisabled={isUploadingPhoto}
                    colorScheme={formData.photoUrls.length > 0 ? 'green' : 'gray'}
                    variant="outline"
                    size="sm"
                  >
                    {formData.photoUrls.length > 0 ? `${formData.photoUrls.length} ${t('contact.uploaded.photo')}` : t('contact.upload.photo')}
                  </Button>

                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    ref={videoInputRef}
                    onChange={(e) => handleFileUpload(e, 'video')}
                    style={{ display: 'none' }}
                  />
                  <Button
                    leftIcon={isUploadingVideo ? <Spinner size="xs" /> : <Icon as={FaVideo} />}
                    onClick={() => videoInputRef.current?.click()}
                    isDisabled={isUploadingVideo}
                    colorScheme={formData.videoUrls.length > 0 ? 'green' : 'gray'}
                    variant="outline"
                    size="sm"
                  >
                    {formData.videoUrls.length > 0 ? `${formData.videoUrls.length} ${t('contact.uploaded.video')}` : t('contact.upload.video')}
                  </Button>
                </HStack>

                <Button
                  type="submit"
                  bg="#319795"
                  color="white"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  isDisabled={isUploadingPhoto || isUploadingVideo}
                  loadingText={t('contact.sending')}
                  leftIcon={<Icon as={FaPaperPlane} />}
                  _hover={{
                    bg: '#2C7A7B',
                  }}
                >
                  {isUploadingPhoto || isUploadingVideo ? 'Uploading files...' : t('contact.submit')}
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
