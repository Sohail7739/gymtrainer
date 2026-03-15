'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface LanguageContextType {
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login / Register',
    
    // Hero
    'hero.title': 'Transform Your Body with',
    'hero.subtitle': 'Rayaan Fitness',
    'hero.description': 'Professional personal training and nutrition coaching in Saudi Arabia. Get personalized workout plans and meal guidance tailored just for you.',
    'hero.getStarted': 'Get Started Today',
    'hero.watchDemo': 'Watch Demo',
    'hero.happyClients': 'Happy Clients',
    'hero.yearsExperience': 'Years Experience',
    'hero.support': 'Support',
    
    // Features
    'features.title': 'Complete Fitness Solution',
    'features.subtitle': 'Everything you need to achieve your fitness goals in one comprehensive platform',
    'features.personalTraining': 'Personal Training',
    'features.personalTrainingDesc': 'Customized workout plans designed specifically for your fitness goals and current level.',
    'features.nutritionCoaching': 'Nutrition Coaching',
    'features.nutritionCoachingDesc': 'Personalized meal plans and nutrition guidance to fuel your body properly.',
    'features.clientManagement': 'Client Management',
    'features.clientManagementDesc': 'Track your progress and communicate directly with your trainer through our platform.',
    'features.flexibleScheduling': 'Flexible Scheduling',
    'features.flexibleSchedulingDesc': 'Book sessions at times that work best for your busy lifestyle.',
    'features.goalTracking': 'Goal Tracking',
    'features.goalTrackingDesc': 'Monitor your progress with detailed analytics and milestone celebrations.',
    'features.wellnessSupport': 'Wellness Support',
    'features.wellnessSupportDesc': 'Holistic approach to health including mental wellness and lifestyle coaching.',
    
    // About
    'about.title': 'Meet Rayaan',
    'about.subtitle': 'Your Fitness Coach',
    'about.description1': 'With over 5 years of experience in the fitness industry, Rayaan has helped hundreds of clients achieve their health and fitness goals. Based in Saudi Arabia, he combines modern training techniques with personalized nutrition coaching to deliver exceptional results.',
    'about.description2': 'Whether you\'re looking to lose weight, build muscle, or improve your overall health, Rayaan\'s expertise and dedication will guide you every step of the way.',
    'about.certifiedTrainer': 'Certified Personal Trainer',
    'about.successfulTransformations': 'Successful Transformations',
    'about.yearsExperience': 'Years Experience',
    'about.fiveStarRated': '5-Star Rated Trainer',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to start your fitness journey? Contact Rayaan today to schedule your consultation.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.hours': 'Hours',
    'contact.readyToTransform': 'Ready to Transform?',
    'contact.joinClients': 'Join hundreds of satisfied clients who have achieved their fitness goals with Rayaan\'s guidance.',
    'contact.startJourney': 'Start Your Journey',
    
    // Auth Modal
    'auth.welcomeBack': 'Welcome Back',
    'auth.joinRayaan': 'Join Rayaan Fitness',
    'auth.fullName': 'Full Name',
    'auth.emailAddress': 'Email Address',
    'auth.password': 'Password',
    'auth.phoneNumber': 'Phone Number',
    'auth.age': 'Age',
    'auth.weight': 'Weight (kg)',
    'auth.height': 'Height (cm)',
    'auth.fitnessGoals': 'Fitness Goals',
    'auth.signIn': 'Sign In',
    'auth.createAccount': 'Create Account',
    'auth.noAccount': 'Don\'t have an account? Sign up',
    'auth.haveAccount': 'Already have an account? Sign in',
    'auth.loginAsTrainer': 'Login as Trainer (Rayaan)',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.trainer': 'Trainer',
    'dashboard.client': 'Client',
    'dashboard.logout': 'Logout',
    'dashboard.overview': 'Overview',
    'dashboard.workouts': 'Workouts',
    'dashboard.nutrition': 'Nutrition',
    'dashboard.schedule': 'Schedule',
    'dashboard.clients': 'Clients',
    'dashboard.totalWorkouts': 'Total Workouts',
    'dashboard.nutritionPlans': 'Nutrition Plans',
    'dashboard.daysActive': 'Days Active',
    'dashboard.progress': 'Progress',
    'dashboard.recentWorkouts': 'Recent Workouts',
    'dashboard.nutritionPlan': 'Nutrition Plan',
    'dashboard.minutes': 'minutes',
    'dashboard.calories': 'calories',
    'dashboard.noWorkoutsYet': 'No workouts assigned yet',
    'dashboard.trainerWillAssign': 'Your trainer will assign personalized workouts soon',
    'dashboard.noNutritionYet': 'No nutrition plan assigned yet',
    'dashboard.trainerWillCreate': 'Your trainer will create personalized nutrition plans',
    
    // Trainer Dashboard
    'trainer.totalClients': 'Total Clients',
    'trainer.activeWorkouts': 'Active Workouts',
    'trainer.nutritionPlans': 'Nutrition Plans',
    'trainer.successRate': 'Success Rate',
    'trainer.recentClients': 'Recent Clients',
    'trainer.quickActions': 'Quick Actions',
    'trainer.manageClients': 'Manage Clients',
    'trainer.createWorkout': 'Create Workout',
    'trainer.designNutrition': 'Design Nutrition Plan',
    'trainer.clientManagement': 'Client Management',
    'trainer.noClientsYet': 'No Clients Yet',
    'trainer.buildClientBase': 'Start building your client base! Clients will appear here when they register.',
    'trainer.shareRegistration': 'Share your registration link with potential clients to get started!',
    
    // Client Dashboard
    'client.totalWorkouts': 'Total Workouts',
    'client.nutritionPlans': 'Nutrition Plans',
    'client.daysActive': 'Days Active',
    'client.progress': 'Progress',
    'client.recentWorkouts': 'Recent Workouts',
    'client.nutritionPlan': 'Nutrition Plan',
    'client.noWorkouts': 'No workouts assigned yet',
    'client.noNutrition': 'No nutrition plan assigned yet',
    'client.myWorkouts': 'My Workouts',
    'client.startWorkout': 'Start Workout',
    'client.noWorkoutsYet': 'No Workouts Yet',
    'client.trainerWillAssign': 'Your trainer will assign workouts soon!',
    'client.nutritionPlansTitle': 'Nutrition Plans',
    'client.viewDetails': 'View Details',
    'client.noNutritionYet': 'No Nutrition Plans Yet',
    'client.trainerWillCreate': 'Your trainer will create nutrition plans for you!',
    'client.scheduleTitle': 'Schedule',
    'client.scheduleSoon': 'Schedule Coming Soon',
    'client.bookingSystem': 'Booking system will be available soon!',
    
    // Additional Trainer Dashboard
    'trainer.workoutManagement': 'Workout Management',
    'trainer.nutritionManagement': 'Nutrition Management',
    'trainer.noClients': 'No Clients Yet',
    'trainer.clientsWillAppear': 'Clients will appear here when they register!',
    'trainer.noWorkoutsCreated': 'No Workouts Created',
    'trainer.createWorkoutsForClients': 'Create workouts for your clients!',
    'trainer.noNutritionPlans': 'No Nutrition Plans',
    'trainer.createNutritionForClients': 'Create nutrition plans for your clients!',
  },
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'عن ريان',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول / التسجيل',
    
    // Hero
    'hero.title': 'حول جسمك مع',
    'hero.subtitle': 'ريان فيتنس',
    'hero.description': 'تدريب شخصي محترف وتدريب تغذية في المملكة العربية السعودية. احصل على خطط تمارين مخصصة وإرشادات وجبات مصممة خصيصاً لك.',
    'hero.getStarted': 'ابدأ اليوم',
    'hero.watchDemo': 'شاهد العرض',
    'hero.happyClients': 'عميل سعيد',
    'hero.yearsExperience': 'سنوات خبرة',
    'hero.support': 'دعم',
    
    // Features
    'features.title': 'حل اللياقة الشامل',
    'features.subtitle': 'كل ما تحتاجه لتحقيق أهداف اللياقة البدنية في منصة شاملة واحدة',
    'features.personalTraining': 'التدريب الشخصي',
    'features.personalTrainingDesc': 'خطط تمارين مخصصة مصممة خصيصاً لأهداف اللياقة البدنية ومستواك الحالي.',
    'features.nutritionCoaching': 'تدريب التغذية',
    'features.nutritionCoachingDesc': 'خطط وجبات مخصصة وإرشادات تغذية لتغذية جسمك بشكل صحيح.',
    'features.clientManagement': 'إدارة العملاء',
    'features.clientManagementDesc': 'تتبع تقدمك وتواصل مباشرة مع مدربك من خلال منصتنا.',
    'features.flexibleScheduling': 'جدولة مرنة',
    'features.flexibleSchedulingDesc': 'احجز الجلسات في الأوقات التي تناسب نمط حياتك المزدحم.',
    'features.goalTracking': 'تتبع الأهداف',
    'features.goalTrackingDesc': 'راقب تقدمك مع التحليلات التفصيلية والاحتفال بالإنجازات.',
    'features.wellnessSupport': 'دعم العافية',
    'features.wellnessSupportDesc': 'نهج شامل للصحة يشمل العافية النفسية وتدريب نمط الحياة.',
    
    // About
    'about.title': 'تعرف على ريان',
    'about.subtitle': 'مدرب اللياقة البدنية',
    'about.description1': 'مع أكثر من 5 سنوات من الخبرة في صناعة اللياقة البدنية، ساعد ريان مئات العملاء على تحقيق أهداف الصحة واللياقة البدنية. يقع في المملكة العربية السعودية، يجمع بين تقنيات التدريب الحديثة وتدريب التغذية المخصص لتحقيق نتائج استثنائية.',
    'about.description2': 'سواء كنت تتطلع إلى فقدان الوزن أو بناء العضلات أو تحسين صحتك العامة، فإن خبرة ريان وتفانيه سيرشدانك في كل خطوة على الطريق.',
    'about.certifiedTrainer': 'مدرب شخصي معتمد',
    'about.successfulTransformations': 'تحولات ناجحة',
    'about.yearsExperience': 'سنوات خبرة',
    'about.fiveStarRated': 'مدرب بتقييم 5 نجوم',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'مستعد لبدء رحلة اللياقة البدنية؟ اتصل بريان اليوم لجدولة استشارتك.',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.hours': 'ساعات العمل',
    'contact.readyToTransform': 'مستعد للتحول؟',
    'contact.joinClients': 'انضم إلى مئات العملاء الراضين الذين حققوا أهداف اللياقة البدنية بتوجيه من ريان.',
    'contact.startJourney': 'ابدأ رحلتك',
    
    // Auth Modal
    'auth.welcomeBack': 'مرحباً بعودتك',
    'auth.joinRayaan': 'انضم إلى ريان فيتنس',
    'auth.fullName': 'الاسم الكامل',
    'auth.emailAddress': 'عنوان البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.phoneNumber': 'رقم الهاتف',
    'auth.age': 'العمر',
    'auth.weight': 'الوزن (كيلو)',
    'auth.height': 'الطول (سم)',
    'auth.fitnessGoals': 'أهداف اللياقة البدنية',
    'auth.signIn': 'تسجيل الدخول',
    'auth.createAccount': 'إنشاء حساب',
    'auth.noAccount': 'ليس لديك حساب؟ سجل الآن',
    'auth.haveAccount': 'لديك حساب بالفعل؟ سجل الدخول',
    'auth.loginAsTrainer': 'تسجيل الدخول كمدرب (ريان)',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.trainer': 'مدرب',
    'dashboard.client': 'عميل',
    'dashboard.logout': 'تسجيل الخروج',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.workouts': 'التمارين',
    'dashboard.nutrition': 'التغذية',
    'dashboard.schedule': 'الجدول',
    'dashboard.clients': 'العملاء',
    'dashboard.totalWorkouts': 'إجمالي التمارين',
    'dashboard.nutritionPlans': 'خطط التغذية',
    'dashboard.daysActive': 'أيام النشاط',
    'dashboard.progress': 'التقدم',
    'dashboard.recentWorkouts': 'التمارين الأخيرة',
    'dashboard.nutritionPlan': 'خطة التغذية',
    'dashboard.minutes': 'دقيقة',
    'dashboard.calories': 'سعرة حرارية',
    'dashboard.noWorkoutsYet': 'لم يتم تعيين تمارين بعد',
    'dashboard.trainerWillAssign': 'سيقوم مدربك بتعيين التمارين المخصصة قريباً',
    'dashboard.noNutritionYet': 'لم يتم تعيين خطة تغذية بعد',
    'dashboard.trainerWillCreate': 'سيقوم مدربك بإنشاء خطط التغذية المخصصة',
    
    // Trainer Dashboard
    'trainer.totalClients': 'إجمالي العملاء',
    'trainer.activeWorkouts': 'التمارين النشطة',
    'trainer.nutritionPlans': 'خطط التغذية',
    'trainer.successRate': 'معدل النجاح',
    'trainer.recentClients': 'العملاء الأخيرون',
    'trainer.quickActions': 'إجراءات سريعة',
    'trainer.manageClients': 'إدارة العملاء',
    'trainer.createWorkout': 'إنشاء تمرين',
    'trainer.designNutrition': 'تصميم خطة التغذية',
    'trainer.clientManagement': 'إدارة العملاء',
    'trainer.noClientsYet': 'لا يوجد عملاء بعد',
    'trainer.buildClientBase': 'ابدأ ببناء قاعدة عملائك! سيظهر العملاء هنا عند التسجيل.',
    'trainer.shareRegistration': 'شارك رابط التسجيل مع العملاء المحتملين للبدء!',
    
    // Client Dashboard
    'client.totalWorkouts': 'إجمالي التمارين',
    'client.nutritionPlans': 'خطط التغذية',
    'client.daysActive': 'أيام النشاط',
    'client.progress': 'التقدم',
    'client.recentWorkouts': 'التمارين الأخيرة',
    'client.nutritionPlan': 'خطة التغذية',
    'client.noWorkouts': 'لم يتم تعيين تمارين بعد',
    'client.noNutrition': 'لم يتم تعيين خطة تغذية بعد',
    'client.myWorkouts': 'تماريني',
    'client.startWorkout': 'ابدأ التمرين',
    'client.noWorkoutsYet': 'لا توجد تمارين بعد',
    'client.trainerWillAssign': 'سيقوم مدربك بتعيين التمارين قريباً!',
    'client.nutritionPlansTitle': 'خطط التغذية',
    'client.viewDetails': 'عرض التفاصيل',
    'client.noNutritionYet': 'لا توجد خطط تغذية بعد',
    'client.trainerWillCreate': 'سيقوم مدربك بإنشاء خطط التغذية لك!',
    'client.scheduleTitle': 'الجدول',
    'client.scheduleSoon': 'الجدول قريباً',
    'client.bookingSystem': 'نظام الحجز سيكون متاحاً قريباً!',
    
    // Additional Trainer Dashboard
    'trainer.workoutManagement': 'إدارة التمارين',
    'trainer.nutritionManagement': 'إدارة التغذية',
    'trainer.noClients': 'لا يوجد عملاء بعد',
    'trainer.clientsWillAppear': 'سيظهر العملاء هنا عند التسجيل!',
    'trainer.noWorkoutsCreated': 'لم يتم إنشاء تمارين',
    'trainer.createWorkoutsForClients': 'أنشئ تمارين لعملائك!',
    'trainer.noNutritionPlans': 'لا توجد خطط تغذية',
    'trainer.createNutritionForClients': 'أنشئ خطط تغذية لعملائك!',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem('rayaan_language') as 'en' | 'ar'
    if (savedLanguage) {
      setLanguage(savedLanguage)
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang)
    localStorage.setItem('rayaan_language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <div>{children}</div>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
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