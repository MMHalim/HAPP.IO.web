'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const translations = {
  en: {
    // Navbar
    'nav.signin': 'Sign In',
    'nav.getStarted': 'Get Started',
    'nav.services': 'Services',
    'nav.whyUs': 'Why Us',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title.prefix': 'Building the Future with',
    'hero.title.suffix': 'Intelligent Software',
    'hero.subtitle': 'We craft cutting-edge web, mobile, and AI-powered solutions tailored to your vision. We also provide expert management for CRMs, system administration, and enterprise tools. Transform your business with next-generation technology and automation.',
    'hero.cta.start': 'Start Your Project',
    'hero.cta.explore': 'Explore Services',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'From full-stack development to AI integration, we offer end-to-end solutions.',
    'services.ai': 'AI & Machine Learning',
    'services.ai.desc': 'Integrate intelligent algorithms, predictive models, and data analysis into your business.',
    'services.automation': 'Automation & Chatbots',
    'services.automation.desc': 'Streamline operations with smart bots and automated workflows using LLMs.',
    'services.web': 'Web Development',
    'services.web.desc': 'Modern, high-performance websites built with React, Next.js, and modern frameworks.',
    'services.mobile': 'Mobile Apps',
    'services.mobile.desc': 'Native and cross-platform mobile applications for iOS and Android.',
    'services.cloud': 'Cloud Solutions',
    'services.cloud.desc': 'Scalable cloud infrastructure, serverless architecture, and DevOps.',
    'services.security': 'Security Audits',
    'services.security.desc': 'Comprehensive security analysis and vulnerability assessment for your systems.',
    'services.crm': 'CRM Solutions',
    'services.crm.desc': 'Expert implementation and management of Customer Relationship Management systems like Salesforce and HubSpot.',
    'services.sysadmin': 'System Administration',
    'services.sysadmin.desc': 'Professional server management, tool configuration, and enterprise software administration.',
    
    // Why Choose Us
    'why.title': 'Why Choose HAPP.IO?',
    'why.subtitle': 'We combine technical expertise with business acumen to deliver results.',
    'why.speed': 'Speed to Market',
    'why.speed.desc': 'We use modern agile methodologies to deliver your MVP faster without compromising quality.',
    'why.scalable': 'Scalable Architecture',
    'why.scalable.desc': 'Our solutions are built to grow with your business, handling millions of users effortlessly.',
    'why.ai': 'AI-First Approach',
    'why.ai.desc': 'We leverage the latest in AI to give your product a competitive edge.',
    
    // Workflow
    'workflow.title': 'Our Process',
    'workflow.subtitle': 'A streamlined approach to bring your vision to life.',
    'workflow.discovery': 'Discovery',
    'workflow.discovery.desc': 'We analyze your requirements and build a roadmap.',
    'workflow.design': 'Design',
    'workflow.design.desc': 'Creating intuitive and engaging user experiences.',
    'workflow.development': 'Development',
    'workflow.development.desc': 'Building robust and scalable solutions.',
    'workflow.launch': 'Launch',
    'workflow.launch.desc': 'Deploying your product and ensuring success.',
    
    // Frameworks
    'frameworks.title': 'Framework Integration',
    'frameworks.subtitle': 'Demonstrating the power of mixing Chakra UI, Ant Design, shadcn/ui, and daisyUI.',
    'frameworks.chakra': 'Component-based library with Emotion.',
    'frameworks.antd': 'Enterprise-class UI design language.',
    'frameworks.shadcn': 'Re-usable components built with Radix UI and Tailwind.',
    'frameworks.daisy': 'Tailwind CSS component library.',
    
    // Contact Form
    'contact.title': 'Start Your Project',
    'contact.subtitle': 'Tell us about your needs.',
    'contact.email': 'Email',
    'contact.name': 'Name',
    'contact.phone': 'Phone Number',
    'contact.details': 'Project Details',
    'contact.submit': 'Send Request',
    'contact.sending': 'Sending...',
    'contact.upload.photo': 'Upload Photo',
    'contact.upload.video': 'Upload Video',
    'contact.uploaded.photo': 'Photo Uploaded',
    'contact.uploaded.video': 'Video Uploaded',
    'contact.success.title': 'Request submitted.',
    'contact.success.description': "We've received your request and will get back to you soon.",
    'contact.error.title': 'Error.',
    'contact.error.description': 'Something went wrong. Please try again later.',
    'contact.upload.success.title': 'Upload successful',
    'contact.upload.success.description': 'file(s) uploaded.',
    'contact.upload.error.title': 'Upload failed',

    // Footer
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    // Navbar
    'nav.signin': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ الآن',
    'nav.services': 'خدماتنا',
    'nav.whyUs': 'لماذا نحن',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.title.prefix': 'بناء المستقبل مع',
    'hero.title.suffix': 'برمجيات ذكية',
    'hero.subtitle': 'نصمم حلولاً متطورة للويب والجوال والذكاء الاصطناعي مخصصة لرؤيتك. نقدم أيضاً خدمات إدارة أنظمة علاقات العملاء (CRM) وإدارة الأنظمة والأدوات المؤسسية. حوّل أعمالك بتقنيات الجيل القادم والأتمتة.',
    'hero.cta.start': 'ابدأ مشروعك',
    'hero.cta.explore': 'استكشف الخدمات',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'من التطوير الكامل إلى دمج الذكاء الاصطناعي، نقدم حلولاً شاملة.',
    'services.ai': 'الذكاء الاصطناعي والتعلم الآلي',
    'services.ai.desc': 'دمج الخوارزميات الذكية والنماذج التنبؤية وتحليل البيانات في أعمالك.',
    'services.automation': 'الأتمتة وروبوتات المحادثة',
    'services.automation.desc': 'تبسيط العمليات باستخدام الروبوتات الذكية وسير العمل المؤتمت باستخدام LLMs.',
    'services.web': 'تطوير الويب',
    'services.web.desc': 'مواقع حديثة وعالية الأداء مبنية باستخدام React و Next.js وأطر عمل حديثة.',
    'services.mobile': 'تطبيقات الجوال',
    'services.mobile.desc': 'تطبيقات جوال أصلية وعبر المنصات لنظامي iOS و Android.',
    'services.cloud': 'حلول سحابية',
    'services.cloud.desc': 'بنية تحتية سحابية قابلة للتوسع، وهندسة بدون خادم، و DevOps.',
    'services.security': 'تدقيق الأمان',
    'services.security.desc': 'تحليل شامل للأمان وتقييم الثغرات لأنظمتك.',
    'services.crm': 'حلول إدارة علاقات العملاء',
    'services.crm.desc': 'تنفيذ وإدارة احترافية لأنظمة علاقات العملاء مثل Salesforce و HubSpot.',
    'services.sysadmin': 'إدارة الأنظمة',
    'services.sysadmin.desc': 'إدارة الخوادم، تكوين الأدوات، وإدارة البرمجيات المؤسسية باحترافية.',
    
    // Why Choose Us
    'why.title': 'لماذا تختار HAPP.IO؟',
    'why.subtitle': 'نجمع بين الخبرة التقنية والفطنة التجارية لتحقيق النتائج.',
    'why.speed': 'سرعة الوصول للسوق',
    'why.speed.desc': 'نستخدم منهجيات أجايل الحديثة لتقديم منتجك الأولي بشكل أسرع دون المساومة على الجودة.',
    'why.scalable': 'بنية قابلة للتوسع',
    'why.scalable.desc': 'تم بناء حلولنا لتنمو مع أعمالك، وتتعامل مع ملايين المستخدمين بسهولة.',
    'why.ai': 'نهج الذكاء الاصطناعي أولاً',
    'why.ai.desc': 'نستفيد من أحدث تقنيات الذكاء الاصطناعي لمنح منتجك ميزة تنافسية.',
    
    // Workflow
    'workflow.title': 'طريقة عملنا',
    'workflow.subtitle': 'نهج مبسط لتحويل رؤيتك إلى واقع.',
    'workflow.discovery': 'الاكتشاف',
    'workflow.discovery.desc': 'نحلل متطلباتك ونبني خارطة طريق.',
    'workflow.design': 'التصميم',
    'workflow.design.desc': 'تصميم تجارب مستخدم بديهية وجذابة.',
    'workflow.development': 'التطوير',
    'workflow.development.desc': 'بناء حلول قوية وقابلة للتوسع.',
    'workflow.launch': 'الإطلاق',
    'workflow.launch.desc': 'نشر منتجك وضمان نجاحه.',
    
    // Frameworks
    'frameworks.title': 'تكامل أطر العمل',
    'frameworks.subtitle': 'استعراض قوة دمج Chakra UI و Ant Design و shadcn/ui و daisyUI.',
    'frameworks.chakra': 'مكتبة قائمة على المكونات مع Emotion.',
    'frameworks.antd': 'لغة تصميم واجهة مستخدم من فئة المؤسسات.',
    'frameworks.shadcn': 'مكونات قابلة لإعادة الاستخدام مبنية باستخدام Radix UI و Tailwind.',
    'frameworks.daisy': 'مكتبة مكونات Tailwind CSS.',
    
    // Contact Form
    'contact.title': 'ابدأ مشروعك',
    'contact.subtitle': 'أخبرنا عن احتياجاتك، أو دردش معنا مباشرة.',
    'contact.email': 'البريد الإلكتروني',
    'contact.name': 'الاسم',
    'contact.phone': 'رقم الهاتف',
    'contact.details': 'تفاصيل المشروع',
    'contact.submit': 'إرسال الطلب',
    'contact.sending': 'جاري الإرسال...',
    'contact.whatsapp': 'دردش على واتساب',
    'contact.upload.photo': 'تحميل صورة',
    'contact.upload.video': 'تحميل فيديو',
    'contact.uploaded.photo': 'تم تحميل الصورة',
    'contact.uploaded.video': 'تم تحميل الفيديو',
    'contact.success.title': 'تم إرسال الطلب.',
    'contact.success.description': 'لقد استلمنا طلبك وسنعود إليك قريبًا.',
    'contact.error.title': 'خطأ.',
    'contact.error.description': 'حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.',
    'contact.upload.success.title': 'تم التحميل بنجاح',
    'contact.upload.success.description': 'ملف(ات) تم تحميلها.',
    'contact.upload.error.title': 'فشل التحميل',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [dir, language])

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
